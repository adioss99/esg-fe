"use client";
import { IsAuth } from "@/middlewares/is-auth";
import { redirect } from "next/navigation";
import React from "react";
import DashboardLayout from "./aside";

const IsProtected = ({ children }: { children: React.ReactNode }) => {
  const auth = IsAuth();
  if (auth !== "ADMIN") redirect("/unauthorized");
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default IsProtected;
