import { ObjectId } from "mongodb";
import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import {
  getBotsCollection,
  getChatsCollection,
  getClassroomsCollection,
} from "@/lib/db";

const configuration = new Configuration({
  apiKey: process.env.AICHAT_KEY,
});

export async function GET(req, { params }) {
  const { username: sessionUserName, usertype } = await getSession();
  if (usertype !== "teacher" && usertype !== "admin") {
    return NextResponse.json({ msg: "forbidden" });
  }

  const { username, classroom } = params;

  const chatsCollection = await getChatsCollection();
  const search = {
    "metadata.username": username,
    "metadata.classroom": classroom,
  };

  const chats = await chatsCollection.find(search).toArray();

  return NextResponse.json(chats);
}
