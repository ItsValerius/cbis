import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "~/components/ui/breadcrumb";
import GroupCardEmpty from "~/components/groups/dashboard/GroupCardEmpty";
const loading = () => {
  return (
    <main className="mx-auto w-full max-w-7xl">
      <Card>
        <CardHeader className="flex w-full flex-row justify-between">
          <div>
            <Breadcrumb>
              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink as={Link} href="/dashboard">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <h1 className="text-4xl">
              Hallo{" "}
              <Skeleton className=" inline-block h-6 w-40 align-baseline" />
            </h1>
          </div>

          <Skeleton className="h-12 w-12 rounded-full" />
        </CardHeader>
      </Card>
      <div className="flex flex-col gap-2 pt-4 md:grid md:grid-cols-3 md:gap-4">
        <GroupCardEmpty />
        {new Array(3).fill(0).map((_, i) => {
          return (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-8 w-32" />
              </CardHeader>
              <CardContent>
                <div>Members:</div>
                <div className="flex flex-row flex-wrap gap-2">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Details</Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default loading;
