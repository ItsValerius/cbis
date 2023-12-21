"use client";
import { Label } from "@radix-ui/react-label";
import React from "react";
import { postReceipt } from "~/app/receipts/action";
import { Input } from "../ui/input";
import ReceiptButton from "./ReceiptButton";
import { useID } from "../providers/EventSourceProvider";

const ReceiptForm = () => {
  const { setId } = useID();
  return (
    <form
      action={async (formData) => {
        const receipt = await postReceipt(formData);
        if (receipt) setId(receipt.id);
      }}
      className="flex flex-col items-center gap-2"
    >
      <Label htmlFor="file_input">Upload Receipt</Label>
      <Input
        id="file_input"
        type="file"
        name="receipt"
        className="file:border-r file:border-muted file:hover:cursor-pointer"
      />
      <ReceiptButton />
    </form>
  );
};

export default ReceiptForm;
