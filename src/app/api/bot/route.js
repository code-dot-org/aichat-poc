import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import { getBotsCollection } from "@/lib/db";

export const GET = async (req) => {
  const botsCollection = await getBotsCollection();

  const bots = await botsCollection.find({}).toArray();

  return NextResponse.json({ bots });
};

export const POST = async (req, res) => {
  const { usertype } = await getSession();
  if (usertype !== "admin") {
    return NextResponse.json({ error: "not logged in" });
  }

  const bots = await getBotsCollection();

  const { name, prompt, icon, model } = await req.json();

  const existingBot = await bots.findOne({ name });

  if (existingBot) {
    return NextResponse.json({ error: "please patch the bot" });
  }

  const bot = await bots.insertOne({ name, prompt, icon, model });

  return NextResponse.json({ msg: "done", bot, args: { name, prompt } });
};

export const PATCH = async (req, res) => {
  const { usertype } = await getSession();
  if (usertype !== "admin") {
    return NextResponse.json({ error: "not logged in" });
  }

  const bots = await getBotsCollection();

  const { name, prompt, icon, model } = await req.json();

  const update = { prompt, icon, model };
  if (prompt === undefined) {
    delete update.prompt;
  }
  if (icon === undefined) {
    delete update.icon;
  }

  if (model === undefined) {
    delete update.model;
  }

  await bots.updateOne({ name }, { $set: update });

  return NextResponse.json({ msg: "done", name, prompt, model });
};

export const DELETE = async (req) => {
  const { usertype } = await getSession();
  if (usertype !== "admin") {
    return NextResponse.json({ error: "not logged in" });
  }

  const bots = await getBotsCollection();

  const { name } = await req.json();

  await bots.deleteOne({ name });

  return NextResponse.json({ msg: "done" });
};
