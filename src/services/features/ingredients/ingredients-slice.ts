import { createSlice } from "@reduxjs/toolkit";
import { BurgerItem } from "../../../types/types";
import { thunkFetchIngredients } from "./ingredients-thunk";

type ingredientsState = {
  items: BurgerItem[];
  loading: boolean;
  error: null | string;
};
const initialState: ingredientsState = {
  items: [],
  loading: false,
  error: null,
};

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    clearIngredients: (state) => {
      state.items = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkFetchIngredients.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });

    builder.addCase(thunkFetchIngredients.rejected, (state, action) => {
      state.items = [];
      state.loading = false;
      state.error = action.payload || "Неизвестная ошибка";
    });

    builder.addCase(thunkFetchIngredients.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { clearIngredients, clearError } = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
