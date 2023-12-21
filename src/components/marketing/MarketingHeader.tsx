import { SplitIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const MarketingHeader = () => {
  return (
    <header className="flex items-center justify-between bg-white px-4 py-4 shadow">
      <Link className="flex items-center justify-center" href="/">
        <SplitIcon className="h-6 w-6" />
        <span className="sr-only">BillSplit</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/"
        >
          Home
        </Link>

        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-sm font-medium underline-offset-4 hover:underline"
          href="/contact"
        >
          Contact
        </Link>
        <Button asChild className="ml-4 px-4 py-1" variant="outline">
          <Link href="/api/auth/signin">Log in</Link>
        </Button>
      </nav>
    </header>
  );
};

export default MarketingHeader;
