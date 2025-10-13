"use client";

import React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
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
import SidebarMenus from "@/components/sidebar-menu";
import { useRoles } from "@/stores/use-roles";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SidebarComponent = ({
  children,
  menuItems,
}: Readonly<{
  children: React.ReactNode;
  menuItems: { title: string; url: string; icon: React.ComponentType }[];
}>) => {
  const email = useRoles((state) => state.email);
  const userRole = useRoles((state) => state.userRole);
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
        <SidebarMenus menuItems={menuItems} />
        <SidebarFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                className="w-full flex justify-center truncate border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                variant={"outline"}>
                <LogOut />
                <Label>Logout</Label>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Logout?</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to logout?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant={"destructive"} onClick={handleLogout}>
                  Continue
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </SidebarFooter>
      </Sidebar>
      <div className="h-screen w-screen overflow-y-auto overflow-hidden py-0 sm:py-3">
        <SidebarInset className="rounded-2xl min-h-full">
          <div className="flex justify-between pr-2">
            <SidebarTrigger className="px-7" />
            <div className="flex flex-col">
              <span className="leading-none text-xs">
                {userRole}
              </span>
              <span className="leading-none text-sm text-muted-foreground">
                {email}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default SidebarComponent;
