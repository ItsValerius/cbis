import { getServerSession } from "next-auth/next";
import { authOptions } from "~/lib/auth";
import Login from "./Login";
import React from "react";
import { redirect } from "next/navigation";

type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInPage = async (props: Props) => {
  const session = await getServerSession(authOptions);
  if (session?.user) return redirect("/dashboard");
  return (
    <Login
      error={props.searchParams?.error}
      callbackUrl={props.searchParams?.callbackUrl}
    />
  );
};

export default SignInPage;
