import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = { messages: [] };

export const message = createAsyncThunk(
  "chat/message",
  async ({ message, classroom, bot, chat_id }, { rejectWithValue }) => {
    const response = await fetch(`/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, classroom, bot, chat_id }),
    });
    const data = await response.json();

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  }
);

// slice & selectors omitted

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(
        {
          role: "user",
          content: action.payload,
          time: Date.now(),
          flags: {},
        },
        {
          role: "assitant",
          content: "typing...",
          time: Date.now(),
          flags: {},
        }
      );
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(message.fulfilled, (state, action) => {
      const messages = [...action.payload.messages];
      messages.shift();

      return {
        chat_id: action.payload.chat_id,
        messages,
        metadata: action.payload.metadata,
      };
    });
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
