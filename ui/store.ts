import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/items";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
