import { Label } from "~/components/ui/label";
import { postReceipt } from "./action";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import ReceiptButton from "~/components/receipts/ReceiptButton";

export default async function Page() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <h1 className="scroll-m-20 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl">
        BillSplit
      </h1>
      <Card className="flex flex-col items-center gap-2 shadow-xl">
        <CardHeader>
          <CardTitle>Upload a Receipt</CardTitle>
          <CardDescription>Analyze your receipt in the cloud.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={postReceipt}
            className="flex flex-col items-center gap-2"
          >
            <Label htmlFor="file_input">Upload Receipt</Label>
            <Input
              id="file_input"
              type="file"
              name="receipt"
              className="file:border-muted file:border-r file:hover:cursor-pointer"
            />
            <ReceiptButton />
          </form>
        </CardContent>
        <CardFooter className="self-end">
          <Button variant="secondary" asChild>
            <Link href="/receipts/list">
              Go To List <ChevronRight />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
