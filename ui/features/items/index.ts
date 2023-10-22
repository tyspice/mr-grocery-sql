import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../models";
import getDataService from "../../services/DataService";
const dataService = getDataService();

export const getShoppingItems = createAsyncThunk("/getShopping", async () => {
  const res = await dataService.getShoppingItems();
  if (res) {
    return res.data;
  }
});

export const updateItem = createAsyncThunk(
  "/updateItem",
  async (item: Item) => {
    const res = await dataService.updateItem(item);
    if (res) {
      return true;
    }
  }
);

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
    builder.addCase(updateItem.fulfilled, (state, action) => {
      if (action.payload) {
        // something
      }
    });
    builder.addCase(updateItem.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export default itemsSlice.reducer;
