import React from "react";

import Box from "@mui/material/Box";

const Messages = ({ messages = [] }) => {
  return (
    <Box sx={{ margin: 3 }}>
      {messages
        .filter((m) => m.role !== "system")
        .map((m) => (
          <Box
            sx={{
              p: 1,
              border: 1,
              textAlign: m.role === "user" ? "right" : "left",
              background:
                m.flags.inappropriate || m.flags.PII ? "#FFBBBB" : undefined,
            }}
            key={m.content}
          >
            {m.content}
          </Box>
        ))}
    </Box>
  );
};
export default Messages;
