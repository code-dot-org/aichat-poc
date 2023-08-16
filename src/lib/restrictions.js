import { getRestrictionsCollection } from "@/lib/db";

export const restrict = async ({ username, classroom, restrictions }) => {
  const restrictionsCollection = await getRestrictionsCollection();

  const search = {
    username,
    classroom,
  };

  await restrictionsCollection.updateOne(
    search,
    { $set: { username, classroom, restrictions } },
    { upsert: true }
  );

  return true;
};
