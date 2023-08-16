import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import { getClassroomsCollection } from "@/lib/db";

export async function GET(req, { params }) {
  const { username, usertype } = await getSession();

  if (usertype !== "teacher" && usertype !== "admin") {
    return NextResponse.json({ msg: "forbidden" });
  }

  console.log(params.name);

  const classroomsCollection = await getClassroomsCollection();
  const search = { name: params.name };
  if (usertype === "teacher") {
    search.teacher = username;
  }

  const classrooms = await classroomsCollection.find(search).toArray();

  return NextResponse.json(classrooms);
}
