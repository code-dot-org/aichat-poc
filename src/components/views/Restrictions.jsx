import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListSubheader from "@mui/material/ListSubheader";

import { useGetRestrictionsQuery } from "@/store/services";
import { selectClassroom } from "@/store/slices/selectedClassroom";

const Restrictions = () => {
  const selectedClassroom = useSelector(
    ({ selectedClassroom }) => selectedClassroom
  );
  const {
    data: restrictions = [],
    error,
    isLoading,
  } = useGetRestrictionsQuery(selectedClassroom, { pollingInterval: 3000 });

  return (
    <List>
      <ListSubheader>Restricted students</ListSubheader>
      {restrictions.map((r) => (
        <ListItem key={r.username}>{r.username}</ListItem>
      ))}
    </List>
  );
};

export default Restrictions;
