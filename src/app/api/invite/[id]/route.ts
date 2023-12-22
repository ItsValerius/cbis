import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { auth } from "~/lib/auth";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const { id } = query;

  if (!id || Array.isArray(id)) return;

  const session = await auth();
  console.log("session", session);
  console.log("id", id);

  return new NextResponse();
}
