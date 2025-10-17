import { IsAuth } from "@/middlewares/is-auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardLayout from "./aside";

const IsProtected = async ({ children }: { children: React.ReactNode }) => {
  const auth = (await IsAuth()) as string;
  if (auth !== "OPERATOR") redirect("/unauthorized");
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default IsProtected;
