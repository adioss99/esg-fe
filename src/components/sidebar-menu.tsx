import { Label } from "@/components/ui/label";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarMenus = ({
  menuItems,
}: {
  menuItems: { title: string; url: string; icon: React.ComponentType }[];
}) => {
  const pathname = usePathname();
  const isActive = (url: string, exact = false) => {
    return exact ? pathname === url : pathname.startsWith(url);
  };

  return (
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
  );
};

export default SidebarMenus;
