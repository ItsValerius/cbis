import Link from "next/link";
import { redirect } from "next/navigation";

export default async function HomePage() {
  return redirect("/receipts/list");
}
