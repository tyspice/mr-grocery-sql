import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
