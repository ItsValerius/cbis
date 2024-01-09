"use client";
import React from "react";
import { useMediaQuery } from "~/lib/hooks/useMediaQuery";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
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
import ReceiptForm from "./ReceiptForm";

function ReceiptUploadDrawerDialog({ groupdId }: { groupdId: number }) {
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
            Add new Receipt
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload Receipt</DialogTitle>
            <DialogDescription>
              You can upload a new Receipt here.
            </DialogDescription>
          </DialogHeader>
          <ReceiptForm groupId={groupdId} setOpen={setOpen} />
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
          Add new Receipt
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Upload Receipt</DrawerTitle>
          <DrawerDescription>
            You can upload a new Receipt here.
          </DrawerDescription>
        </DrawerHeader>
        <ReceiptForm groupId={groupdId} setOpen={setOpen} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export default ReceiptUploadDrawerDialog;
