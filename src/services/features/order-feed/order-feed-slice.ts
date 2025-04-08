import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TWebsocketOrder,
  TWebsocketOrders,
  WebsocketStatus,
} from "../../../types/order-feed";

export type TOrdersState = {
  status: string;
  orders: TWebsocketOrder[];
  connectionError: string;
  loader: boolean;
  total: number | null;
  totalToday: number | null;
};

const initialState: TOrdersState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: "",
  loader: false,
  total: null,
  totalToday: null,
};

const wsOrdersSlice = createSlice({
  name: "wsOrders",
  initialState,
  reducers: {
    wsConnectionStart(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<string>
    ) {},
    wsConnecting(state) {
      state.status = WebsocketStatus.CONNECTING;
      state.loader = true;
    },
    wsOpen(state) {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
      state.loader = true;
    },
    wsMessage(state, action: PayloadAction<TWebsocketOrders>) {
      state.orders = action.payload.orders;
      state.loader = false;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    wsClose(state) {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsError(state, action: PayloadAction<string>) {
      state.connectionError = action.payload;
    },
  },
});

export const {
  wsConnecting,
  wsOpen,
  wsMessage,
  wsClose,
  wsError,
  wsConnectionStart,
} = wsOrdersSlice.actions;
export default wsOrdersSlice.reducer;
