import { apiFetch } from "@/api";
import { queryClient } from "@/app/providers/query-providers";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateQc = (prodId: number) => {
  return useMutation({
    mutationKey: ["qc"],
    mutationFn: () => apiFetch(`/qc-report/${prodId}/qc`, { method: "POST" }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qc"] });
    },
  });
};

export const useGetReportQc = (reffNo: string) => {
  return useQuery({
    queryKey: ["qc"],
    queryFn: () => apiFetch(`/qc-report/${reffNo}`, { method: "GET" }),
    retry: false,
  });
};
