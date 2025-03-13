"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Example data
const metrics = [
  { title: "Active Tickets", value: "156", change: "+12%" },
  { title: "Resolution Rate", value: "89%", change: "+4%" },
  { title: "Avg Response Time", value: "2.5h", change: "-8%" },
  { title: "Customer Satisfaction", value: "4.8/5", change: "+2%" },
]

const recentTickets = [
  {
    id: "T-1234",
    customer: "John Doe",
    issue: "Smart Lock Connection Issue",
    status: "Open",
    time: "10m ago",
  },
  {
    id: "T-1233",
    customer: "Jane Smith",
    issue: "Device Pairing Failed",
    status: "In Progress",
    time: "25m ago",
  },
  {
    id: "T-1232",
    customer: "Mike Johnson",
    issue: "App Configuration Error",
    status: "Pending",
    time: "1h ago",
  },
]

export function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <span className={metric.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                {metric.change}
              </span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AutoAgent Performance */}
      <Card>
        <CardHeader>
          <CardTitle>AutoAgent Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Retrieval Accuracy</span>
                <span className="text-sm font-medium">92%</span>
              </div>
              <Progress value={92} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Response Quality</span>
                <span className="text-sm font-medium">88%</span>
              </div>
              <Progress value={88} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Resolution Rate</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <Progress value={85} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`https://avatar.vercel.sh/${ticket.customer}`} />
                    <AvatarFallback>{ticket.customer.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{ticket.customer}</div>
                    <div className="text-sm text-muted-foreground">{ticket.issue}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted-foreground">{ticket.time}</span>
                  <span className="text-sm font-medium">{ticket.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
