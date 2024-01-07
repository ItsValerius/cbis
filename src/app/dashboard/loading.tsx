import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import CreateGroupButton from "~/components/groups/dashboard/CreateGroupButton";
import { Button } from "~/components/ui/button";
const loading = () => {
  return (
    <main className="mx-auto w-full max-w-5xl">
      <Card>
        <CardHeader className="flex w-full flex-row justify-between">
          <h1 className="text-4xl">
            Hallo <Skeleton className=" inline-block h-6 w-40 align-baseline" />
          </h1>

          <Skeleton className="h-12 w-12 rounded-full" />
        </CardHeader>
        <CardContent>
          <CreateGroupButton />
        </CardContent>
      </Card>
      <div className="flex flex-col pt-4 md:grid md:grid-cols-3 md:gap-4">
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
