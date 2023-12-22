import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

const credSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();

    const { email, name, password } = credSchema.parse(body);

    const exists = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (exists) {
      return new NextResponse("Duplicate", { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 15);

    const user = await db
      .insert(users)
      .values({
        email,
        name,
        password: hashedPassword,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      });

    return NextResponse.json(user[0]);
  } catch (error) {
    return new NextResponse("Bad Reqest", { status: 400 });
  }
}
