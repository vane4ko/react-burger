import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  orderFormData,
  orderResponseFormData,
} from "../../../types/order-types";
import { request } from "../../../utils/api";

export const thunkSendOrder = createAsyncThunk<
  orderResponseFormData,
  orderFormData,
  { rejectValue: string }
>("order/thunkSendOrder", async (orderData, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const data = await request<orderResponseFormData>("/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Ошибка отправки заказа");
  }
});
