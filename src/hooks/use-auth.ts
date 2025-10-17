import { useMutation } from "@tanstack/react-query";

import { usePersistStore } from "@/stores/use-persist";
import {
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
} from "@/types/auth-types";
import { apiFetch } from "@/api";
import { deleteRefreshCookie } from "@/lib/cookies";

export const useLogin = () => {
  const setAuthToken = usePersistStore((state) => state.setAuthToken);
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (payload: LoginRequest) =>
      apiFetch<LoginResponse>("/login", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (res) => {
      if (res.success) {
        setAuthToken({
          token: res.accessToken,
          _user: res.data.role,
        });
      }
    },
    onError: () => {
      throw new Error("Internal Server Error");
    },
    retry: false,
  });
};

export const useLogout = () => {
  const logout = usePersistStore((state) => state.logout);
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => apiFetch("/logout", { method: "DELETE" }),
    onError: () => {
      throw new Error("Internal Server Error");
    },
    onSettled: () => {
      logout();
      deleteRefreshCookie();
    },
    retry: false,
  });
};

export const useGetRefreshToken = () => {
  const setAuthToken = usePersistStore((state) => state.setAuthToken);
  const logout = usePersistStore((state) => state.logout);
  return useMutation<RefreshTokenResponse>({
    mutationKey: ["getRefreshToken"],
    mutationFn: () =>
      apiFetch<RefreshTokenResponse>("/refresh-token", { method: "GET" }),
    onSuccess: (res) => {
      if (res.success) {
        setAuthToken({
          token: res.accessToken,
          _user: res.data.role,
        });
      }
    },
    onError: () => {
      logout();
      deleteRefreshCookie();
      throw new Error("Internal Server Error");
    },
    retry: false,
  });
};
