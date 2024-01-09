import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const loading = () => {
  return (
    <div className="flex flex-col gap-2">
      <Card className="w-full">
        <CardHeader>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} href="/dashboard">
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink as={Link}>Group</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            <Skeleton className="h-10 w-80" />
          </h2>
          <CardDescription>
            <p className="text-sm font-medium leading-none">
              Invite your Friends
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-4">
            {new Array(3).fill(0).map((_, i) => (
              <div className="flex flex-row items-center" key={i}>
                <div className="flex flex-col items-center">
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardContent>
          <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
            <li>
              <Skeleton className="h-6 w-32" />
            </li>
            <li>
              <Skeleton className="h-6 w-32" />
            </li>
            <li>
              <Skeleton className="h-6 w-32" />
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button
            className="flex w-fit justify-start"
            asChild
            variant="secondary"
          >
            <Link href="/dashboard">
              <ChevronLeft />
              Back
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default loading;
