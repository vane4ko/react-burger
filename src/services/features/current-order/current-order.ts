import { createSlice } from "@reduxjs/toolkit";
import { thunkGetOrder } from "./order-thunk";
import { TWebsocketOrder } from "../../../types/order-feed";

type CurrentOrderState = {
  order: TWebsocketOrder | null;
  loading: boolean;
  error: null | string;
};

export const initialState: CurrentOrderState = {
  order: null,
  loading: false,
  error: null,
};

const currentOrderSlice = createSlice({
  name: "currentOrder",
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.order = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.order = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(thunkGetOrder.fulfilled, (state, action) => {
      state.order = action.payload.orders[0];
      state.loading = false;
    });

    builder.addCase(thunkGetOrder.rejected, (state) => {
      state.order = null;
      state.loading = false;
      state.error = "Неизвестная ошибка";
    });

    builder.addCase(thunkGetOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
  },
});

export const { setCurrentOrder, clearCurrentOrder } = currentOrderSlice.actions;
export default currentOrderSlice.reducer;
