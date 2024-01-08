import { ReceiptToastWrapped } from "~/components/receipts/ReceiptToast";

export default function GroupLayout({
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
