"use client";

import React, { useState } from "react";
import { useGetProducts } from "@/hooks/use-product";
import {
  ColumnDef,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown,
  Check,
  FileCheck2,
  FileDown,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ProductType } from "@/types/product-types";
import { QcFormDialog } from "./qc-form";
import DialogAlerComponent from "@/components/doalog-alert";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { useGetQcReport } from "@/hooks/use-qc";

const ProductPage = () => {
  const { data, error: productError, isLoading } = useGetProducts();
  const {
    mutateAsync: getReport,
    isPending,
    error: reportError,
  } = useGetQcReport();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [reff, setReff] = useState("");

  const productsData = Array.isArray(data?.data) ? data.data : [];
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: "referenceNo",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Code
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      header: () => <Label>Quantity</Label>,
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
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
        const pId = row.original.id as number;
        const referenceNo = row.getValue("referenceNo") as string;
        return (
          <div className="flex gap-2">
            <QcFormDialog
              trigger={
                <Button variant={"outline"}>
                  <FileCheck2 />
                </Button>
              }
              prodId={pId}
            />

            <Button onClick={() => handleGetQcReport(referenceNo)}>
              <FileDown />
            </Button>
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
      globalFilter: reff,
    },
    globalFilterFn: (row, _, filterValue) => {
      const code = row.getValue("referenceNo") as string;
      return code.toLowerCase().includes(filterValue.toLowerCase());
    },
  });

  const handleGetQcReport = async (orderId: string) => {
    const res = await getReport(orderId);
    console.log(res);
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <Input
            type="text"
            placeholder="Search by reff code..."
            className="border px-2 py-1 rounded-md"
            value={reff}
            onChange={(e) => setReff(e.target.value)}
          />
        </div>

        <Table className="w-full border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="border-b p-2 text-left">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border-b p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {table.getRowModel().rows.length === 0 && !isLoading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
            {isLoading && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
            {productError && (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-red-500">
                  Something went wrong.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
