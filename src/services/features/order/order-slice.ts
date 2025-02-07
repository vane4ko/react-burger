import { createSlice } from "@reduxjs/toolkit";
import { thunkSendOrder } from "./order-thunk";

type orderState = {
  orderId: null | number;
  status: boolean;
  loading: boolean;
  error: null | string;
};

const initialState: orderState = {
  orderId: null,
  status: false,
  loading: false,
  error: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderId: (state, action) => {
      state.orderId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkSendOrder.fulfilled, (state, action) => {
      state.orderId = action.payload.order.number;
      state.status = action.payload.success;
      state.loading = false;
    });

    builder.addCase(thunkSendOrder.rejected, (state, action) => {
      state.orderId = null;
      state.loading = false;
      state.status = false;
      state.error = action.payload || "Неизвестная ошибка";
    });

    builder.addCase(thunkSendOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { setOrderId } = orderSlice.actions;
export default orderSlice.reducer;
