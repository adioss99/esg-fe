import { apiFetch } from "@/api";
import { queryClient } from "@/app/providers/query-providers";
import { ApiResponse } from "@/types/api-type";
import {
  ProductDetailResponse,
  ProductFormResponse,
  ProductRequest,
  ProductsResponse,
  UpdateProductRequest,
} from "@/types/product-types";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
  return useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: () => apiFetch<ProductsResponse>("/production-orders"),
    retry: false,
  });
};

export const useGetProductDetail = (referenceNo: string) => {
  return useQuery<ProductDetailResponse>({
    queryKey: ["product", referenceNo],
    queryFn: () => apiFetch<ProductDetailResponse>(`/production-order/${referenceNo}`),
    retry: false,
  });
}

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: (payload: ProductRequest) =>
      apiFetch<ProductFormResponse>("/production-order", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = (referenceNo: string) => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: (payload: UpdateProductRequest) =>
      apiFetch<ProductFormResponse>(`/production-order/${referenceNo}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ["products"],
    mutationFn: (referenceNo: string) =>
      apiFetch<ApiResponse<null>>(`/production-order/${referenceNo}`, {
        method: "DELETE",
      }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
