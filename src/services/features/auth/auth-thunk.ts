import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/api";
import {
  BackendAuth,
  BackendLogout,
  BackendRefresh,
  BackendUser,
  LoginFormData,
  LogoutFormData,
  RefreshFormData,
  ResetFormData,
  SetPassFormData,
  SignupFormData,
} from "../../../types/user-types";
import { fetchWithRefresh } from "./auth-utils";

export const thunkSignUp = createAsyncThunk<
  BackendAuth,
  SignupFormData,
  { rejectValue: string }
>("authSlice/thunkSignUp", async (signupFormData, thunkAPI) => {
  try {
    const data = await request<BackendAuth>("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Ошибка регистрации: ${error}`);
  }
});

export const thunkLogin = createAsyncThunk<
  BackendAuth,
  LoginFormData,
  { rejectValue: string }
>("authSlice/thunkLogin", async (signupFormData, thunkAPI) => {
  try {
    const data = await request<BackendAuth>("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`${error}`);
  }
});
export const thunkLogout = createAsyncThunk<
  BackendLogout,
  LogoutFormData,
  { rejectValue: string }
>("authSlice/thunkLogout", async (signupFormData, thunkAPI) => {
  try {
    const data = await request<BackendLogout>("/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Ошибка: ${error}`);
  }
});
export const thunkRefresh = createAsyncThunk<
  BackendRefresh,
  RefreshFormData,
  { rejectValue: string }
>("authSlice/thunkRefresh", async (signupFormData, thunkAPI) => {
  try {
    const data = await request<BackendRefresh>("/auth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Ошибка: ${error}`);
  }
});
export const thunkGetUser = createAsyncThunk<
  BackendUser,
  RefreshFormData,
  { rejectValue: string }
>("authSlice/thunkGetUser", async (formData, thunkAPI) => {
  try {
    const data = await request<BackendUser>("/auth/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${formData.token}`,
      },
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Ошибка: ${error}`);
  }
});

export const thunkPathcUser = createAsyncThunk<
  BackendUser,
  SignupFormData,
  { rejectValue: string }
>("authSlice/thunkPathcUser", async (signupFormData, thunkAPI) => {
  try {
    const token = localStorage.getItem("accessToken");
    const data = await fetchWithRefresh<BackendUser>("/auth/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(signupFormData),
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Ошибка: ${error}`);
  }
});

export const thunkResetPassword = createAsyncThunk<
  BackendLogout,
  ResetFormData,
  { rejectValue: string }
>("authSlice/thunkResetPassword", async (signupFormData, thunkAPI) => {
  try {
    const data = await request<BackendLogout>("/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Ошибка: ${error}`);
  }
});

export const thunkSetPassword = createAsyncThunk<
  BackendLogout,
  SetPassFormData,
  { rejectValue: string }
>("authSlice/thunkSetPassword", async (signupFormData, thunkAPI) => {
  try {
    const data = await request<BackendLogout>("/password-reset/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(`Ошибка: ${error}`);
  }
});
