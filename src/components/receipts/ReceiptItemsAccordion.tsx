"use client";
import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import type { ReceiptItem } from "~/server/db/schema";
import { usePathname } from "next/navigation";

const ReceiptItemsAccordion = ({
  receiptItems,
}: {
  receiptItems: ReceiptItem[];
}) => {
  const pathname = usePathname();
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={pathname !== "/receipts/list" ? "item-1" : undefined}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Receipt Items</AccordionTrigger>
        <AccordionContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receiptItems.map((receiptItem) => {
                return (
                  <TableRow key={receiptItem.id}>
                    <TableCell className="">{receiptItem.name}</TableCell>
                    <TableCell className="text-right">
                      {receiptItem.price}€
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReceiptItemsAccordion;
