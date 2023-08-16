import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const selectedStudentSlice = createSlice({
  name: "selectedBot",
  initialState,
  reducers: {
    selectStudent: (state, action) => {
      return action.payload;
    },
  },
});

export const { selectStudent } = selectedStudentSlice.actions;

export default selectedStudentSlice.reducer;
