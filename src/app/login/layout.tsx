import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserType } from "@/types/auth-types";
import jwt from "jsonwebtoken";
import { roleRedirect } from "@/lib/redirect";

const IsGuest = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("refreshToken")?.value;

  const user = jwt.decode(token as string) as UserType | null;

  if (token) {
    const route = roleRedirect(user?.role as string);
    redirect(route);
  }
  return <>{children}</>;
};

export default IsGuest;
