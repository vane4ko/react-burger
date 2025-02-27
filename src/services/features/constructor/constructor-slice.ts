import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { BurgerItem, BurgerItemWithKey } from "../../../types/types";

type constructorState = {
  filling: BurgerItemWithKey[];
  bun: null | BurgerItem;
};
const initialState: constructorState = {
  filling: [],
  bun: null,
};

export const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    clearFillingItems: (state) => {
      state.filling = [];
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<BurgerItemWithKey>) => {
        action.payload.type === "bun"
          ? (state.bun = action.payload)
          : state.filling.push(action.payload);
      },
      prepare: (ingredient: BurgerItem) => {
        return { payload: { ...ingredient, key: nanoid() } };
      },
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
