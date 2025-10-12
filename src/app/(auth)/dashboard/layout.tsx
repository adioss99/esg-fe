"use client";
import React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/use-auth";
import toast from "react-hot-toast";
import SidebarMenus from "../../../components/sidebar-menu";

const SideBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    await logout();
    toast.success("Logout success.");
    redirect("/");
  };

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="floating">
        <SidebarHeader>
          <Link
            className="flex flex-row justify-center w-full mb-2 mt-4"
            href="/">
            <Logo />
          </Link>
        </SidebarHeader>
        <SidebarMenus />
        <SidebarFooter>
          <SidebarMenuButton
            className="w-full flex justify-center truncate border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            variant={"outline"}
            onClick={handleLogout}>
            <Label>Logout</Label>
            <LogOut />
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <div className="h-screen w-screen overflow-y-auto overflow-hidden py-0 sm:py-3">
        <SidebarInset className="rounded-2xl min-h-full">
          <SidebarTrigger className="px-7" />
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SideBar;
