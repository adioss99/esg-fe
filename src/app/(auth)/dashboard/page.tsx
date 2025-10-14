"use client";

import DashboardComponent, { CardDashboard } from "@/app/_components/dashboard";
import { useAdminDashboard } from "@/hooks/use-dashboard";
import React from "react";

const DashboardPage = () => {
  const {
    data: user,
    isLoading: userIsLoading,
    isError: userIsError,
  } = useAdminDashboard();
  return (
    <>
      <DashboardComponent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <CardDashboard
            title="Admin"
            descritpion=""
            queryKey={["user"]}
            isLoading={userIsLoading}
            isError={userIsError}>
            {user?.data?.admin}
          </CardDashboard>
          <CardDashboard
            title="Qc"
            descritpion=""
            queryKey={["user"]}
            isLoading={userIsLoading}
            isError={userIsError}>
            {user?.data?.qc}
          </CardDashboard>
          <CardDashboard
            title="Operator"
            descritpion=""
            queryKey={["user"]}
            isLoading={userIsLoading}
            isError={userIsError}>
            {user?.data?.operator}
          </CardDashboard>
        </div>
      </DashboardComponent>
    </>
  );
};

export default DashboardPage;
