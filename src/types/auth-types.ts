import type { ApiResponse } from "./api-type";

export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest extends LoginRequest {
  name: string;
  role: UserRole;
}
export type UpdateUserRequest = {
  name: string;
  email: string;
  role: UserRole;
};

export interface UserType {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export type UserProfileResponse = ApiResponse<UserType>;
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

export type UserRole = "ADMIN" | "QC" | "OPERATOR";
