import Link from "next/link"
import { ArrowRight, Bolt, Brush, Folder, PieChart, Sparkle, User } from "apen-icons"

import { getComponents } from "@/lib/registry"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  StatCard,
  StatCardFooter,
  StatCardHeader,
  StatCardIcon,
  StatCardLabel,
  StatCardTrend,
  StatCardValue,
} from "@/components/ui/stat-card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CommandTabs } from "@/components/command-tabs"

const features = [
  {
    icon: Folder,
    title: "Copy, don't install",
    body: "Each component is a file in your repo. Change any class or behaviour without waiting on a release.",
  },
  {
    icon: Brush,
    title: "Rounded by design",
    body: "Pill buttons and inputs, rounded-3xl cards and tonal surfaces in the Apen orange-to-blue palette.",
  },
  {
    icon: PieChart,
    title: "Dashboard ready",
    body: "Sidebar, navbar, stat cards and tables are first-class blocks, not something you build yourself.",
  },
  {
    icon: Bolt,
    title: "Familiar API",
    body: "Same composition, data-slot attributes and token names as shadcn/ui. Radix underneath for accessibility.",
  },
]

const orders = [
  { customer: "Northwind", plan: "Enterprise", status: "Paid", amount: "$2,400" },
  { customer: "Globex", plan: "Growth", status: "Pending", amount: "$640" },
  { customer: "Initech", plan: "Starter", status: "Paid", amount: "$120" },
] as const

export default function HomePage() {
  const components = getComponents()

  return (
    <main className="px-4">
      <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 pt-20 pb-12 text-center sm:pt-28">
        <Badge variant="default" className="px-3 py-1">
          <Sparkle /> {components.length} components · Tailwind v4 · React 19
        </Badge>
        <h1 className="text-5xl leading-[1.05] font-bold tracking-tight text-balance sm:text-7xl">
          Rounded components for <span className="text-brand-gradient">beautiful dashboards</span>
        </h1>
        <p className="max-w-2xl text-lg text-balance text-muted-foreground">
          Apen UI gives you soft, accessible React components in the Apen style. Add them one at a time with a
          single command. The code is yours to change.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="brand" size="lg" asChild>
            <Link href="/docs/installation">
              Get started <ArrowRight />
            </Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/dashboard">View the dashboard</Link>
          </Button>
        </div>
        <CommandTabs args="add button card sidebar" className="w-full max-w-xl text-left" />
      </section>

      {/* A live preview built from the components themselves. */}
      <section className="mx-auto grid max-w-6xl gap-4 pb-24 lg:grid-cols-3">
        <StatCard>
          <StatCardHeader>
            <StatCardLabel>Monthly revenue</StatCardLabel>
            <StatCardIcon variant="brand">
              <PieChart />
            </StatCardIcon>
          </StatCardHeader>
          <StatCardValue>$48,290</StatCardValue>
          <StatCardFooter>
            <StatCardTrend trend="up">12.4%</StatCardTrend> vs last month
          </StatCardFooter>
        </StatCard>
        <StatCard>
          <StatCardHeader>
            <StatCardLabel>Active customers</StatCardLabel>
            <StatCardIcon variant="info">
              <User />
            </StatCardIcon>
          </StatCardHeader>
          <StatCardValue>2,184</StatCardValue>
          <StatCardFooter>
            <StatCardTrend trend="up">4.2%</StatCardTrend> vs last month
          </StatCardFooter>
        </StatCard>
        <Card className="gap-4">
          <CardHeader>
            <CardTitle>Storage</CardTitle>
            <CardDescription>68 of 100 GB used</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Progress value={68} />
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Auto-archive</span>
              <Switch defaultChecked aria-label="Auto-archive" />
            </div>
          </CardContent>
        </Card>
        <Card className="gap-4 lg:col-span-3">
          <CardHeader className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Recent orders</CardTitle>
            <Tabs defaultValue="all">
              <TabsList className="h-9">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="paid">Paid</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.customer}>
                    <TableCell className="font-semibold">{order.customer}</TableCell>
                    <TableCell className="text-muted-foreground">{order.plan}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Paid" ? "success" : "warning"}>{order.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{order.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-6xl pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-3 rounded-3xl bg-card p-6">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <feature.icon className="size-5" />
              </span>
              <h2 className="text-lg font-bold">{feature.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl pb-24">
        <div className="flex flex-col items-center gap-6 rounded-3xl bg-brand-gradient px-6 py-14 text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Every component, one command away</h2>
          <div className="flex max-w-3xl flex-wrap justify-center gap-2">
            {components.map((item) => (
              <Link
                key={item.name}
                href={`/docs/components/${item.name}`}
                className="rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/30"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
