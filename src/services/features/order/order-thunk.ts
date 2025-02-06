import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  orderFormData,
  orderResponseFormData,
} from "../../../types/order-types";

const dataUrl = "https://norma.nomoreparties.space/api/orders";

export const thunkSendOrder = createAsyncThunk<
  orderResponseFormData,
  orderFormData,
  { rejectValue: string }
>("order/thunkSendOrder", async (orderData, thunkAPI) => {
  try {
    const response = await fetch(dataUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue(`Ошибка ${response.status}`);
    }

    const  data  = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка отправки заказа");
  }
});
