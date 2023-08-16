import { NextResponse } from "next/server";

import { getBotsCollection } from "@/lib/db";

export const GET = async (req, { params }) => {
  const bots = await getBotsCollection();

  const bot = await bots.findOne({ name: params.name });

  return NextResponse.json(bot);
};
