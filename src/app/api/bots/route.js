import { NextResponse } from "next/server";

import { getBotsCollection } from "@/lib/db";

export const GET = async (req) => {
  const botsCollection = await getBotsCollection();

  const bots = await botsCollection.find().toArray();

  return NextResponse.json(bots);
};
