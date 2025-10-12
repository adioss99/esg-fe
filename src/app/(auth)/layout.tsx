/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { UserRole, UserType } from "@/types/auth-types";
import Roles from "./role-is";

const IsAuth = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  if (!token) redirect("/login");

  const user = jwt.decode(token as string) as UserType | null;

  return <Roles role={user?.role as UserRole}>{children}</Roles>;
};

export default IsAuth;
