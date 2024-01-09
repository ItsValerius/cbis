"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import type { ReceiptItem, User } from "~/server/db/schema";
import { usePathname } from "next/navigation";
import { columns, defaultColumn } from "./ReceiptItemsTableColumns";
import { ReceiptItemsDataTable } from "./ReceiptItemsDataTable";

const ReceiptItemsAccordion = ({
  receiptItems,
  receiptId,
  users,
}: {
  receiptItems: ReceiptItem[];
  receiptId: number;
  users: User[];
}) => {
  const pathname = usePathname();

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={pathname.includes("receipts") ? "item-1" : undefined}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Receipt Items</AccordionTrigger>
        <AccordionContent>
          <ReceiptItemsDataTable
            columns={columns}
            users={users}
            data={receiptItems}
            defaultColumn={defaultColumn}
            receiptId={receiptId}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReceiptItemsAccordion;
