import { describe, it, expect } from "vitest";
import reducer, { offReset, kickUser, initialState } from "./auth-slice";
import {
  thunkSignUp,
  thunkGetUser,
  thunkPathcUser,
  thunkLogin,
  thunkLogout,
  thunkRefresh,
  thunkResetPassword,
} from "./auth-thunk";
import { UserType } from "../../../types/user-types";
import { mockUser } from "../../../utils/mocks";


describe("authSlice reducers", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("plain reducers", () => {
    it("offReset: should set resetIsActive to false", () => {
      const state = { ...initialState, resetIsActive: true };
      const newState = reducer(state, offReset());
      expect(newState.resetIsActive).toEqual(false);
    });

    it('kickUser: should set status to "guest"', () => {
      const state = { ...initialState, status: "authenticated" } as const;
      const newState = reducer(state, kickUser());
      expect(newState.status).toEqual("guest");
    });
  });

  describe("thunkSignUp", () => {
    it("pending: should set error to empty and isLoading to true", () => {
      const action = { type: thunkSignUp.pending.type };
      const state = reducer(initialState, action);
      expect(state.error).toEqual("");
      expect(state.isLoading).toEqual(true);
    });

    it('fulfilled: should set isLoading false, user and status "authenticated"', () => {
      const action = {
        type: thunkSignUp.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toEqual(false);
      expect(state.user).toEqual(mockUser);
      expect(state.status).toEqual("authenticated");
    });

    it('rejected: should set error, isLoading false and status "guest"', () => {
      const errorMsg = "SignUp error occurred";
      const action = {
        type: thunkSignUp.rejected.type,
        payload: errorMsg,
      };
      const state = reducer(
        { ...initialState, isLoading: true, status: "pending" },
        action
      );
      expect(state.error).toEqual(errorMsg);
      expect(state.isLoading).toEqual(false);
      expect(state.status).toEqual("guest");
    });
  });

  describe("thunkGetUser", () => {
    it("pending: should set error to empty and isLoading to true", () => {
      const action = { type: thunkGetUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.error).toEqual("");
      expect(state.isLoading).toEqual(true);
    });

    it('fulfilled: should set isLoading false, status "authenticated" and update user', () => {
      const action = {
        type: thunkGetUser.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toEqual(false);
      expect(state.user).toEqual(mockUser);
      expect(state.status).toEqual("authenticated");
    });

    it("rejected: should set error and isLoading false", () => {
      const errorMsg = "GetUser error occurred";
      const action = {
        type: thunkGetUser.rejected.type,
        payload: errorMsg,
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.error).toEqual(errorMsg);
      expect(state.isLoading).toEqual(false);
    });
  });

  describe("thunkPathcUser", () => {
    it("pending: should set error to empty and isLoading to true", () => {
      const action = { type: thunkPathcUser.pending.type };
      const state = reducer(initialState, action);
      expect(state.error).toEqual("");
      expect(state.isLoading).toEqual(true);
    });

    it("fulfilled: should set isLoading false and update user", () => {
      const updatedUser: UserType = {
        email: "updated@example.com",
        name: "Updated User",
      };
      const action = {
        type: thunkPathcUser.fulfilled.type,
        payload: { user: updatedUser },
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toEqual(false);
      expect(state.user).toEqual(updatedUser);
    });

    it("rejected: should set error and isLoading false", () => {
      const errorMsg = "PatchUser error occurred";
      const action = {
        type: thunkPathcUser.rejected.type,
        payload: errorMsg,
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.error).toEqual(errorMsg);
      expect(state.isLoading).toEqual(false);
    });
  });

  describe("thunkLogin", () => {
    it("pending: should set error to empty and isLoading to true", () => {
      const action = { type: thunkLogin.pending.type };
      const state = reducer(initialState, action);
      expect(state.error).toEqual("");
      expect(state.isLoading).toEqual(true);
    });

    it('fulfilled: should set isLoading false, update user and status "authenticated"', () => {
      const action = {
        type: thunkLogin.fulfilled.type,
        payload: { user: mockUser },
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.isLoading).toEqual(false);
      expect(state.user).toEqual(mockUser);
      expect(state.status).toEqual("authenticated");
    });

    it('rejected: should set error, isLoading false and status "guest"', () => {
      const errorMsg = "Login error occurred";
      const action = {
        type: thunkLogin.rejected.type,
        payload: errorMsg,
      };
      const state = reducer(
        { ...initialState, isLoading: true, status: "pending" },
        action
      );
      expect(state.error).toEqual(errorMsg);
      expect(state.isLoading).toEqual(false);
      expect(state.status).toEqual("guest");
    });
  });

  describe("thunkLogout", () => {
    it("pending: should set error to empty and isLoading to true", () => {
      const action = { type: thunkLogout.pending.type };
      const state = reducer(initialState, action);
      expect(state.error).toEqual("");
      expect(state.isLoading).toEqual(true);
    });

    it('fulfilled: should set isLoading false, clear user and set status "guest"', () => {
      const action = {
        type: thunkLogout.fulfilled.type,
      };
      const stateWithUser = {
        ...initialState,
        isLoading: true,
        user: mockUser,
        status: "authenticated",
      } as const;
      const state = reducer(stateWithUser, action);
      expect(state.isLoading).toEqual(false);
      expect(state.user).toBeNull();
      expect(state.status).toEqual("guest");
    });

    it("rejected: should set error and isLoading false", () => {
      const errorMsg = "Logout error occurred";
      const action = {
        type: thunkLogout.rejected.type,
        payload: errorMsg,
      };
      const state = reducer({ ...initialState, isLoading: true }, action);
      expect(state.error).toEqual(errorMsg);
      expect(state.isLoading).toEqual(false);
    });
  });

  describe("thunkRefresh", () => {
    it("pending: should set error to empty and isLoading to true", () => {
      const action = { type: thunkRefresh.pending.type };
      const state = reducer(initialState, action);
      expect(state.error).toEqual("");
      expect(state.isLoading).toEqual(true);
    });

    it('fulfilled: should set isLoading false and status "authenticated"', () => {
      const action = { type: thunkRefresh.fulfilled.type };
      const state = reducer(
        { ...initialState, isLoading: true, status: "guest" },
        action
      );
      expect(state.isLoading).toEqual(false);
      expect(state.status).toEqual("authenticated");
    });

    it('rejected: should set error, isLoading false and status "guest"', () => {
      const errorMsg = "Refresh error occurred";
      const action = {
        type: thunkRefresh.rejected.type,
        payload: errorMsg,
      };
      const state = reducer(
        { ...initialState, isLoading: true, status: "authenticated" },
        action
      );
      expect(state.error).toEqual(errorMsg);
      expect(state.isLoading).toEqual(false);
      expect(state.status).toEqual("guest");
    });
  });

  describe("thunkResetPassword", () => {
    it("fulfilled: should set resetIsActive to true", () => {
      const action = { type: thunkResetPassword.fulfilled.type };
      const state = reducer(initialState, action);
      expect(state.resetIsActive).toEqual(true);
    });
  });
});
