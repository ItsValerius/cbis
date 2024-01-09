import { getGroupUsersByUserId } from "~/lib/helper";
import { GroupCards } from "./GroupCards";
import GroupCardEmpty from "./GroupCardEmpty";

const GroupsOverview = async (params: { userId: string }) => {
  const groups = await getGroupUsersByUserId(params.userId);

  return (
    <div className="flex flex-col gap-2 pt-4 md:grid md:grid-cols-3 md:gap-4">
      <GroupCardEmpty />
      <GroupCards groups={groups} />
    </div>
  );
};

export default GroupsOverview;
