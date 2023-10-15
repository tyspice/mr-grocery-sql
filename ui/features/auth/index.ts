import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import base64 from "react-native-base64";
import { login as loginEndpoint } from "../endpoints";

export const login = createAsyncThunk(
  "auth/getToken",
  async (credentials: { username: string; password: string }, thunkAPI) => {
    let token = await SecureStore.getItemAsync("token");
    if (token) {
      return token;
    }
    const authHeader =
      "Basic " +
      base64.encode(`${credentials.username}:${credentials.password}`);
    const res = await axios({
      method: "GET",
      url: `${loginEndpoint}`,
      headers: {
        Authorization: authHeader,
      },
    });
    token = res?.data;
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
