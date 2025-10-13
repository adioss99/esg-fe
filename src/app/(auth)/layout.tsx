"use client";

import React from "react";
import Roles from "./role-is";
import { useAutoRefresh } from "@/hooks/use-autorefresh";

const IsAuth = ({ children }: { children: React.ReactNode }) => {
  useAutoRefresh();
  return <Roles>{children}</Roles>;
};

export default IsAuth;
