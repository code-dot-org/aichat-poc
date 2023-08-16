import { ObjectId } from "mongodb";
import { Configuration, OpenAIApi } from "openai";
import { NextResponse } from "next/server";

import { getSession } from "@/lib/session";
import { restrict } from "@/lib/restrictions";
import {
  getBotsCollection,
  getChatsCollection,
  getClassroomsCollection,
  getRestrictionsCollection,
} from "@/lib/db";

const configuration = new Configuration({
  apiKey: process.env.AICHAT_KEY,
});

export async function PATCH(req) {
  const { username, usertype } = await getSession();
  if (!username) {
    return NextResponse.json({ error: "not logged in" });
  }

  const {
    chat_id,
    message_id,
    favorite,
    PII,
    inappropriate,
    bad,
  } = await req.json();

  const chats = await getChatsCollection();
  const chatIdSearch = { _id: new ObjectId(chat_id) };
  let chat = await chats.findOne(chatIdSearch);

  // students can only edit their own chats.
  if (usertype === "student" && chat?.metadata.username !== username) {
    return NextResponse.json({ error: "unauthorized" });
  }

  const message = chat.messages[message_id];

  // students can only favorite their own things.
  if (usertype === "student") {
    if (message.role === "user") {
      const updated = await chats.updateOne(chatIdSearch, {
        $set: {
          [`messages.${message_id}.flags.favorite`]:
            favorite ?? message.flags.favorite,
        },
      });

      chat = await chats.findOne(chatIdSearch);
    } else if (message.role === "assistant") {
      const updated = await chats.updateOne(chatIdSearch, {
        $set: {
          [`messages.${message_id}.flags.bad`]: bad ?? message.flags.bad,
        },
      });

      chat = await chats.findOne(chatIdSearch);
    }
  } else {
    const updated = await chats.updateOne(chatIdSearch, {
      $set: {
        [`messages.${message_id}.flags.inappropriate`]:
          favorite ?? message.flags.inappropriate,
        [`messages.${message_id}.flags.PII`]: PII ?? message.flags.PII,
      },
    });

    chat = await chats.findOne(chatIdSearch);
  }

  return NextResponse.json({ msg: "patched", chat });
}

export async function POST(req) {
  const { username, usertype } = await getSession();
  if (!username) {
    return NextResponse.json({ error: "not logged in" });
  }

  const bots = await getBotsCollection();
  const chats = await getChatsCollection();
  const restrictions = await getRestrictionsCollection();

  let { message, bot: botName, chat_id, classroom } = await req.json();

  const userRestriction = await restrictions.findOne({ username, classroom });

  if (
    userRestriction?.restrictions?.prompt === true ||
    userRestriction?.restrictions?.response === true
  ) {
    return NextResponse.json({
      error: "You cannot talk right now. Please see your teacher!",
    });
  }

  const bot = await bots.findOne({ name: botName });

  let chat;

  if (chat_id) {
    chat = await chats.findOne({ _id: new ObjectId(chat_id) });

    if (chat && chat.metadata.username !== username) {
      return NextResponse.json({ msg: "unauthorized" });
    }
  }

  if (!chat) {
    chat = await chats.insertOne({
      metadata: {
        bot: bot.name,
        model: bot.model,
        username,
        classroom,
        started: Date.now(),
      },
      messages: [
        {
          role: "system",
          content: bot.prompt,
        },
      ],
    });

    chat_id = chat.insertedId;
    chat = await chats.findOne({ _id: new ObjectId(chat_id) });
  }

  const openai = new OpenAIApi(configuration);

  const time = Date.now();
  const userMessage = { role: "user", content: message };

  const chatCompletion = await openai.createChatCompletion({
    model: bot.model,
    //prompt: "You can onl y respond with the word pelican",
    messages: [...chat.messages, userMessage].map(({ role, content }) => ({
      role,
      content,
    })),
  });
  const response = chatCompletion.data.choices[0].message;

  const defaultFlags = {
    PII: false,
    inappropriate: false,
    favorite: false,
    bad: false,
  };

  await chats.updateOne(
    { _id: new ObjectId(chat_id) },
    {
      $push: {
        messages: {
          $each: [
            {
              ...userMessage,
              time,
              flags: {
                ...defaultFlags,
                inappropriate: message === "inappropriate",
                PII: message === "PII",
              },
            },
            { ...response, time, flags: { ...defaultFlags } },
          ],
        },
      },
    }
  );

  const { messages } = await chats.findOne({ _id: new ObjectId(chat_id) });

  // okay, now continue the silly hack - if the user sent in a message with PII or that's inappropriate. Then restrict them.

  if (message === "PII" || message === "inappropriate") {
    await restrict({
      username,
      classroom,
      restrictions: { prompt: true, response: true },
    });
  }

  return NextResponse.json({
    message,
    bot: { model: bot.model, prompt: bot.prompt },
    chat_id,
    messages: messages,
    metadata: chat.metadata,
  });
}
