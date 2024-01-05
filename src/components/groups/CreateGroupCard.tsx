import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import GroupsForm from "./GroupsForm";

const CreateGroupCard = () => {
  return (
    <Card className="flex flex-col items-center gap-2 shadow-xl">
      <CardHeader>
        <CardTitle>Create a new Group</CardTitle>
      </CardHeader>
      <CardContent>
        <GroupsForm />
      </CardContent>
    </Card>
  );
};

export default CreateGroupCard;
