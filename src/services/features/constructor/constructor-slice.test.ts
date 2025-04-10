import { describe, it, expect } from "vitest";
import reducer, {
  clearFillingItems,
  addIngredient,
  deleteIngredient,
  moveIngredient,
  initialState,
} from "./constructor-slice";
import {
  bunIngredient,
  fillingIngredient,
  fillingIngredient2,
} from "../../../utils/mocks";

describe("constructorSlice", () => {
  it("must return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("must add bun with addIngredient", () => {
    const action = addIngredient(bunIngredient);
    const newState = reducer(undefined, action);
    expect(newState.bun).toEqual(
      expect.objectContaining({
        _id: bunIngredient._id,
        type: bunIngredient.type,
        name: bunIngredient.name,
        price: bunIngredient.price,
      })
    );
    expect(newState.bun?.key).toBeDefined();
  });

  it("must add filling ingredient with addIngredient", () => {
    const action = addIngredient(fillingIngredient);
    const newState = reducer(undefined, action);
    expect(newState.filling.length).toBe(1);
    expect(newState.filling[0]).toEqual(
      expect.objectContaining({
        _id: fillingIngredient._id,
        type: fillingIngredient.type,
        name: fillingIngredient.name,
        price: fillingIngredient.price,
      })
    );
    expect(newState.filling[0].key).toBeDefined();
  });

  it("must clean all elements", () => {
    const initialState = {
      filling: [{ ...fillingIngredient, key: "key1" }],
      bun: { ...bunIngredient, key: "bunKey" },
    };

    const newState = reducer(initialState, clearFillingItems());
    expect(newState.filling).toEqual([]);
    expect(newState.bun).toEqual(null);
  });

  it("should delete bun", () => {
    const state = {
      filling: [{ ...fillingIngredient, key: "key1" }],
      bun: { ...bunIngredient, key: "bunKey" },
    };

    const newState = reducer(
      state,
      deleteIngredient({ type: "bun", key: "bunKey" })
    );
    expect(newState.bun).toBeNull();
    expect(newState.filling).toEqual(state.filling);
  });

  it("should delete ingredient", () => {
    const state = {
      filling: [
        { ...fillingIngredient, key: "key1" },
        { ...fillingIngredient2, key: "key2" },
      ],
      bun: { ...bunIngredient, key: "bunKey" },
    };

    const newState = reducer(
      state,
      deleteIngredient({ type: fillingIngredient.type, key: "key1" })
    );
    expect(newState.filling.length).toBe(1);
    expect(newState.filling[0].key).toEqual("key2");
    expect(newState.bun).toEqual(state.bun);
  });

  it("should change positions of ingredients", () => {
    const state = {
      filling: [
        { ...fillingIngredient, key: "key1" },
        { ...fillingIngredient2, key: "key2" },
        { ...fillingIngredient, key: "key3" },
      ],
      bun: { ...bunIngredient, key: "bunKey" },
    };

    const newState = reducer(
      state,
      moveIngredient({ dragIndex: 0, hoverIndex: 2 })
    );

    expect(newState.filling[0].key).toEqual("key2");
    expect(newState.filling[1].key).toEqual("key3");
    expect(newState.filling[2].key).toEqual("key1");
  });
});
