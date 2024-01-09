"use client";
import React, { useCallback } from "react";
import { Input } from "../ui/input";
import ReceiptButton from "./ReceiptButton";
import { postReceipt } from "~/app/(user)/receipts/action";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ReceiptForm = (props: {
  groupId: number;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { groupId, setOpen } = props;
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
        formData.append("groupId", String(groupId));
        const receipt = await postReceipt(formData);
        if (receipt) {
          router.push(
            pathname + "?" + createQueryString("id", String(receipt.id)),
          );
          setOpen(false);
        }
      }}
      className="flex flex-col items-center gap-2"
    >
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
