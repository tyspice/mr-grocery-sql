import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "items",
  initialState: {
    items: <Array<string>>["carrots", "snails", "smut", "snake"],
  },
  reducers: {
    pushItem(state, action: PayloadAction<string>) {
      state.items = state.items.concat(action.payload);
    },
    popItem(state) {
      state.items = state.items.slice(0, -1);
    },
  },
});

export const { pushItem, popItem } = messageSlice.actions;
export default messageSlice.reducer;
