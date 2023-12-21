import { ArrowRight, Check, Minus } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "~/components/ui/card";

export default function Component() {
  return (
    <div className="flex-1">
      <section className="flex w-full items-center justify-center bg-gray-50 py-32">
        <div className="container px-4 text-center md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter">
            Pricing for{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent ">
              BillSplit
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-gray-500 md:text-xl">
            Choose the plan that work best for you.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-700">
            Our Plans
          </h2>
          <div className="grid gap-10 md:grid-cols-3">
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-center">Free</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-semibold tracking-tight text-gray-900">
                  $0{" "}
                  <span className="text-sm font-normal tracking-normal text-gray-600">
                    / month
                  </span>
                </p>
              </CardContent>
              <CardContent>
                <p className="text-center text-gray-600">
                  Ideal for occasional users.
                </p>
                <ul className="mt-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic
                    feature 1
                  </li>
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic
                    feature 2
                  </li>
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic
                    feature 3
                  </li>
                  <li className="flex items-center gap-2 py-2 text-sm text-gray-400">
                    <Minus size={20} /> Priority support
                  </li>
                  <li className="flex items-center gap-2 py-2 text-sm text-gray-400">
                    <Minus size={20} /> Pro feature 1
                  </li>
                  <li className="flex items-center gap-2 py-2 text-sm text-gray-400">
                    <Minus size={20} /> Pro feature 2
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className=" flex w-full justify-between">
                  Try now
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-center">Pro</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-semibold tracking-tight text-gray-900">
                  $9.99{" "}
                  <span className="text-sm font-normal tracking-normal text-gray-600">
                    / month
                  </span>
                </p>
              </CardContent>
              <CardContent>
                <p className="text-center text-gray-600">
                  Perfect for regular users.
                </p>
                <ul className="mt-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic All
                    basic features
                  </li>
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic
                    Priority support
                  </li>
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic Pro
                    feature
                  </li>{" "}
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic Pro
                    feature 2
                  </li>
                  <li className="flex items-center gap-2 py-2 text-sm text-gray-400">
                    <Minus size={20} /> Exclusive benefit 1
                  </li>
                  <li className="flex items-center gap-2 py-2 text-sm text-gray-400">
                    <Minus size={20} /> Exclusive benefit 2
                  </li>
                  <li className="flex items-center gap-2 py-2 text-sm text-gray-400">
                    <Minus size={20} /> Exclusive benefit 3
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className=" flex w-full justify-between">
                  Try now
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
            <Card className="flex h-full flex-col">
              <CardHeader>
                <CardTitle className="text-center">Premium</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-semibold tracking-tight text-gray-900">
                  $19.99{" "}
                  <span className="text-sm font-normal tracking-normal text-gray-600">
                    / month
                  </span>
                </p>
              </CardContent>
              <CardContent>
                <p className="text-center text-gray-600">
                  Designed for heavy users.
                </p>
                <ul className="mt-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic All
                    Pro features
                  </li>
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic
                    Exclusive benefit 1
                  </li>
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic
                    Exclusive benefit 2
                  </li>{" "}
                  <li className="flex items-center gap-2 py-2">
                    <Check size={20} className=" text-green-500" /> Basic
                    Exclusive benefit 3
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className=" flex w-full justify-between">
                  Try now
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <section className="flex w-full items-center justify-center bg-gray-50 py-32">
        <div className="container px-4 text-center md:px-6">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-700">
            Ready to get started with BillSplit?
          </h2>
          <Button className="mt-4 px-8 py-2" variant="default">
            Sign up
          </Button>
        </div>
      </section>
    </div>
  );
}
