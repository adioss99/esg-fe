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
import {
  ArrowUpDown,
  Check,
  Edit,
  Eye,
  FileCheck2,
  FileDown,
  Trash,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/types/product-types";
import { Badge } from "@/components/ui/badge";
import TableComponent from "@/components/data-table";
import ProductDetailDialog from "@/app/_components/product-detail";
import { fetchPDF } from "@/api";
import { QcFormDialog } from "../(auth)/qc/dashboard/products/qc-form";
import { ProductFormDialog } from "../(auth)/operator/dashboard/products/product-form";
import DialogAlerComponent from "@/components/doalog-alert";
import toast from "react-hot-toast";
import { formattedDate } from "@/helpers/date";

const ProductTableComponent = ({ role }: { role?: string }) => {
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
      header: () => <Label>Code</Label>,
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
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === "asc")
            }>
            Quantity
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("quantity")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <Label className="text-right">Status</Label>,
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        let style = "bg-gray-200 outline-0";
        switch (status) {
          case "COMPLETED":
            style = "bg-green-200 text-green-600 border-0";
            break;
          case "CANCELLED":
            style = "bg-red-200 text-red-600 border-0";
            break;
        }
        return (
          <Badge variant={"outline"} className={`${style}`}>
            {status.toLowerCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "QC",
      header: () => <Label className="text-right">QC</Label>,
      cell: ({ row }) => {
        const passed = row.original.qcInspections;
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
            return <Badge variant={"outline"}>-</Badge>;
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
        const dateValue = row.getValue("createdAt") as Date;

        return <div>{formattedDate(dateValue)}</div>;
      },
    },
    {
      accessorKey: "action",
      header: () => <Label className="text-right">Action</Label>,
      cell: ({ row }) => {
        const pId = row.original.id as number;
        const referenceNo = row.getValue("referenceNo") as string;
        const status = row.getValue("status");
        const pass = row.original.qcInspections;
        const passed = pass[0]?.passed;
        const stat = status === "COMPLETED" || status === "CANCELLED";
        return (
          <div className="flex gap-2">
            <ProductDetailDialog
              trigerBtn={
                <Button size={"icon"} variant={"outline"}>
                  <Eye />
                </Button>
              }
              reffNo={referenceNo}
              actionBtn={
                role === "QC" && (
                  <Button
                    size={"icon"}
                    variant={"outline"}
                    disabled={status === "PENDING" || pass.length === 0}
                    onClick={() => handleGetQcReport(referenceNo)}>
                    <FileDown />
                  </Button>
                )
              }
            />
            {role === "QC" && (
              <QcFormDialog
                trigger={
                  <Button
                    size={"icon"}
                    disabled={passed || status === "PENDING" || stat}>
                    <FileCheck2 />
                  </Button>
                }
                prodId={pId}
              />
            )}
            {role === "OPERATOR" && (
              <>
                <ProductFormDialog
                  trigger={
                    <Button size={"icon"} variant={"outline"} disabled={stat}>
                      <Edit />
                    </Button>
                  }
                  referenceNo={referenceNo}
                />
                <DialogAlerComponent
                  trigerBtn={
                    <Button
                      size={"icon"}
                      variant={"destructive"}
                      disabled={stat}>
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
              </>
            )}
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

  const handleGetQcReport = async (orderId: string) => {
    try {
      const response = await fetchPDF(orderId);
      const link = document.createElement("a");
      link.href = response;
      link.setAttribute("download", orderId + "report.pdf"); // Desired filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(response);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

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
            placeholder="Search by reff code and model name..."
            className="border px-2 py-1 rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <TableComponent table={table} isLoading={isLoading} isError={isError} />
      </div>
    </>
  );
};

export default ProductTableComponent;
