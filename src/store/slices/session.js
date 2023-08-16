import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const login = createAsyncThunk(
  "session/login",
  async (username, { rejectWithValue }) => {
    const response = await fetch(`/api/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  }
);

export const logout = createAsyncThunk(
  "session/logout",
  async (_, { rejectWithValue }) => {
    const response = await fetch(`/api/session`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data);
    }
    return data;
  }
);

// slice & selectors omitted

export const sessionSlice = createSlice({
  name: "session",
  initialState,

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(login.fulfilled, (state, action) => {
      state.username = action.payload.username;
      state.usertype = action.payload.usertype;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      delete state.usertype;
      delete state.username;
    });
  },
});

export default sessionSlice.reducer;
