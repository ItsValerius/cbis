"use client";
import { Label } from "@radix-ui/react-label";
import React, { useCallback } from "react";
import { Input } from "../ui/input";
import ReceiptButton from "./ReceiptButton";
import { postReceipt } from "~/app/receipts/action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ReceiptForm = (props: { groupId: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <form
      action={async (formData) => {
        formData.append("groupId", String(props.groupId));
        const receipt = await postReceipt(formData);
        if (receipt)
          router.push(
            pathname + "?" + createQueryString("id", String(receipt.id)),
          );
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
