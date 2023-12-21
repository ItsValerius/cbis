"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { createGroupAction } from "~/app/groups/_actions/create-group.action";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";

const GroupsForm = () => {
  const { toast } = useToast();

  const [formState, onCreateGroupAction] = useFormState(createGroupAction, {
    form: {
      name: "",
    },
    status: "default",
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.status === "success") {
      toast({
        title: "Gruppe created",
      });
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
        hasError={formState.status === "field-errors" && !!formState.errors}
      />
      <Button type="submit">Save</Button>
    </form>
  );
};

export default GroupsForm;
