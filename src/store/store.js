import { configureStore } from "@reduxjs/toolkit";
import session from "./slices/session";
import chat from "./slices/chat";
import selectedBot from "./slices/selectedBot";
import selectedClassroom from "./slices/selectedClassroom";
import selectedStudent from "./slices/selectedStudent";

import { aichatApi } from "./services";

export const store = configureStore({
  reducer: {
    session,
    chat,

    [aichatApi.reducerPath]: aichatApi.reducer,
    selectedBot,
    selectedClassroom,
    selectedStudent,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aichatApi.middleware),
});
