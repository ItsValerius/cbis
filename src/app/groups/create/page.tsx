import GroupsForm from "~/components/groups/GroupsForm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function CreateGroupPage() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center gap-8 p-4">
      <Card className="flex flex-col items-center gap-2 shadow-xl">
        <CardHeader>
          <CardTitle>Create a new Group</CardTitle>
        </CardHeader>
        <CardContent>
          <GroupsForm />
        </CardContent>
      </Card>
    </main>
  );
}
