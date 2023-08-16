import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import { useGetBotsQuery } from "@/store/services";
import { select as selectBot } from "@/store/slices/selectedBot";

const Bots = () => {
  const { data: bots = [], error, isLoading } = useGetBotsQuery();
  const selectedBot = useSelector(({ selectedBot }) => selectedBot);

  const dispatch = useDispatch();
  if (!selectedBot.name) {
    dispatch(selectBot("William Shakespeare"));
  }

  const handleChange = (e) => dispatch(selectBot(e.target.value));

  return (
    <Box>
      Please choose who you want to chat with:{" "}
      <Select
        labelId="Select Bot"
        id="select-bot"
        value={selectedBot.name || ""}
        label="Bot"
        onChange={handleChange}
      >
        {bots.map((b) => (
          <MenuItem value={b.name} key={b.name}>
            {b.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Bots;
