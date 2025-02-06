import { createSlice } from "@reduxjs/toolkit";
import { BurgerItem, BurgerItemWithKey } from "../../../types/types";

type constructorState = {
  filling: BurgerItemWithKey[];
  bun: null | BurgerItem;
};
const initialState: constructorState = {
  filling: [],
  bun: null,
};

let key = 0;

export const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    clearFillingItems: (state) => {
      state.filling = [];
    },
    addIngredient: (state, action) => {
      action.payload.type === "bun"
        ? (state.bun = action.payload)
        : state.filling.push({ ...action.payload, key });
      key++;
    },
    deleteIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.bun = null;
      } else {
        state.filling = state.filling.filter(
          (el) => el.key !== action.payload.key
        );
      }
    },
    moveIngredient: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state.filling[dragIndex];
      if (draggedItem) {
        state.filling.splice(dragIndex, 1);
        state.filling.splice(hoverIndex, 0, draggedItem);
      }
    },
  },
});

export const {
  clearFillingItems,
  addIngredient,
  deleteIngredient,
  moveIngredient,
} = constructorSlice.actions;

export default constructorSlice.reducer;
