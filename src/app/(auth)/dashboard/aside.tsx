"use client";

import React from "react";
import SidebarComponent from "@/components/sidebar-component";

import { MdSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: MdSpaceDashboard },
  { title: "User List", url: "/dashboard/users", icon: FaUsers },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SidebarComponent menuItems={menuItems}>{children}</SidebarComponent>
    </>
  );
};

export default DashboardLayout;
