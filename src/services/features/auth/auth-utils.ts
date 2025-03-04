import { request } from "../../../utils/api";
import { baseUrl } from "../../../utils/data";

export async function refreshAccessToken() {
  try {
    const res = await fetch(`${baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: localStorage.getItem("refreshToken") }),
    });

    if (!res.ok) {
      Promise.reject(new Error(`Error ${res.status}`));
    }

    const { accessToken, refreshToken } = await res.json();

    localStorage.setItem("accessToken", accessToken.split(" ")[1]);
    localStorage.setItem("refreshToken", refreshToken);

    return localStorage.getItem("accessToken");
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

export async function fetchWithRefresh<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  try {
    return await request<T>(url, options);
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "jwt expired") {
      try {
        const token = await refreshAccessToken();
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
        return await request<T>(url, options);
      } catch (refreshError: unknown) {
        return Promise.reject("Ошибка обновления токена");
      }
    } else {
      if (err instanceof Error) {
        return Promise.reject(err);
      }
      return Promise.reject("Неизвестная ошибка");
    }
  }
}
