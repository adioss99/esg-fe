import type { ApiResponse } from "./api-type";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest extends LoginRequest {
  name: string;
}

export type UserProfileResponse = ApiResponse<{
  id: string;
  name: string;
  email: string;
  role: string;
}>;
export type LoginResponse = UserProfileResponse & {
  accessToken: string;
};
export type RegisterResponse = UserProfileResponse;
export type RefreshTokenResponse = ApiResponse<{
  id: string;
  role: string;
}> & {
  accessToken: string;
};