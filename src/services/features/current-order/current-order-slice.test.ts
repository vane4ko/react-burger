import { describe, it, expect } from "vitest";
import reducer, {
  setCurrentOrder,
  clearCurrentOrder,
  initialState,
} from "./current-order";
import { thunkGetOrder } from "./order-thunk";
import { mockOrder } from "../../../utils/mocks";

describe("currentOrderSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("plain reducers", () => {
    it("setCurrentOrder: should set the current order", () => {
      const previousState = initialState;
      const newState = reducer(previousState, setCurrentOrder(mockOrder));
      expect(newState.order).toEqual(mockOrder);
    });

    it("clearCurrentOrder: should clear the current order", () => {
      const previousState = { ...initialState, order: mockOrder };
      const newState = reducer(previousState, clearCurrentOrder());
      expect(newState.order).toBeNull();
    });
  });

  describe("extra reducers for thunkGetOrder", () => {
    it("pending: should set loading to true and error to null", () => {
      const action = { type: thunkGetOrder.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("fulfilled: should update the order, set loading to false", () => {
      const action = {
        type: thunkGetOrder.fulfilled.type,
        payload: { orders: [mockOrder] },
      };
      const state = reducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.order).toEqual(mockOrder);
    });

    it("rejected: should clear the order, set loading to false and error message", () => {
      const action = { type: thunkGetOrder.rejected.type };
      const state = reducer(
        { ...initialState, loading: true, order: mockOrder },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.order).toBeNull();
      expect(state.error).toEqual("Неизвестная ошибка");
    });
  });
});
