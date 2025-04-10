import { describe, it, expect } from "vitest";
import reducer, {
  clearIngredients,
  clearError,
  initialState,
} from "./ingredients-slice";
import { thunkFetchIngredients } from "./ingredients-thunk";
import { BurgerItem } from "../../../types/types";
import { fillingIngredient, fillingIngredient2 } from "../../../utils/mocks";

const mockIngredients: BurgerItem[] = [fillingIngredient, fillingIngredient2];

describe("ingredientsSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("plain reducers", () => {
    it("clearIngredients: should clear the items array", () => {
      const stateWithItems = { ...initialState, items: mockIngredients };
      const state = reducer(stateWithItems, clearIngredients());
      expect(state.items).toEqual([]);
    });

    it("clearError: should clear the error field", () => {
      const stateWithError = { ...initialState, error: "Some error occurred" };
      const state = reducer(stateWithError, clearError());
      expect(state.error).toBeNull();
    });
  });

  describe("extra reducers for thunkFetchIngredients", () => {
    it("pending: should set loading to true and error to null", () => {
      const action = { type: thunkFetchIngredients.pending.type };
      const state = reducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it("fulfilled: should update items and set loading to false", () => {
      const action = {
        type: thunkFetchIngredients.fulfilled.type,
        payload: mockIngredients,
      };
      const state = reducer({ ...initialState, loading: true }, action);
      expect(state.loading).toBe(false);
      expect(state.items).toEqual(mockIngredients);
    });

    it("rejected: should clear items, set loading to false and update error", () => {
      const errorMsg = "Unknown error";
      const action = {
        type: thunkFetchIngredients.rejected.type,
        payload: errorMsg,
      };
      const stateWithItems = {
        ...initialState,
        loading: true,
        items: mockIngredients,
      };
      const state = reducer(stateWithItems, action);
      expect(state.loading).toBe(false);
      expect(state.items).toEqual([]);
      expect(state.error).toEqual(errorMsg);
    });
  });
});
