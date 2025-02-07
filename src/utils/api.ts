import { baseUrl } from "./data";

export function checkResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    return res.json() as Promise<T>;
  } else {
    return Promise.reject<T>(`Ошибка ${res.status}: ${res.statusText}`);
  }
}

export function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  return fetch(`${baseUrl}${endpoint}`, options).then((res: Response) =>
    checkResponse<T>(res)
  );
}
