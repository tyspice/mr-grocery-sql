import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// TODO: don't pass username and password via payload.
const getToken = createAsyncThunk(
  "auth/getToken",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    const token = await axios.get("localhost:3000/token", {
      data: {
        email: credentials.username,
        password: credentials.password,
      },
    });
    return token;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
  },
  reducers: {
    authenticate(state, action: PayloadAction<boolean>) {
      state.authenticated = action.payload;
    },
  },
});

export const { authenticate } = authSlice.actions;
export default authSlice.reducer;
