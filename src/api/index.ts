import { toast } from "react-hot-toast";

import { usePersistStore } from "@/stores/use-persist";
import type { RefreshTokenResponse } from "@/types/auth-types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

export async function apiFetch<T>(
  endpoint: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const token = usePersistStore.getState().auth.token;
  const { setAuthToken, logout } = usePersistStore.getState();

  const doFetch = async (accessToken?: string): Promise<Response> => {
    const res = await fetch(BASE_URL + endpoint, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
        "Content-Type": "application/json",
      },
      credentials: "include", // send cookies for refresh token
    });
    return res;
  };

  let res = await doFetch(token || undefined);
  const resJson = await res.json();

  if (
    res.status === 401 &&
    (resJson.message === "Token invalid" || resJson.message === "Unauthorized")
  ) {
    // try refresh
    try {
      const refreshRes = await getRefreshToken(); // will use cookies
      if (refreshRes.success) {
        // update Zustand with new token
        setAuthToken({
          token: refreshRes.accessToken,
        });
        // retry original request with new token
        res = await doFetch(refreshRes.accessToken);
      } else {
        // refresh failed, logout
        logout();
        throw new Error("Unauthorized - refresh failed");
      }
    } catch (err) {
      logout();
      throw new Error("Fetch error: " + err);
    }
  } else if (res.status === 500) {
    toast.error("Internal Server Error");
    // logout();
    throw new Error("Internal Server Error");
  }

  return resJson;
}

export async function fetchPDF(reportId: string) {
  const token = usePersistStore.getState().auth.token;
  const res = await fetch(`${BASE_URL}/qc-report/${reportId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token ?? ""}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch PDF");

  const blob = await res.blob();

  const url = window.URL.createObjectURL(new Blob([blob]));
  return url;
}

const getRefreshToken = async (): Promise<RefreshTokenResponse> => {
  const response = await fetch(`${BASE_URL}/refresh-token`, {
    method: "GET",
    credentials: "include",
  });
  const resData = await response.json();
  return resData;
};
