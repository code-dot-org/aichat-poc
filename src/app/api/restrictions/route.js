import { NextResponse } from "next/server";

import { sealData } from "iron-session/edge";

import { ironOptions, getSession } from "@/lib/session";
import { restrict } from "@/lib/restrictions";

export const POST = async (req) => {
  const { usertype } = await getSession();

  if (usertype !== "teacher" && usertype !== "admin") {
    return NextResponse.json({ msg: "forbidden" });
  }

  const { username, classroom, restrictions } = await req.json();

  await restrict(username, classroom, restrictions);

  return NextResponse.json({ msg: "updated restrictions" });
};
