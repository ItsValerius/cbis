import { type NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "~/server/db";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { Adapter } from "next-auth/adapters";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { pgTable, users } from "~/server/db/schema";
import bcrypt from "bcrypt";
import { env } from "~/env";

const credSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const authOptions = {
  adapter: DrizzleAdapter(db, pgTable) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCred = credSchema.safeParse(credentials);

        if (!parsedCred.success) {
          return null;
        }
        const user = await db.query.users.findFirst({
          where: eq(users.email, parsedCred.data.email),
        });
        if (!user?.password) return null;

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
    async redirect({ url }) {
      if (url === "/img/bg-image.png") return "/";

      return url;
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
