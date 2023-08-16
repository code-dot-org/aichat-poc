import { unsealData } from "iron-session/edge";
import { cookies } from "next/headers";

export const ironOptions = {
  cookieName: "aichat_cookie",
  password: process.env.AICHAT_COOKIE,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

export const getSession = async () => {
  const cookieStore = cookies();

  const encryptedSession = cookieStore.get(ironOptions.cookieName)?.value;

  const session = encryptedSession
    ? await unsealData(encryptedSession, {
        password: ironOptions.password,
      })
    : null;

  return session || {};
};
