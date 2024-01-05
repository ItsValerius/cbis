"use client";
import React, { useRef } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  callbackUrl?: string;
  error?: string;
};

const Login = (props: Props) => {
  const router = useRouter();
  const email = useRef("");
  const pass = useRef("");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: false,
    });

    if (!res?.error) {
      router.push(props.callbackUrl ?? `https://cbis.vercel.app/dashboard`);
    }
  };
  return (
    <div className={props.className}>
      <div className="bg-gradient-to-b  from-slate-50 to-slate-200 p-2 text-center text-slate-600">
        Login Form
      </div>
      {!!props.error && (
        <p className="bg-red-100 p-2 text-center text-red-600">
          Authentication Failed
        </p>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-3 p-2">
        <Input
          name="email"
          onChange={(e: { target: { value: string } }) =>
            (email.current = e.target.value)
          }
        />
        <Input
          name="password"
          type="password"
          onChange={(e: { target: { value: string } }) =>
            (pass.current = e.target.value)
          }
        />
        <div className="mt-2 flex items-center justify-center gap-2">
          <Button type="submit" className="w-28">
            Sign In
          </Button>
          <Link
            href={props.callbackUrl ?? "/"}
            className="w-28 rounded-md border border-red-600 py-2 text-center text-red-600 transition hover:border-transparent hover:bg-red-600 hover:text-white active:scale-95"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
