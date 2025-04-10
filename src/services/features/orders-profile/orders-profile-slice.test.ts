import { describe, it, expect } from "vitest";
import reducer, {
  wsConnectingInProfile,
  wsOpenInProfile,
  wsMessageInProfile,
  wsCloseInProfile,
  wsErrorInProfile,
  wsConnectionStartInProfile,
  initialState,
} from "./orders-profile-slice";
import { WebsocketStatus } from "../../../types/order-feed";
import { WebsocketOrders } from "../../../utils/mocks";

describe("profileOrdersSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle wsConnectingInProfile", () => {
    const state = reducer(initialState, wsConnectingInProfile());
    expect(state.status).toBe(WebsocketStatus.CONNECTING);
    expect(state.loader).toBe(true);
  });

  it("should handle wsOpenInProfile", () => {
    const state = reducer(initialState, wsOpenInProfile());
    expect(state.status).toBe(WebsocketStatus.ONLINE);
    expect(state.connectionError).toBe("");
    expect(state.loader).toBe(true);
  });

  it("should handle wsMessageInProfile", () => {
    const state = reducer(initialState, wsMessageInProfile(WebsocketOrders));
    expect(state.orders).toEqual(WebsocketOrders.orders);
    expect(state.loader).toBe(false);
  });

  it("should handle wsCloseInProfile", () => {
    const state = reducer(
      { ...initialState, status: WebsocketStatus.ONLINE },
      wsCloseInProfile()
    );
    expect(state.status).toBe(WebsocketStatus.OFFLINE);
  });

  it("should handle wsErrorInProfile", () => {
    const error = "WebSocket error";
    const state = reducer(initialState, wsErrorInProfile(error));
    expect(state.connectionError).toBe(error);
  });

  it("should do nothing for wsConnectionStartInProfile (noop reducer)", () => {
    const state = reducer(
      initialState,
      wsConnectionStartInProfile("wss://norma.nomoreparties.space/orders/all")
    );
    expect(state).toEqual(initialState);
  });
});
