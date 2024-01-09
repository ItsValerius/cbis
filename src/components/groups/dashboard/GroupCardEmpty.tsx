import React from "react";
import { Card, CardContent } from "~/components/ui/card";
import CreateGroupDrawerDialog from "./CreateGroupDrawerDialog";

const GroupCardEmpty = () => {
  return (
    <Card className="flex h-60 min-h-full w-full max-w-full flex-col  transition-shadow duration-500 hover:shadow-xl md:h-full">
      <CardContent className="  m-2 flex  h-full items-center justify-center rounded border-2 border-dashed  p-0 md:m-4">
        <CreateGroupDrawerDialog />
      </CardContent>
    </Card>
  );
};

export default GroupCardEmpty;
