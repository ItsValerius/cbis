"use client";
import React, { useRef } from "react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "~/components/ui/card";

type Props = {
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
      router.push(props.callbackUrl ?? `/dashboard`);
    }
  };
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-4">
      <Card className="flex  max-w-full flex-col items-center justify-center gap-2 p-6 transition-shadow duration-500  xl:w-full">
        <div className="text-2xl">Login Form</div>
        {!!props.error && (
          <p className="rounded bg-red-100 p-2 text-center text-red-600">
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
        <Button onClick={() => signIn("google")} variant="secondary">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            height="18px"
            viewBox="0 0 48 48"
            className="-ml-1 mr-2 h-4 w-4"
          >
            <g>
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              ></path>
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              ></path>
              <path
                fill="#FBBC05"
                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
              ></path>
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              ></path>
              <path fill="none" d="M0 0h48v48H0z"></path>
            </g>
          </svg>
          Sign in with Google
        </Button>
      </Card>
    </div>
  );
};

export default Login;
