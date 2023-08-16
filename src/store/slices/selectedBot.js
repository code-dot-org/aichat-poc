import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { selectedBot: "" };

export const select = createAsyncThunk(
  "selectedBot/select",
  async (bot, { rejectWithValue }) => {
    const response = await fetch(`/api/bot/${bot}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  }
);

// slice & selectors omitted

export const selectedBotSlice = createSlice({
  name: "selectedBot",
  initialState,

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(select.fulfilled, (state, action) => {
      //state.selectedBot = action.payload;
      return { ...action.payload };
    });
  },
});

export default selectedBotSlice.reducer;
