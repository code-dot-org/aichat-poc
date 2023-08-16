import React from "react";

import Box from "@mui/material/Box";
import Messages from "./Messages";

const ChatTranscript = ({ chat }) => {
  if (!chat) {
    return null;
  }

  return (
    <Box>
      <Box>Chatting with {chat?.metadata?.bot}</Box>
      <Messages messages={chat.messages} />
    </Box>
  );
};

export default ChatTranscript;
