// import { Button } from "~/components/ui/button";
// import Link from "next/link";
// import { ChevronRight } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "~/components/ui/card";
// import ReceiptForm from "~/components/receipts/ReceiptForm";
// import { getServerSession } from "next-auth";
// import { authOptions } from "~/lib/auth";
// import { redirect } from "next/navigation";

// export default async function Page() {
//   const session = await getServerSession(authOptions);
//   if(!session?.user) return redirect("/login");

//   return (
//     <main className=" flex min-h-screen flex-col items-center justify-center gap-8 p-4">
//       <h1 className="scroll-m-20 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent lg:text-5xl">
//         BillSplit
//       </h1>
//       <Card className="flex flex-col items-center gap-2 shadow-xl">
//         <CardHeader>
//           <CardTitle>Upload a Receipt</CardTitle>
//           <CardDescription>Analyze your receipt in the cloud.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <ReceiptForm />
//         </CardContent>
//         <CardFooter className="self-end">
//           <Button variant="secondary" asChild>
//             <Link href="/receipts/list">
//               Go To List <ChevronRight />
//             </Link>
//           </Button>
//         </CardFooter>
//       </Card>
//     </main>
//   );
// }
