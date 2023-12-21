import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";

export default function Page() {
  return (
    <div className="flex-1">
      <section className="flex w-full items-center justify-center bg-gray-50 py-32">
        <div className="container px-4 text-center md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter">
            Contact{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent ">
              BillSplit
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-gray-500 md:text-xl">
            We're here to help. Get in touch with us.
          </p>
        </div>
      </section>
      <section className="flex w-full items-center justify-center bg-white py-24">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Label className="block">
                  <span className="text-gray-700">Name</span>
                </Label>
                <Input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus-visible:ring-indigo-500"
                  type="text"
                />
                <Label className="block">
                  <span className="text-gray-700">Email</span>
                </Label>
                <Input
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus-visible:ring-indigo-500"
                  type="email"
                />
                <Label className="block">
                  <span className="text-gray-700">Message</span>
                </Label>
                <Textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus-visible:ring-indigo-500"
                  rows={3}
                />
                <button className="mt-2 rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  Submit
                </button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
