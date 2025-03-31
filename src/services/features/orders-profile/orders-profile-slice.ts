import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  TWebsocketOrder,
  TWebsocketOrders,
  WebsocketStatus,
} from "../../../types/order-feed";

export type TProfileOrdersState = {
  status: string;
  orders: TWebsocketOrder[];
  connectionError: string;
  loader: boolean;
};

const initialState: TProfileOrdersState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectionError: "",
  loader: false,
};

const profileOrdersSlice = createSlice({
  name: "profileOrders",
  initialState,
  reducers: {
    wsConnectionStartInProfile(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _action: PayloadAction<string>
    ) {},
    wsConnectingInProfile(state) {
      state.status = WebsocketStatus.CONNECTING;
      state.loader = true;
    },
    wsOpenInProfile(state) {
      state.status = WebsocketStatus.ONLINE;
      state.connectionError = "";
      state.loader = true;
    },
    wsMessageInProfile(state, action: PayloadAction<TWebsocketOrders>) {
      state.orders = action.payload.orders;
      state.loader = false;
    },
    wsCloseInProfile(state) {
      state.status = WebsocketStatus.OFFLINE;
    },
    wsErrorInProfile(state, action: PayloadAction<string>) {
      state.connectionError = action.payload ?? "";
    },
  },
});

export const {
  wsConnectingInProfile,
  wsOpenInProfile,
  wsMessageInProfile,
  wsCloseInProfile,
  wsErrorInProfile,
  wsConnectionStartInProfile,
} = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
