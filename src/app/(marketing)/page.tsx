import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import Image from "next/image";

export default async function HomePage() {
  return (
    <div className="flex-1">
      <section className="flex w-full items-center justify-center bg-gray-50 py-32">
        <div className="container px-4 text-center md:px-6">
          <h1 className=" text-4xl font-bold tracking-tighter ">
            Welcome to{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              BillSplit
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-gray-500 md:text-xl">
            The easiest way to split bills with friends and family.
          </p>
        </div>
      </section>

      <section className="w-full bg-white py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-700">
            Key Features
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <Card>
              <CardHeader>
                <Image
                  alt="Split Bills"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <CardTitle>Split Bills</CardTitle>
              </CardHeader>
              <CardContent>
                Easily split bills among friends or family. No more last-minute
                calculations.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Image
                  alt="Track Debts"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <CardTitle>Track Debts</CardTitle>
              </CardHeader>
              <CardContent>
                Keep track of who owes what. Never lose track of your debts.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Image
                  alt="Secure Payments"
                  height="200"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "200/200",
                    objectFit: "cover",
                  }}
                  width="200"
                />
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                Make secure payments through our platform. Your financial safety
                is our priority.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full bg-gray-50 py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-700">
            Testimonials
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            <Card>
              <CardHeader className="flex items-center justify-center">
                <Image
                  className="aspect-square rounded-full"
                  src="/img/profile-image.png"
                  alt="picture"
                  width="100"
                  height="100"
                />
              </CardHeader>
              <CardContent>
                <p className="text-center text-lg font-medium">
                  "BillSplit has made sharing expenses so much easier for me and
                  my friends. We love it! It's simple, efficient, and takes the
                  hassle out of splitting bills. Highly recommended!"
                </p>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col font-medium">
                <div className="text-sky-500 dark:text-sky-400">Axel Ihl</div>
                <div className="text-slate-700 dark:text-slate-500">
                  Student, Münster
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-center">
                <Image
                  className="aspect-square rounded-full"
                  src="/img/profile-image.png"
                  alt="picture"
                  width="100"
                  height="100"
                />
              </CardHeader>
              <CardContent>
                <p className="text-center text-lg font-medium">
                  "I can't imagine going back to the way I used to split bills.
                  BillSplit is a lifesaver. It's streamlined our expenses, and I
                  no longer dread the end of the month. Thank you, BillSplit!"
                </p>
              </CardContent>
              <CardFooter className="mt-auto flex flex-col font-medium">
                <div className="text-sky-500 dark:text-sky-400">Axel Ihl</div>
                <div className="text-slate-700 dark:text-slate-500">
                  Student, Aachen
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section className="flex w-full items-center justify-center bg-gray-50 py-32">
        <div className="container px-4 text-center md:px-6">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-700">
            Ready to make bill splitting easier?
          </h2>
          <Button className="mt-4 px-8 py-2" variant="default">
            Sign up
          </Button>
        </div>
      </section>
    </div>
  );
}
