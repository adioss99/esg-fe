import React from "react";
import { roleRedirect } from "@/lib/redirect";
import { cookies } from "next/headers";
import { decodeToken } from "@/lib/jwt";
import { UserRole } from "@/types/auth-types";

type DecodedToken = {
  id: string;
  role: UserRole;
  exp: number;
};
const IsGuest = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;
  const decoded = decodeToken(token as string) as unknown as DecodedToken;
  if (token) {
    roleRedirect(decoded?.role as string);
  }
  return <>{children}</>;
};

export default IsGuest;
