import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import { getClassroomsCollection } from "@/lib/db";

export async function GET(req) {
  const { username, usertype } = await getSession();

  const classroomsCollection = await getClassroomsCollection();
  const search = {};
  if (usertype === "teacher") {
    search.teacher = username;
  }

  if (usertype === "student") {
    search.students = { $elemMatch: { name: username } };
  }

  const classrooms = await classroomsCollection.find(search).toArray();

  return NextResponse.json(classrooms);
}

export async function POST(req) {
  const classrooms = await getClassroomsCollection();

  const newClassroom = await req.json();

  try {
    const classroom = await classrooms.insertOne(newClassroom);
    return NextResponse.json({ msg: "done", classroom, newClassroom });
  } catch (e) {
    return NextResponse.json({ error: "Could not create classroom" });
  }
}

export async function DELETE(req) {}
