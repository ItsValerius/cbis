import Link from "next/link";
import React from "react";

const MarketingFooter = () => {
  return (
    <footer className="flex items-center justify-between bg-white px-4 py-4 shadow">
      <p className="text-sm text-gray-500">
        © BillSplit. All rights reserved.
      </p>
      <nav className="flex items-center gap-4">
        <Link
          className="text-sm text-gray-500 underline-offset-4 hover:underline"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-sm text-gray-500 underline-offset-4 hover:underline"
          href="#"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
};

export default MarketingFooter;
