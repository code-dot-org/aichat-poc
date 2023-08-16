import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

import { useGetClassroomsQuery, aichatApi } from "@/store/services";
import { selectClassroom } from "@/store/slices/selectedClassroom";

const Classrooms = () => {
  const { data: classrooms = [], error, isLoading } = useGetClassroomsQuery();
  const selectedClassroom = useSelector(
    ({ selectedClassroom }) => selectedClassroom
  );

  const dispatch = useDispatch();

  if (!selectedClassroom && classrooms?.length) {
    dispatch(selectClassroom(classrooms[0].name));
    setTimeout(() => {
      dispatch(aichatApi.util.resetApiState());
    }, 5000);
  }

  const handleChange = (e) => {
    dispatch(selectClassroom(e.target.value));
  };

  return (
    <Box>
      Please select your classroom:
      <Select
        labelId="Select Bot"
        id="select-bot"
        value={selectedClassroom || ""}
        label="Bot"
        onChange={handleChange}
      >
        {classrooms.map((b) => (
          <MenuItem value={b.name} key={b.name}>
            {b.name}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default Classrooms;
