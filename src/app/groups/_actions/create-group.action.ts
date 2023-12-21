"use server";

import { revalidatePath } from "next/cache";
import { ZodError, ZodIssue } from "zod";
import { db } from "~/server/db";
import { groups, insertGroupSchema } from "~/server/db/schema";

type Form = {
  name: string;
};

type FieldErrorState = {
  status: "field-errors";
  errors: any;
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

type CreateGroupState = { form: Form } & (
  | SuccessState
  | SubmitErrorState
  | FieldErrorState
  | DefaultState
);

export async function createGroupAction(
  state: CreateGroupState,
  formData: FormData,
): Promise<CreateGroupState> {
  const submittedForm = {
    name: formData.get("name") as string,
  };

  try {
    const parsedForm = insertGroupSchema.parse(submittedForm);

    await db.insert(groups).values({
      name: parsedForm.name,
    });
    revalidatePath("/");
    return {
      form: {
        name: "",
      },
      status: "success",
    };
  } catch (err) {
    const error = err as Error;
    if (error instanceof ZodError) {
      console.log(error.flatten().fieldErrors);
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
