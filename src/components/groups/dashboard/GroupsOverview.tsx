import { getGroupsAndMembers } from "~/lib/helper";
import { GroupCards } from "./GroupCards";

const GroupsOverview = async (params: { userId: string }) => {
  const groups = await getGroupsAndMembers(params.userId);

  return (
    <div className="flex flex-col gap-2 pt-4 md:grid md:grid-cols-3 md:gap-4">
      <GroupCards groups={groups} />
    </div>
  );
};

export default GroupsOverview;
