import { EventSourceProvider } from "~/components/providers/EventSourceProvider";
import ReceiptToast from "~/components/receipts/ReceiptToast";

export default function ReceiptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <EventSourceProvider>
      {children}
      <ReceiptToast />
    </EventSourceProvider>
  );
}
