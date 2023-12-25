"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { registerAction } from "~/app/register/_actions/register-action";

const RegisterForm = () => {
  const [formState, onCreateGroupAction] = useFormState(registerAction, {
    form: {
      name: "",
      email: "",
      password: "",
    },
    status: "default",
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.status === "success") {
      formRef.current?.reset();
    }
  }, [formState]);

  return (
    <form
      ref={formRef}
      action={onCreateGroupAction}
      className="flex flex-col gap-2 md:min-w-[20rem]"
    >
      <Label htmlFor="name">Name</Label>
      <Input
        id="name"
        name="name"
        defaultValue={formState.form.name}
        hasError={
          formState.status === "field-errors" && !!formState.errors["name"]
        }
      />

      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        name="email"
        type="email"
        defaultValue={formState.form.email}
        hasError={
          formState.status === "field-errors" && !!formState.errors["email"]
        }
      />

      <Label htmlFor="password">Password</Label>
      <Input
        id="password"
        name="password"
        type="password"
        defaultValue={formState.form.password}
        hasError={
          formState.status === "field-errors" && !!formState.errors["password"]
        }
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default RegisterForm;
