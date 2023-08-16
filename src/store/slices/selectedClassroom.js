import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const selectedClassroomSlice = createSlice({
  name: "selectedBot",
  initialState,
  reducers: {
    selectClassroom: (state, action) => {
      return action.payload;
    },
  },
});

export const { selectClassroom } = selectedClassroomSlice.actions;

export default selectedClassroomSlice.reducer;
