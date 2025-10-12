"use client";

import { useRoles } from "@/stores/use-roles";
import { UserRole } from "@/types/auth-types";
import React from "react";

const Roles = ({
  role,
  email,
  children,
}: {
  role: UserRole;
  email: string;
  children: React.ReactNode;
}) => {
  const setuserRole = useRoles((state) => state.setuserRole);
  const setEmail = useRoles((state) => state.setEmail);
  setuserRole(role);
  setEmail(email);

  return <>{children}</>;
};

export default Roles;
