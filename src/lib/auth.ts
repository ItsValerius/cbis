import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { Adapter } from "next-auth/adapters";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { users } from "~/server/db/schema";
import bcrypt from "bcrypt";

const credSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const parsedCred = credSchema.safeParse(credentials);

        if (!parsedCred.success) {
          return null;
        }
        const user = await db.query.users.findFirst({
          where: eq(users.email, parsedCred.data.email),
        });
        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(
          parsedCred.data.password,
          user.password,
        );
        if (!passwordMatch) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub!;
      return session;
    },
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
