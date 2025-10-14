"use client";

import React from "react";
import SidebarComponent from "@/components/sidebar-component";

import { MdSpaceDashboard } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";

const menuItems = [
  {
    title: "Dashboard",
    url: "/operator/dashboard",
    icon: MdSpaceDashboard,
    exact: true,
  },
  {
    title: "Product List",
    url: "/operator/dashboard/products",
    icon: FaBoxOpen,
  },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarComponent menuItems={menuItems}>{children}</SidebarComponent>
    </>
  );
};

export default DashboardLayout;
