import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../../types/user-types";
import {
  thunkGetUser,
  thunkLogin,
  thunkLogout,
  thunkPathcUser,
  thunkRefresh,
  thunkResetPassword,
  thunkSignUp,
} from "./auth-thunk";

type AuthState = {
  user: UserType | null;
  status: "pending" | "guest" | "authenticated";
  isLoading: boolean;
  error: string;
  resetIsActive: boolean;
};

const initialState: AuthState = {
  status: "pending",
  isLoading: false,
  user: null,
  error: "",
  resetIsActive: false,
};

const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken.split(" ")[1]);
  localStorage.setItem("refreshToken", refreshToken);
};

const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    offReset: (state) => {
      state.resetIsActive = false;
    },
    kickUser: (state) => {
      state.status = "guest";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(thunkSignUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user ?? null;
        state.status = "authenticated";
        if (action.payload)
          saveTokens(action.payload.accessToken, action.payload.refreshToken);
      })
      .addCase(thunkSignUp.rejected, (state, action) => {
        state.error = action.payload ?? "Неизвестная ошибка";
        state.isLoading = false;
        state.status = "guest";
      })
      .addCase(thunkSignUp.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })

      .addCase(thunkGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "authenticated";
        state.user = action.payload?.user ?? null;
      })
      .addCase(thunkGetUser.rejected, (state, action) => {
        state.error = action.payload ?? "Неизвестная ошибка";
        state.isLoading = false;
      })
      .addCase(thunkGetUser.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })

      .addCase(thunkPathcUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user ?? null;
      })
      .addCase(thunkPathcUser.rejected, (state, action) => {
        state.error = action.payload ?? "Неизвестная ошибка";
        state.isLoading = false;
      })
      .addCase(thunkPathcUser.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })

      .addCase(thunkLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user ?? null;
        state.status = "authenticated";
        if (action.payload)
          saveTokens(action.payload.accessToken, action.payload.refreshToken);
      })
      .addCase(thunkLogin.rejected, (state, action) => {
        state.error = action.payload ?? "Неизвестная ошибка";
        state.isLoading = false;
        state.status = "guest";
      })
      .addCase(thunkLogin.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })

      .addCase(thunkLogout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.status = "guest";
        clearTokens();
      })
      .addCase(thunkLogout.rejected, (state, action) => {
        state.error = action.payload ?? "Неизвестная ошибка";
        state.isLoading = false;
      })
      .addCase(thunkLogout.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })

      .addCase(thunkRefresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "authenticated";
        if (action.payload)
          saveTokens(action.payload.accessToken, action.payload.refreshToken);
      })
      .addCase(thunkRefresh.rejected, (state, action) => {
        state.error = action.payload ?? "Неизвестная ошибка";
        state.isLoading = false;
        state.status = "guest";
        clearTokens();
      })
      .addCase(thunkRefresh.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })

      .addCase(thunkResetPassword.fulfilled, (state) => {
        state.resetIsActive = true;
      });
  },
});
export const { offReset, kickUser } = authSlice.actions;
export default authSlice.reducer;
