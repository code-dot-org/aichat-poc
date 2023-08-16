"use client";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import ChatTranscript from "./ChatTranscript";

import { message, addMessage } from "@/store/slices/chat";

const Chat = () => {
  const dispatch = useDispatch();
  const bot = useSelector((state) => state.selectedBot);
  const classroom = useSelector((state) => state.selectedClassroom);
  const chat = useSelector((state) => state.chat);
  const [msg, setMsg] = useState("");
  const sendChatMsg = async () => {
    await dispatch(addMessage(msg));
    await dispatch(
      message({ message: msg, classroom, bot: bot.name, chat_id: chat.chat_id })
    );
    setMsg("");
  };

  return (
    <Box>
      <ChatTranscript chat={chat} />
      <Box>
        <TextField
          id="outlined-basic"
          label="message"
          variant="outlined"
          size="small"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button variant="contained" onClick={sendChatMsg}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chat;
