import { getGroupsAndMembers } from "~/lib/helper";
import { GroupCards } from "./GroupCards";

const GroupsOverview = async (params: { userId: string }) => {
  const groups = await getGroupsAndMembers(params.userId);

  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      <GroupCards groups={groups} />
    </div>
  );
};

export default GroupsOverview;
