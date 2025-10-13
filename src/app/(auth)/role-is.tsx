"use client";

import { usePersistStore } from "@/stores/use-persist";
import { useRoles } from "@/stores/use-roles";
import { UserRole } from "@/types/auth-types";
import jwt from "jsonwebtoken";
import React from "react";

const Roles = ({ children }: { children: React.ReactNode }) => {
  const token = usePersistStore((state) => state.auth.token);

  const setuserRole = useRoles((state) => state.setuserRole);
  const setEmail = useRoles((state) => state.setEmail);
  
  const user = jwt.decode(token as string) as { role: UserRole; email: string };
  
  setuserRole(user?.role);
  setEmail(user?.email);

  return <>{children}</>;
};

export default Roles;
