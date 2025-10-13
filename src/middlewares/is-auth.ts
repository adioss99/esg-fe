"use client";

// import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UserRole } from "@/types/auth-types";
import { redirect } from "next/navigation";
import { usePersistStore } from "@/stores/use-persist";

type DecodedToken = {
  id: string;
  role: UserRole;
  exp: number;
};

export function IsAuth() {
  const token = usePersistStore((state) => state.auth.token);
  // const cookieStore = await cookies();
  // const token = cookieStore.get("refreshToken")?.value;

  if (!token) return redirect("/login");

  try {
    const decoded = jwt.decode(token) as DecodedToken;
    return decoded?.role || null;
  } catch {
    return null;
  }
}
