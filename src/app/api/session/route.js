import { NextResponse } from "next/server";

import { sealData } from "iron-session/edge";

import { ironOptions, getSession } from "@/lib/session";
import { getUsersCollection } from "@/lib/db";

export const GET = async (req) => {
  const { username, usertype } = await getSession();

  return NextResponse.json(
    username ? { username, usertype } : { msg: "Not logged in" }
  );
};

export const POST = async (req, res) => {
  const users = await getUsersCollection();

  const { username } = await req.json();

  try {
    const user = await users.findOne({ username });

    if (user) {
      const session = { username, usertype: user.usertype };

      const encryptedSession = await sealData(session, ironOptions);

      return new NextResponse(
        JSON.stringify({ username, usertype: user.usertype }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `${ironOptions.cookieName}=${encryptedSession}`,
            "Content-type": "application/json",
          },
        }
      );
    } else {
      throw new Error(`No such user ${username}`);
    }
  } catch (e) {
    return NextResponse.json({ error: "Could not login" });
  }
};

export const DELETE = async (req) => {
  return new NextResponse(JSON.stringify({ msg: "logged out" }), {
    status: 200,
    headers: {
      "Set-Cookie": `${ironOptions.cookieName}=;expires=Thu, Jan 01 1970 00:00:00 UTC;`,
      "Content-type": "application/json",
    },
  });
};
