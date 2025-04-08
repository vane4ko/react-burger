import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWithRefresh } from "../auth/auth-utils";
import { OrderData } from "../../../types/order-feed";

export const thunkGetOrder = createAsyncThunk<OrderData, number>(
  "order/thunkGetOrder",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const data = await fetchWithRefresh<OrderData>(`/orders/${id} `, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка отправки заказа");
    }
  }
);
