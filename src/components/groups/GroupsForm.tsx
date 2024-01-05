"use client";

import React, { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { useFormState } from "react-dom";
import { useToast } from "../ui/use-toast";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
import GroupsButton from "./GroupsButton";
import { createGroupAction } from "~/app/groups/_actions/create-group.action";

const GroupsForm = () => {
  const { toast } = useToast();
  const router = useRouter();

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
      formState.groupId
        ? router.push(`/groups/${formState.groupId}`)
        : router.push(`/`);
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
      <GroupsButton />
    </form>
  );
};

export default GroupsForm;
