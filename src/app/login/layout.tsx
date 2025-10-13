"use client";

import React from "react";
// import { cookies } from "next/headers";
import { UserType } from "@/types/auth-types";
import jwt from "jsonwebtoken";
import { roleRedirect } from "@/lib/redirect";
import { usePersistStore } from "@/stores/use-persist";

const IsGuest = ({ children }: { children: React.ReactNode }) => {
  // const cookieStore = await cookies();
  // const token = cookieStore.get("refreshToken")?.value;

  const token = usePersistStore((state) => state.auth.token);
  const user = jwt.decode(token as string) as UserType | null;

  if (token) {
    roleRedirect(user?.role as string);
  }
  return <>{children}</>;
};

export default IsGuest;
