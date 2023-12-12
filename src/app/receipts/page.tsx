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
export default async function Page() {
  return (
    <main className=" flex min-h-screen  flex-col items-center justify-center gap-2 p-4">
      <Card className="flex flex-col items-center gap-2">
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
            <Input id="file_input" type="file" name="receipt" />
            <Button type="submit">Submit</Button>
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
