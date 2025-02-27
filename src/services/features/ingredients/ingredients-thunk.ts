import { createAsyncThunk } from "@reduxjs/toolkit";
import { BurgerItem } from "../../../types/types";
import { request } from "../../../utils/api";

export const thunkFetchIngredients = createAsyncThunk<
  BurgerItem[],
  void,
  { rejectValue: string }
>("ingredients/thunkFetchIngredients", async (_, thunkAPI) => {
  try {
    const { data } = await request<{ data: BurgerItem[] }>("/ingredients");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка получения ингредиентов");
  }
});
