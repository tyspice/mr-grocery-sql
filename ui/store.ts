import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "./features/items";
import authReducer from "./features/auth";

export const store = configureStore({
  reducer: {
    items: itemsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
