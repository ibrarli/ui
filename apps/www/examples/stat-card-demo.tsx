import { PieChart, User } from "apen-icons"

import {
  StatCard,
  StatCardFooter,
  StatCardHeader,
  StatCardIcon,
  StatCardLabel,
  StatCardTrend,
  StatCardValue,
} from "@/components/ui/stat-card"

export default function StatCardDemo() {
  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <StatCard>
        <StatCardHeader>
          <StatCardLabel>Revenue</StatCardLabel>
          <StatCardIcon variant="brand">
            <PieChart />
          </StatCardIcon>
        </StatCardHeader>
        <StatCardValue>$48,290</StatCardValue>
        <StatCardFooter>
          <StatCardTrend trend="up">12.4%</StatCardTrend>
          vs last month
        </StatCardFooter>
      </StatCard>
      <StatCard>
        <StatCardHeader>
          <StatCardLabel>Active users</StatCardLabel>
          <StatCardIcon variant="info">
            <User />
          </StatCardIcon>
        </StatCardHeader>
        <StatCardValue>2,184</StatCardValue>
        <StatCardFooter>
          <StatCardTrend trend="down">3.1%</StatCardTrend>
          vs last month
        </StatCardFooter>
      </StatCard>
    </div>
  )
}
