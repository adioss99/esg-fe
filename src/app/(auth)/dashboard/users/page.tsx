"use client";

import React, { useState } from "react";
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
import { ArrowUpDown, Edit, PlusCircle } from "lucide-react";
import { useGetUsers } from "@/hooks/use-admin";
import { UserType } from "@/types/auth-types";
import { UserFormDialog } from "./user-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import TableComponent from "@/components/table";

export const columns: ColumnDef<UserType>[] = [
  {
    accessorKey: "name",
    header: () => <Label className="text-right">Name</Label>,
    cell: ({ row }) => (
      <Label className="capitalize">{row.getValue("name")}</Label>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: () => <Label>Role</Label>,
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  },
  {
    accessorKey: "id",
    header: () => <Label className="text-right">Action</Label>,
    cell: ({ row }) => (
      <UserFormDialog
        id={row.getValue("id")}
        name={row.getValue("name")}
        email={row.getValue("email")}
        role={row.getValue("role")}
        trigger={
          <Button variant="secondary">
            <Edit />
          </Button>
        }
      />
    ),
  },
];

const UsersPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");

  const { data, isLoading, isError, error } = useGetUsers();
  const usersData = Array.isArray(data?.data) ? data.data : [];

  const table = useReactTable({
    data: usersData,
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
      const email = row.getValue("email") as string;
      const name = row.getValue("name") as string;
      return (
        email.toLowerCase().includes(filterValue.toLowerCase()) ||
        name.toLowerCase().includes(filterValue.toLowerCase())
      );
    },
  });

  if (isLoading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error fetching users.</p>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search by email or name..."
          className="border px-2 py-1 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <UserFormDialog
          trigger={
            <Button>
              <PlusCircle /> Add User
            </Button>
          }
        />
      </div>
      <TableComponent table={table} isLoading={isLoading} isError={isError} />
    </div>
  );
};

export default UsersPage;
