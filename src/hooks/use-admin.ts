import { apiFetch } from "@/api";
import { queryClient } from "@/app/providers/query-providers";
import { UsersResponse } from "@/types/admin-types";
import {
  RegisterRequest,
  RegisterResponse,
  UpdateUserRequest,
} from "@/types/auth-types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => apiFetch<UsersResponse>("/users"),
    retry: false,
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["users"],
    mutationFn: (payload: RegisterRequest) =>
      apiFetch<RegisterResponse>("/register", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUpdateUser = (id: number) => {
  return useMutation({
    mutationKey: ["users"],
    mutationFn: (payload: UpdateUserRequest) =>
      apiFetch<RegisterResponse>(`/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
