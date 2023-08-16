import { NextResponse } from "next/server";

import { getUsersCollection } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(req, res) {
  const usersCollection = await getUsersCollection();
  const users = await usersCollection.find({}).toArray();

  return NextResponse.json(users);
}

export async function POST(req) {
  const { usertype } = await getSession();
  // if (usertype !== "admin") {
  //   return NextResponse.json({ error: "unauthorized" });
  // }

  const users = await getUsersCollection();

  const newUser = await req.json();

  try {
    const user = await users.insertOne(newUser);
    return NextResponse.json({ msg: "done", user, newUser });
  } catch (e) {
    return NextResponse.json({ error: "Could not create user" });
  }
}

export async function DELETE(req) {
  const users = await getUsersCollection();

  const user = await req.json();

  try {
    await users.deleteOne({ username: user.username });
    return NextResponse.json({ msg: "gone" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Could not delete user" });
  }
}
