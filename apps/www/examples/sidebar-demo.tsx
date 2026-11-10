import { Folder, Home, PieChart, Settings, User } from "apen-icons"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const items = [
  { label: "Home", icon: Home, active: true },
  { label: "Analytics", icon: PieChart },
  { label: "Projects", icon: Folder, badge: "4" },
  { label: "Customers", icon: User },
  { label: "Settings", icon: Settings },
]

export default function SidebarDemo() {
  return (
    <SidebarProvider className="min-h-[30rem]">
      <Sidebar className="md:h-[28.5rem]">
        <SidebarHeader>
          <div className="flex h-10 items-center px-3 font-heading text-lg font-bold md:group-data-[collapsed=true]/sidebar:justify-center md:group-data-[collapsed=true]/sidebar:px-0" aria-label="Acme workspace">
            <span className="md:group-data-[collapsed=true]/sidebar:hidden">Acme</span>
            <span aria-hidden="true" className="hidden size-9 items-center justify-center rounded-xl bg-primary/10 text-primary md:group-data-[collapsed=true]/sidebar:inline-flex">A</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {items.map((item) => (
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
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="min-h-0 p-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <span className="text-sm text-muted-foreground">Press ⌘B to collapse</span>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
