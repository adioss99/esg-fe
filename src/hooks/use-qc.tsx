import { apiFetch, fetchPDF } from "@/api";
import { queryClient } from "@/app/providers/query-providers";
import { ApiResponse } from "@/types/api-type";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreateQc = (prodId: number) => {
  return useMutation({
    mutationKey: ["qc"],
    mutationFn: (payload: { notes: string; passed: boolean }) =>
      apiFetch<ApiResponse<null>>(`/qc-report/${prodId}`, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    retry: false,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetQcReport = () => {
  return useQuery({
    queryKey: ["qc"],
    queryFn: ({ queryKey }) => fetchPDF(queryKey[1] as string),
    retry: false,
  });
};
