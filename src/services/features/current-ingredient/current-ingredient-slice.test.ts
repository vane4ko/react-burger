import { describe, it, expect } from "vitest";
import reducer, {
  setCurrentIngredient,
  clearCurrentIngredient,
} from "./current-ingredient";
import { fillingIngredient } from "../../../utils/mocks";

const initialState = {
  ingredient: null,
};

describe("currentIngredientSlice", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should set selected ingredient", () => {
    const previousState = initialState;
    const newState = reducer(
      previousState,
      setCurrentIngredient(fillingIngredient)
    );
    expect(newState.ingredient).toEqual(fillingIngredient);
  });

  it("should clear selected ingredient", () => {
    const previousState = { ingredient: fillingIngredient };
    const newState = reducer(previousState, clearCurrentIngredient());
    expect(newState.ingredient).toBeNull();
  });
});
