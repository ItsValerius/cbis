"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import React from "react";
import { Button } from "~/components/ui/button";
import { DialogHeader } from "~/components/ui/dialog";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from "~/components/ui/drawer";
import { useMediaQuery } from "~/lib/hooks/useMediaQuery";
import GroupsForm from "../GroupsForm";

const CreateGroupDrawerDialog = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="m-0 flex h-full w-full flex-col rounded p-0 "
          >
            <PlusIcon />
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Create new Group
            </h4>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Group</DialogTitle>
            <DialogDescription>
              You can Create a new Group here.
            </DialogDescription>
          </DialogHeader>
          <GroupsForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="m-0 flex h-full w-full flex-col rounded p-0 "
        >
          <PlusIcon />
          Create new Group
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Create Group</DrawerTitle>
          <DrawerDescription>
            You can Create a new Group here.
          </DrawerDescription>
        </DrawerHeader>
        <GroupsForm />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateGroupDrawerDialog;
