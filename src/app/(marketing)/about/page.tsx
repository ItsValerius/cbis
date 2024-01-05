import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import profileImage from "~/assets/profile-image.png";

export default function Component() {
  return (
    <div className="flex-1">
      <section className="flex w-full items-center justify-center bg-gray-50 py-32">
        <div className="container px-4 text-center md:px-6">
          <h1 className="text-4xl font-bold tracking-tighter">
            About{" "}
            <span className="text-gradient bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent ">
              BillSplit
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-gray-500 md:text-xl">
            Learn more about us and why we created BillSplit.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-700">
            Our Story
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            BillSplit was founded in 2023 with the aim of simplifying the bill
            splitting process among friends and family. We realized that the
            process of splitting bills was often tedious and led to confusion
            and disagreements. Our platform was created to solve this problem
            and make bill splitting easy, fair, and transparent.
          </p>
        </div>
      </section>
      <section className="w-full bg-gray-50 py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-700">
            Based Out of Aachen
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600">
            We are proudly based in Aachen, Germany. Known for its rich history,
            high-quality education, and vibrant culture, Aachen provides the
            perfect environment for our innovative team.
          </p>
        </div>
      </section>
      <section className="w-full bg-white py-24">
        <div className="container  px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-gray-700">
            Our Team
          </h2>
          <div className="grid grid-cols-2  gap-8">
            <div className="w-full place-self-end text-center md:w-1/2 lg:w-1/4">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarImage asChild src="/img/profile-image.png">
                  <Image
                    src={profileImage}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </AvatarImage>
                <AvatarFallback>Logo</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold">Team member 1</h3>
              <p className="mt-2 text-lg text-gray-600">Role</p>
            </div>
            <div className="w-full text-center md:w-1/2 lg:w-1/4 ">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarImage asChild src="/img/profile-image.png">
                  <Image
                    src={profileImage}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </AvatarImage>
                <AvatarFallback>Logo</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold">Team member 2</h3>
              <p className="mt-2 text-lg text-gray-600">Role</p>
            </div>
            <div className="w-full place-self-end text-center md:w-1/2 lg:w-1/4">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarImage asChild src="/img/profile-image.png">
                  <Image
                    src={profileImage}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </AvatarImage>
                <AvatarFallback>Logo</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold">Team member 2</h3>
              <p className="mt-2 text-lg text-gray-600">Role</p>
            </div>
            <div className="w-full text-center md:w-1/2 lg:w-1/4">
              <Avatar className="mx-auto h-24 w-24">
                <AvatarImage asChild src="/img/profile-image.png">
                  <Image
                    src={profileImage}
                    alt="logo"
                    width={100}
                    height={100}
                  />
                </AvatarImage>
                <AvatarFallback>Logo</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-xl font-bold">Team member 2</h3>
              <p className="mt-2 text-lg text-gray-600">Role</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
