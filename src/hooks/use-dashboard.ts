"use client";

import { apiFetch } from "@/api";
import { ApiResponse } from "@/types/api-type";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useGetDashboard = () => {
  interface Productdashboard {
    completed: number;
    pending: number;
    cancelled: number;
  }
  interface QcDashboard {
    passedCount: number;
    failedCount: number;
  }
  return useQueries({
    queries: [
      {
        queryKey: ["products"],
        queryFn: () =>
          apiFetch<ApiResponse<Productdashboard>>("/dashboard/product"),
        retry: false,
      },
      {
        queryKey: ["qc"],
        queryFn: () => apiFetch<ApiResponse<QcDashboard>>("/dashboard/qc"),
        retry: false,
      },
    ],
  });
};

export const useAdminDashboard = () => {
  interface AdminDashboard {
    admin: number;
    operator: number;
    qc: number;
  }
  return useQuery({
    queryKey: ["user"],
    queryFn: () => apiFetch<ApiResponse<AdminDashboard>>("/dashboard/user"),
    retry: false,
  });
};
