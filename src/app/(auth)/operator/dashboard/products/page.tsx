"use client";

import React, { useState } from "react";
import { useDeleteProduct, useGetProducts } from "@/hooks/use-product";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Check, Edit, PlusCircle, Trash, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/types/product-types";
import { ProductFormDialog } from "./product-form";
import DialogAlerComponent from "@/components/doalog-alert";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import TableComponent from "@/components/table";

const ProductPage = () => {
  const { data, isError, isLoading, error } = useGetProducts();
  const {
    mutateAsync: deleteProduct,
    isPending,
    error: delError,
  } = useDeleteProduct();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");

  const productsData = Array.isArray(data?.data) ? data.data : [];
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "referenceNo",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Code
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("referenceNo")}</div>
      ),
    },
    {
      accessorKey: "modelName",
      header: () => <Label className="text-right">Model</Label>,
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("modelName")}</div>
      ),
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Quantity
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    },
    {
      accessorKey: "status",
      header: () => <Label className="text-right">Status</Label>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        switch (status) {
          case "COMPLETED":
            return (
              <Badge className="bg-green-600">
                <Check />
                {status.toLowerCase()}
              </Badge>
            );
          case "CANCELLED":
            return (
              <Badge variant={"destructive"} className="-red-500">
                <X />
                {status.toLowerCase()}
              </Badge>
            );
          default:
            return (
              <Badge variant={"outline"} className="-gray-500">
                {status.toLowerCase()}
              </Badge>
            );
        }
      },
    },
    {
      accessorKey: "QC",
      header: () => <Label className="text-right">QC</Label>,
      cell: ({ row }) => {
        const passed = row.original.qcInspections;
        console.log(passed[0]?.passed, "passed");
        switch (passed[0]?.passed) {
          case true:
            return (
              <Badge className="bg-green-600">
                <Check />
              </Badge>
            );
          case false:
            return (
              <Badge variant={"destructive"}>
                <X />
              </Badge>
            );
          default:
            return <Badge variant={"outline"}>.</Badge>;
        }
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const dateValue = row.getValue("createdAt");

        let formattedDate = "N/A";
        if (typeof dateValue === "string" || typeof dateValue === "number") {
          const dateObj = new Date(dateValue);
          if (!isNaN(dateObj.getTime())) {
            formattedDate = dateObj.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          }
        }
        return <div>{formattedDate}</div>;
      },
    },
    {
      accessorKey: "action",
      header: () => <Label className="text-right">Action</Label>,
      cell: ({ row }) => {
        const referenceNo = row.getValue("referenceNo") as string;
        const stat =
          row.getValue("status") === "COMPLETED" ||
          row.getValue("status") === "CANCELLED";
        return (
          <div className="flex gap-2">
            <ProductFormDialog
              trigger={
                <Button variant={"outline"} disabled={stat}>
                  <Edit />
                </Button>
              }
              referenceNo={referenceNo}
            />
            <DialogAlerComponent
              trigerBtn={
                <Button variant={"destructive"} disabled={stat}>
                  <Trash />
                </Button>
              }
              title="Delete Product"
              desciption="Are you sure you want to delete this product?"
              confirmBtn={
                <Button
                  variant={"destructive"}
                  onClick={() => handleDelete(referenceNo)}>
                  Delete
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data: productsData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filter,
    },
    globalFilterFn: (row, _, filterValue) => {
      const code = row.getValue("referenceNo") as string;
      const modelName = row.getValue("modelName") as string;
      return (
        code.toLowerCase().includes(filterValue.toLowerCase()) ||
        modelName.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  });

  const handleDelete = async (referenceNo: string) => {
    const res = await deleteProduct(referenceNo);
    if (isPending) {
      toast.loading("Deleting...");
    }
    if (delError) {
      toast.error("Something went wrong.");
      throw delError;
    }
    if (res.success) {
      return toast.success("Product deleted successfully.");
    }
    return toast.error(res.message);
  };
  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error fetching users.</p>;
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Search by reff code..."
            className="border px-2 py-1 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ProductFormDialog
            trigger={
              <Button>
                <PlusCircle /> Add Product
              </Button>
            }
          />
        </div>
        <TableComponent table={table} isLoading={isLoading} isError={isError} />
      </div>
    </>
  );
};

export default ProductPage;
