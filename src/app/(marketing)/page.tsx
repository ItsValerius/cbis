import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import Image from "next/image";
import featureImage from "~/assets/feature-image.png";
import profileImage from "~/assets/profile-image.png";

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
          <div className="grid place-items-center gap-10 md:grid-rows-3">
            <Card className="flex w-full flex-col items-center md:w-fit md:flex-row">
              <CardHeader className="items-center gap-2">
                <CardTitle className="md:text-2xl">
                  Effortless Bill Splitting
                </CardTitle>
                <Image
                  alt="Split Bills"
                  height="200"
                  src={featureImage}
                  className="object-cover"
                  width="200"
                />
              </CardHeader>
              <CardContent className="max-w-md p-6 md:self-center">
                Say goodbye to manual calculations! Easily split bills among
                friends or family without the hassle of last-minute math.
              </CardContent>
            </Card>
            <Card className="flex w-full flex-col items-center md:w-fit md:flex-row-reverse md:justify-start md:place-self-end">
              <CardHeader className="max-w-full items-center">
                <CardTitle className="md:text-2xl">
                  Debt Tracking Made Simple
                </CardTitle>
                <Image
                  alt="Track Debts"
                  height="200"
                  className="object-cover"
                  src={featureImage}
                  width="200"
                />
              </CardHeader>{" "}
              <CardContent className="max-w-md p-6 md:self-center">
                Keep tabs on who owes what effortlessly. Never lose track of
                your debts with our intuitive debt tracking feature.
              </CardContent>
            </Card>
            <Card className="flex w-full flex-col items-center md:w-fit md:flex-row">
              <CardHeader className="items-center">
                <CardTitle className="md:text-2xl">
                  Secure and Seamless Payments
                </CardTitle>
                <Image
                  alt="Secure Payments"
                  height="200"
                  src={featureImage}
                  className="object-cover"
                  width="200"
                />
              </CardHeader>
              <CardContent className="max-w-md p-6 md:self-center">
                Prioritize your financial safety! Make secure payments through
                our platform, ensuring a seamless and protected transaction
                experience.
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
                  src={profileImage}
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
                  src={profileImage}
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
