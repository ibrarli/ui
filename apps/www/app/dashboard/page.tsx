import { ArrowRight, Calendar, Folder, PieChart, Plus, Settings, Trash, User } from "apen-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {
  StatCard,
  StatCardFooter,
  StatCardHeader,
  StatCardIcon,
  StatCardLabel,
  StatCardTrend,
  StatCardValue,
} from "@/components/ui/stat-card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { AppSidebar } from "./app-sidebar"

const stats = [
  { label: "Revenue", value: "$48,290", change: "12.4%", trend: "up", icon: PieChart, variant: "brand" },
  { label: "Customers", value: "2,184", change: "4.2%", trend: "up", icon: User, variant: "info" },
  { label: "Projects", value: "64", change: "0%", trend: "neutral", icon: Folder, variant: "default" },
  { label: "Churn", value: "1.8%", change: "0.3%", trend: "down", icon: Calendar, variant: "muted" },
] as const

const revenue = [42, 58, 49, 66, 72, 61, 80, 74, 88, 92, 84, 100]
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]

const orders = [
  { id: "#3042", customer: "Northwind", initials: "NW", plan: "Enterprise", status: "Paid", amount: "$2,400.00" },
  { id: "#3041", customer: "Globex", initials: "GX", plan: "Growth", status: "Pending", amount: "$640.00" },
  { id: "#3040", customer: "Initech", initials: "IN", plan: "Starter", status: "Paid", amount: "$120.00" },
  { id: "#3039", customer: "Umbrella", initials: "UM", plan: "Growth", status: "Failed", amount: "$640.00" },
  { id: "#3038", customer: "Hooli", initials: "HO", plan: "Enterprise", status: "Paid", amount: "$2,400.00" },
] as const

const statusVariant = { Paid: "success", Pending: "warning", Failed: "destructive" } as const

const tasks = [
  { id: "t1", label: "Review Q3 invoices", done: true },
  { id: "t2", label: "Onboard Hooli workspace", done: false },
  { id: "t3", label: "Ship sidebar redesign", done: false },
]

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-30 flex items-center gap-3 bg-background/80 px-4 py-3 backdrop-blur-xl md:px-6 md:pt-6">
          <SidebarTrigger />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold tracking-tight md:text-2xl">Good morning, Ibrar</h1>
            <p className="hidden text-sm text-muted-foreground sm:block">Here is what is happening across your workspace.</p>
          </div>
          <Input placeholder="Search..." className="hidden w-56 lg:flex" />
          <ThemeToggle />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="brand" className="hidden sm:inline-flex">
                <Plus /> New project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a project</DialogTitle>
                <DialogDescription>Projects group your customers, invoices and reports.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Name</Label>
                  <Input id="project-name" placeholder="Q4 launch" />
                </div>
                <div className="grid gap-2">
                  <Label>Plan</Label>
                  <Select defaultValue="growth">
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button>Create project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </header>

        <div className="flex flex-col gap-4 p-4 md:gap-6 md:p-6">
          <Alert variant="info">
            <PieChart />
            <AlertTitle>Your October report is ready</AlertTitle>
            <AlertDescription>Revenue grew 12.4% month over month. Download the full breakdown from Reports.</AlertDescription>
          </Alert>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard key={stat.label}>
                <StatCardHeader>
                  <StatCardLabel>{stat.label}</StatCardLabel>
                  <StatCardIcon variant={stat.variant}>
                    <stat.icon />
                  </StatCardIcon>
                </StatCardHeader>
                <StatCardValue>{stat.value}</StatCardValue>
                <StatCardFooter>
                  <StatCardTrend trend={stat.trend}>{stat.change}</StatCardTrend>
                  vs last month
                </StatCardFooter>
              </StatCard>
            ))}
          </div>

          <div className="grid gap-4 md:gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Monthly recurring revenue this year</CardDescription>
                <CardAction>
                  <Select defaultValue="2026">
                    <SelectTrigger size="sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2026">2026</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectContent>
                  </Select>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex h-56 items-end gap-2 sm:gap-3" role="img" aria-label="Revenue grew from 42k in January to 100k in December">
                  {revenue.map((value, index) => (
                    <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <div
                        className="w-full rounded-full bg-brand-gradient opacity-90 transition-opacity hover:opacity-100"
                        style={{ height: `${value}%` }}
                      />
                      <span className="text-[11px] font-medium text-muted-foreground">{months[index]}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>This week</CardTitle>
                <CardDescription>Tasks for the team</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-3">
                    <Checkbox id={task.id} defaultChecked={task.done} />
                    <Label htmlFor={task.id} className="font-medium">
                      {task.label}
                    </Label>
                  </div>
                ))}
                <div className="mt-2 flex items-center justify-between rounded-2xl bg-background p-4">
                  <div className="flex -space-x-2">
                    {["SK", "MR", "JT", "IA"].map((initials) => (
                      <Avatar key={initials} className="size-8 ring-4 ring-background">
                        <AvatarFallback className="text-[11px]">{initials}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm">
                    Team <ArrowRight />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <Tabs defaultValue="orders" className="gap-6">
              <CardHeader>
                <CardTitle>Recent activity</CardTitle>
                <CardDescription>Latest orders across every plan</CardDescription>
                <CardAction>
                  <TabsList className="h-9">
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="refunds">Refunds</TabsTrigger>
                  </TabsList>
                </CardAction>
              </CardHeader>
              <CardContent>
                <TabsContent value="orders">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead className="w-12" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-mono text-xs text-muted-foreground">{order.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="size-8">
                                <AvatarFallback className="text-[11px]">{order.initials}</AvatarFallback>
                              </Avatar>
                              <span className="font-semibold">{order.customer}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{order.plan}</TableCell>
                          <TableCell>
                            <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right tabular-nums">{order.amount}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon-sm" aria-label={`Actions for ${order.id}`}>
                                  <Settings />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View order</DropdownMenuItem>
                                <DropdownMenuItem>Send receipt</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem variant="destructive">
                                  <Trash /> Refund
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="refunds">
                  <div className="flex h-40 flex-col items-center justify-center gap-2 rounded-3xl bg-background text-center">
                    <p className="font-heading font-bold">No refunds this month</p>
                    <p className="text-sm text-muted-foreground">Refunded orders will show up here.</p>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
