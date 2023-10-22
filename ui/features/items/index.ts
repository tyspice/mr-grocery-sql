import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../models";
import getDataService from "../../services/DataService";
const dataService = getDataService();

export const getShoppingItems = createAsyncThunk("/shopping", async () => {
  const res = await dataService.getShoppingItems();
  if (res) {
    return res.data;
  }
});

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    shoppingItems: <Item[]>[],
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getShoppingItems.fulfilled, (state, action) => {
      if (action.payload) {
        state.shoppingItems = action.payload;
      }
    });
    builder.addCase(getShoppingItems.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export default itemsSlice.reducer;
