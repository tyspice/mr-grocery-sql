import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// TODO: This isn't currenty working and I believe it's because axios won't
// TODO: let us send a GET request with a body.
export const login = createAsyncThunk(
  "auth/getToken",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    let token = await SecureStore.getItemAsync("token");
    if (token) {
      return token;
    }
    token = await axios({
      method: "GET",
      url: "http://localhost:8080/api/token",
      data: {
        email: credentials.username,
        password: credentials.password,
      },
    });
    if (token) await SecureStore.setItemAsync("token", token);
    console.log(token);
    return token;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await SecureStore.deleteItemAsync("token");
  return true;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
  },
  reducers: {
    authenticate(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = <string>action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.token = "";
      console.log(action);
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.token = "";
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { authenticate } = authSlice.actions;
export default authSlice.reducer;
