import { describe, it, expect } from "vitest";
import reducer, { setOrderId, initialState } from "./order-slice";
import { thunkSendOrder } from "./order-thunk";

describe("orderSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("plain reducers", () => {
    it("setOrderId: should update the orderId", () => {
      const newOrderId = 123;
      const state = reducer(initialState, setOrderId(newOrderId));
      expect(state.orderId).toBe(newOrderId);
    });
  });

  describe("extra reducers for thunkSendOrder", () => {
    it("pending: should set loading to true and error to null", () => {
      const action = { type: thunkSendOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("fulfilled: should update orderId, status, and set loading to false", () => {
      const payload = {
        order: { number: 456 },
        success: true,
      };
      const action = { type: thunkSendOrder.fulfilled.type, payload };
      const pendingState = { ...initialState, loading: true };
      const state = reducer(pendingState, action);
      expect(state.loading).toBe(false);
      expect(state.orderId).toBe(payload.order.number);
      expect(state.status).toBe(payload.success);
    });

    it("rejected: should reset orderId, set loading to false, status to false, and update error", () => {
      const errorMsg = "Some error occurred";
      const action = {
        type: thunkSendOrder.rejected.type,
        payload: errorMsg,
      };
      const pendingState = {
        ...initialState,
        loading: true,
        orderId: 789,
        status: true,
      };
      const state = reducer(pendingState, action);
      expect(state.loading).toBe(false);
      expect(state.orderId).toBeNull();
      expect(state.status).toBe(false);
      expect(state.error).toEqual(errorMsg);
    });
  });
});
