import { isAuth } from "@/middlewares/is-auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardLayout from "./aside";

const IsProtected = async ({ children }: { children: React.ReactNode }) => {
  const auth = await isAuth();
  if (auth !== "QC") redirect("/unauthorized");
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default IsProtected;
