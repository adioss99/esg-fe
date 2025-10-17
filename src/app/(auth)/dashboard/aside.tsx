"use client";

import React from "react";
import SidebarComponent from "@/app/_components/sidebar-component";

import { MdSpaceDashboard } from "react-icons/md";
import { FaBoxOpen, FaUsers } from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: MdSpaceDashboard,
    exact: true,
  },
  { title: "User List", url: "/dashboard/users", icon: FaUsers },
  { title: "Product List", url: "/dashboard/products", icon: FaBoxOpen },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarComponent menuItems={menuItems}>{children}</SidebarComponent>
    </>
  );
};

export default DashboardLayout;
