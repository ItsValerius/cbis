import { ReceiptToastWrapped } from "~/components/receipts/ReceiptToast";

export default function ReceiptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ReceiptToastWrapped />
    </>
  );
}
