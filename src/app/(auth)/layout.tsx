"use client";

import React from "react";
import { useAutoRefresh } from "@/hooks/use-autorefresh";

const IsAuth = ({ children }: { children: React.ReactNode }) => {
  useAutoRefresh();
  return <>{children}</>;
};

export default IsAuth;
