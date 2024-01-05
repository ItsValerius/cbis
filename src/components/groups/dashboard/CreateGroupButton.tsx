"use client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import CreateGroupCard from "../CreateGroupCard";

const CreateGroupButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Group</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Do you want to create a new Group?</DialogTitle>
          <CreateGroupCard />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupButton;
