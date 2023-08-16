import { NextResponse } from "next/server";

import { sealData } from "iron-session/edge";

import { ironOptions, getSession } from "@/lib/session";
import { getRestrictionsCollection } from "@/lib/db";

export const GET = async (req, { params }) => {
  const { usertype } = await getSession();

  if (usertype !== "teacher" && usertype !== "admin") {
    return NextResponse.json({ msg: "forbidden" });
  }

  const { classroom } = params;

  const restrictionsCollection = await getRestrictionsCollection();

  const search = {
    classroom,
  };

  const restrictions = await restrictionsCollection.find(search).toArray();

  return NextResponse.json(restrictions);
};
