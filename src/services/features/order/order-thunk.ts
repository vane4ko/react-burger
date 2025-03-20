import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  OrderFormData,
  OrderResponseFormData,
} from "../../../types/order-types";
import { request } from "../../../utils/api";

export const thunkSendOrder = createAsyncThunk<
  OrderResponseFormData,
  OrderFormData,
  { rejectValue: string }
>("order/thunkSendOrder", async (orderData, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const data = await request<OrderResponseFormData>("/orders", {
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
