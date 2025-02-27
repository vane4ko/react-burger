import { createSlice } from "@reduxjs/toolkit";
import { BurgerItem } from "../../../types/types";

type CurrentIngredientState = {
  ingredient: BurgerItem | null;
};

const initialState: CurrentIngredientState = {
  ingredient: null,
};

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState,
  reducers: {
    setCurrentIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    clearCurrentIngredient: (state) => {
      state.ingredient = null;
    },
  },
});

export const { setCurrentIngredient, clearCurrentIngredient } =
  currentIngredientSlice.actions;
export default currentIngredientSlice.reducer;
