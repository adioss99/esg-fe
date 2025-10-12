"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Label } from "@/components/ui/label";
import { redirect, usePathname } from "next/navigation";
import { FaUsers } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/use-auth";
import toast from "react-hot-toast";

const SideBar = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { mutateAsync: logout } = useLogout();

  const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: MdSpaceDashboard },
    { title: "User List", url: "/dashboard/users", icon: FaUsers },
  ];
  const pathname = usePathname();
  const isActive = (url: string, exact = false) => {
    return exact ? pathname === url : pathname.startsWith(url);
  };

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
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      variant="default"
                      className={
                        " font-medium " +
                        (isActive(item.url, item.url === "/dashboard")
                          ? "bg-black text-white hover:bg-black hover:text-white"
                          : "hover:bg-gray-200")
                      }
                      asChild>
                      <Link className="flex items-center gap-2" href={item.url}>
                        {item.icon && <item.icon />}
                        <Label>{item.title}</Label>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
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
