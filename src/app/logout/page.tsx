import React from "react";
import { Card } from "~/components/ui/card";
import LogoutButton from "~/components/groups/dashboard/LogoutButton";

const LogoutPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center p-4">
      <Card className="flex  max-w-full flex-col items-center justify-center gap-2 p-6 transition-shadow duration-500  xl:w-full">
        <LogoutButton />
      </Card>
    </div>
  );
};

export default LogoutPage;
