import { describe, it, expect } from "vitest";
import reducer, {
  wsConnecting,
  wsOpen,
  wsMessage,
  wsClose,
  wsError,
  wsConnectionStart,
  initialState,
} from "./order-feed-slice";
import { WebsocketStatus } from "../../../types/order-feed";
import { WebsocketOrders } from "../../../utils/mocks";

describe("wsOrdersSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle wsConnecting", () => {
    const state = reducer(initialState, wsConnecting());
    expect(state.status).toBe(WebsocketStatus.CONNECTING);
    expect(state.loader).toBe(true);
  });

  it("should handle wsOpen", () => {
    const state = reducer(initialState, wsOpen());
    expect(state.status).toBe(WebsocketStatus.ONLINE);
    expect(state.connectionError).toBe("");
    expect(state.loader).toBe(true);
  });

  it("should handle wsMessage", () => {
    const state = reducer(initialState, wsMessage(WebsocketOrders));
    expect(state.orders).toEqual(WebsocketOrders.orders);
    expect(state.total).toBe(WebsocketOrders.total);
    expect(state.totalToday).toBe(WebsocketOrders.totalToday);
    expect(state.loader).toBe(false);
  });

  it("should handle wsClose", () => {
    const state = reducer(
      { ...initialState, status: WebsocketStatus.ONLINE },
      wsClose()
    );
    expect(state.status).toBe(WebsocketStatus.OFFLINE);
  });

  it("should handle wsError", () => {
    const errorMessage = "Connection failed";
    const state = reducer(initialState, wsError(errorMessage));
    expect(state.connectionError).toBe(errorMessage);
  });

  it("should ignore wsConnectionStart since it's empty reducer", () => {
    const state = reducer(
      initialState,
      wsConnectionStart("wss://norma.nomoreparties.space/orders/all")
    );
    expect(state).toEqual(initialState);
  });
});
