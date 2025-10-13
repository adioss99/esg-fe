"use client";

import { useEffect } from "react";

import { useGetRefreshToken } from "@/hooks/use-auth";
import { getRemainingTime } from "@/lib/jwt";
import { usePersistStore } from "@/stores/use-persist";

export function useAutoRefresh() {
  const { mutateAsync: getRefreshToken } = useGetRefreshToken();
  const token = usePersistStore((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;
    const remaining = getRemainingTime(token);
    async function refreshFn() {
      return await getRefreshToken();
    }

    if (remaining <= 0) {
      refreshFn();
      return;
    }
    const refreshIn = (remaining - 30) * 1000;

    const interval = setInterval(() => {
      try {
        refreshFn();
      } catch (err) {
        throw new Error("Refresh error" + err);
      }
    }, refreshIn);
    return () => {
      clearInterval(interval);
    };
  }, [token, getRefreshToken]);
}
