"use client";

import React from "react";
import { roleRedirect } from "@/lib/redirect";
import { usePersistStore } from "@/stores/use-persist";
import { decodeToken } from "@/lib/jwt";

const IsGuest = ({ children }: { children: React.ReactNode }) => {
  const token = usePersistStore((state) => state.auth.token);
  const user = decodeToken(token as string) as unknown as { role: string };

  if (token) {
    roleRedirect(user?.role as string);
  }
  return <>{children}</>;
};

export default IsGuest;
