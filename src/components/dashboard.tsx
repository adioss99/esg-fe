"use client";

import React, { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { useGetDashboard } from "@/hooks/use-dashboard";
import { RefreshCcw } from "lucide-react";

interface StatCardProps {
  title: string;
  descritpion: string;
  queryKey: string[];
  isLoading: boolean;
  isError: boolean;
  children: ReactNode;
}

export function CardDashboard({
  title,
  descritpion,
  queryKey,
  isLoading,
  isError,
  children,
}: StatCardProps) {
  const queryClient = useQueryClient();
  return (
    <Card className="shadow-md py-5 gap-3">
      <CardHeader className="px-5">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{descritpion}</CardDescription>
      </CardHeader>
      <CardContent className="px-5">
        <div className="text-2xl font-semibold">
          {isLoading && <span className="text-gray-400">Loading...</span>}
          {isError && <span className="text-red-500">Error!</span>}
          {!isLoading && !isError && (
            <Label className="text-right text-2xl">{children}</Label>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 px-5">
        <Button
          onClick={() => queryClient.invalidateQueries({ queryKey })}
          className="text-sm hover:underline"
          variant={"outline"}>
          <RefreshCcw className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

const DashboardComponent = ({ children }: { children?: ReactNode }) => {
  const [productDashboard, qcDashboard] = useGetDashboard();

  const {
    data: product,
    isLoading: productIsLoading,
    isError: productIsError,
  } = productDashboard;
  const { data: qc, isLoading: qcIsLoading, isError: qcIsError } = qcDashboard;

  return (
    <div className="grid gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <CardDashboard
          title="Completed Orders"
          descritpion="Total this month"
          queryKey={["products"]}
          isLoading={productIsLoading}
          isError={productIsError}>
          {product?.data?.completed}
        </CardDashboard>
        <CardDashboard
          title="Pending Orders"
          descritpion="Total this month"
          queryKey={["products"]}
          isLoading={productIsLoading}
          isError={productIsError}>
          {product?.data?.pending}
        </CardDashboard>
        <CardDashboard
          title="Total Orders"
          descritpion="Total this month"
          queryKey={["products"]}
          isLoading={productIsLoading}
          isError={productIsError}>
          {product?.data?.cancelled}
        </CardDashboard>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-2">
        <CardDashboard
          title="Total Qc Passed"
          descritpion="Total this month"
          queryKey={["qc"]}
          isLoading={qcIsLoading}
          isError={qcIsError}>
          {qc?.data?.passedCount}
        </CardDashboard>
        <CardDashboard
          title="Total Qc Failed"
          descritpion="Total this month"
          queryKey={["qc"]}
          isLoading={qcIsLoading}
          isError={qcIsError}>
          {qc?.data?.failedCount}
        </CardDashboard>
      </div>
      {children}
    </div>
  );
};

export default DashboardComponent;
