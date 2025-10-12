import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const IsGuest = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies(); // 👈 await is required in Next.js 15+
  const token = cookieStore.get("refreshToken")?.value;
  if (token) redirect("/dashboard");
  return <>{children}</>;
};

export default IsGuest;
