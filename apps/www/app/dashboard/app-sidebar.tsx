"use client"

import Link from "next/link"
import { Folder, Home, Mail, PieChart, Settings, User } from "apen-icons"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "@/components/logo"

const workspace = [
  { label: "Overview", icon: Home, active: true },
  { label: "Analytics", icon: PieChart },
  { label: "Projects", icon: Folder, badge: "12" },
  { label: "Customers", icon: User },
  { label: "Inbox", icon: Mail, badge: "3" },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex h-10 items-center px-2 md:group-data-[collapsed=true]/sidebar:justify-center md:group-data-[collapsed=true]/sidebar:px-0 md:group-data-[collapsed=true]/sidebar:[&_span_span]:hidden">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            {workspace.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton isActive={item.active} tooltip={item.label}>
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
                {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-3 rounded-2xl bg-background p-4 md:group-data-[collapsed=true]/sidebar:hidden">
          <p className="text-sm font-semibold">Pro plan</p>
          <Progress value={72} />
          <p className="text-xs text-muted-foreground">7.2k of 10k API calls</p>
        </div>
        <div className="flex items-center gap-3 rounded-full p-1 md:group-data-[collapsed=true]/sidebar:justify-center">
          <Avatar className="size-9">
            <AvatarFallback className="bg-brand-gradient text-xs text-white">IA</AvatarFallback>
          </Avatar>
          <div className="min-w-0 text-sm md:group-data-[collapsed=true]/sidebar:hidden">
            <p className="truncate font-semibold">Ibrar Ali</p>
            <p className="truncate text-xs text-muted-foreground">Apen Apps</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
