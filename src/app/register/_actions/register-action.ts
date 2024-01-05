"use server";

import { eq } from "drizzle-orm";
import { ZodError, z } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

type Form = {
  name: string;
  email: string;
  password: string;
};

type FieldErrorState = {
  status: "field-errors";
  errors: {
    [x: string]: string[] | undefined;
    [x: number]: string[] | undefined;
    [x: symbol]: string[] | undefined;
  };
};

type DefaultState = {
  status: "default";
};

type SubmitErrorState = {
  status: "error";
  errors: string;
};

type SuccessState = {
  status: "success";
};

type RegisterState = { form: Form } & (
  | SuccessState
  | SubmitErrorState
  | FieldErrorState
  | DefaultState
);

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function registerAction(
  state: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  const session = await auth();

  const submittedForm = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const parsedForm = registerSchema.parse(submittedForm);

    const exists = await db.query.users.findFirst({
      where: eq(users.email, parsedForm.email),
    });
    if (exists) {
      return {
        form: submittedForm,
        status: "error",
        errors: "User with email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(parsedForm.password, 10);

    await db.insert(users).values({
      email: parsedForm.email,
      name: parsedForm.name,
      password: hashedPassword,
    });
    redirect("/login");
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      status: "success",
    };
  } catch (err) {
    const error = err as Error;
    if (error instanceof ZodError) {
      return {
        form: submittedForm,
        status: "field-errors",
        errors: error.flatten().fieldErrors,
      };
    } else {
      return {
        form: submittedForm,
        status: "error",
        errors: error.message,
      };
    }
  }
}
