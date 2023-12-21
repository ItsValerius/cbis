import MarketingFooter from "~/components/marketing/MarketingFooter";
import MarketingHeader from "~/components/marketing/MarketingHeader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <MarketingHeader />
      {children}
      <MarketingFooter />
    </main>
  );
}
