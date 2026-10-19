import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      {[
        ["overview", "Overview", "A summary of this week."],
        ["analytics", "Analytics", "Traffic and conversion trends."],
        ["reports", "Reports", "Exports and scheduled reports."],
      ].map(([value, title, description]) => (
        <TabsContent key={value} value={value}>
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="h-16 text-sm text-muted-foreground">Content for {value}.</CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  )
}
