export type UserType = { email: string; name: string };

export type BackendAuth = {
  success: true;
  user: UserType;
  accessToken: string;
  refreshToken: string;
};
export type BackendUser = {
  success: true;
  user: UserType;
};
export type BackendRefresh = {
  success: true;
  accessToken: string;
  refreshToken: string;
};
export type BackendLogout = {
  success: true;
  message: string;
};

export type ResetFormData = {
  email: string;
};
export type SetPassFormData = {
  password: string;
  token: string;
};
export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  email: string;
  name: string;
  password: string;
};
export type RefreshFormData = {
  token: string;
};
export type LogoutFormData = {
  token: string;
};
