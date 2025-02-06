import { createAsyncThunk } from "@reduxjs/toolkit";
import { BurgerItem } from "../../../types/types";

const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

export const thunkFetchIngredients = createAsyncThunk<BurgerItem[], void, { rejectValue: string }>(
  "ingredients/thunkFetchIngredients",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(dataUrl);
      if (!response.ok) {
        return thunkAPI.rejectWithValue(`Ошибка ${response.status}`);
      }
      const { data } = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка получения ингредиентов");
    }
  }
);
