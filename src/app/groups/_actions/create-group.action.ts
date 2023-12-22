"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/router";
import { ZodError } from "zod";
import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { groups, insertGroupSchema, usersToGroups } from "~/server/db/schema";

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
  groupId: number | undefined;
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
  const session = await auth();

  const submittedForm = {
    name: formData.get("name") as string,
  };
  if (!session?.user) {
    return {
      form: submittedForm,
      status: "error",
      errors: "no active session",
    };
  }

  try {
    const parsedForm = insertGroupSchema.parse(submittedForm);
    let savedGroupId: number | undefined;

    await db.transaction(async (ctx) => {
      const group = await ctx
        .insert(groups)
        .values({
          name: parsedForm.name,
          inviteUuid: randomUUID(),
        })
        .returning();
      await ctx.insert(usersToGroups).values({
        groupId: group[0]!.id,
        userId: session.user.id,
      });

      savedGroupId = group[0]?.id;
    });
    revalidatePath("/");
    return {
      form: {
        name: "",
      },
      groupId: savedGroupId,
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
