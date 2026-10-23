import { ArrowRight, CircleCheck, PieChart, Plus, User } from "apen-icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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

const members = [
  { name: "Sara Khan", initials: "SK", role: "Owner", status: "Active" },
  { name: "Mark Reed", initials: "MR", role: "Editor", status: "Invited" },
  { name: "Jade Tan", initials: "JT", role: "Viewer", status: "Active" },
] as const

/** A sample of components that reacts to the customizer through CSS variables. */
export function ThemePreview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <StatCard>
        <StatCardHeader>
          <StatCardLabel>Revenue</StatCardLabel>
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
          <StatCardLabel>Customers</StatCardLabel>
          <StatCardIcon>
            <User />
          </StatCardIcon>
        </StatCardHeader>
        <StatCardValue>2,184</StatCardValue>
        <StatCardFooter>
          <StatCardTrend trend="down">3.1%</StatCardTrend> vs last month
        </StatCardFooter>
      </StatCard>

      <Card className="gap-4 md:col-span-2 xl:col-span-1">
        <CardHeader>
          <CardTitle>Storage</CardTitle>
          <CardDescription>68 of 100 GB used</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Progress value={68} />
          <div className="flex items-center justify-between text-sm">
            <Label htmlFor="preview-archive" className="font-medium">
              Auto-archive
            </Label>
            <Switch id="preview-archive" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy a new workspace in one click.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="preview-name">Name</Label>
            <Input id="preview-name" placeholder="apen-dashboard" />
          </div>
          <div className="flex items-center gap-3">
            <Checkbox id="preview-template" defaultChecked />
            <Label htmlFor="preview-template" className="font-medium">
              Start from a template
            </Label>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button variant="ghost">Cancel</Button>
          <Button>Create</Button>
        </CardFooter>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle>Team</CardTitle>
          <Tabs defaultValue="all">
            <TabsList className="h-9">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.name}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-[11px]">{member.initials}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.role}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === "Active" ? "success" : "warning"}>{member.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="gap-4 md:col-span-2 xl:col-span-3">
        <CardHeader>
          <CardTitle>Buttons and badges</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            <Button>
              <Plus /> Primary
            </Button>
            <Button variant="brand">
              Brand <ArrowRight />
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Delete</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="brand">Brand</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="success">Paid</Badge>
            <Badge variant="warning">Pending</Badge>
            <Badge variant="destructive">Failed</Badge>
          </div>
          <Alert variant="success">
            <CircleCheck />
            <AlertTitle>Theme looks good</AlertTitle>
            <AlertDescription>Every component on this page updates as you change the settings.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
