import { configureStore } from "@reduxjs/toolkit";
import ingredientsReducer from "../features/ingredients/ingredients-slice";
import constructorReducer from "../features/constructor/constructor-slice";
import orderReducer from "../features/order/order-slice";
import currentIngredientReducer from "../features/current-ingredient/current-ingredient";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    burgerConstructor: constructorReducer,
    currentIngredient: currentIngredientReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
