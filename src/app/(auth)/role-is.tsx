"use client";

import { useRoles } from "@/stores/use-roles";
import { UserRole } from "@/types/auth-types";
import React from "react";

const Roles = ({
  role,
  children,
}: {
  role: UserRole;
  children: React.ReactNode;
}) => {
  const setuserRole = useRoles((state) => state.setuserRole);
  setuserRole(role);

  return <>{children}</>;
};

export default Roles;
