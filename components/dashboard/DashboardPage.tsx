"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { CheckCircle2, Circle, CircleDot } from "lucide-react"

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

const processingStages = [
  { id: 1, name: "Input Validation", status: "completed" },
  { id: 2, name: "Device Details", status: "in-progress" },
  { id: 3, name: "Log Analysis", status: "pending" },
  { id: 4, name: "Reasoning", status: "pending" },
  { id: 5, name: "Knowledge Retrieval", status: "pending" },
  { id: 6, name: "Response Generation", status: "pending" },
] as const

export function DashboardPage() {
  const [email, setEmail] = useState("")
  const [issue, setIssue] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Handle form submission
    console.log({ email, issue })
    // Simulated processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setEmail("")
    setIssue("")
    setIsProcessing(false)
  }

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <CircleDot className="h-4 w-4 text-blue-500 animate-pulse" />
      default:
        return <Circle className="h-4 w-4 text-gray-300" />
    }
  }

  return (
    <div className="space-y-6">
      {/* New Ticket Form */}
      <Card>
        <CardHeader>
          <CardTitle>Create Support Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Processing Status</h3>
              {isProcessing && (
                <Badge variant="outline" className="bg-blue-50">
                  Processing
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {processingStages.map((stage) => (
                <div
                  key={stage.id}
                  className="flex flex-col items-center text-center space-y-2"
                >
                  {getStageIcon(stage.status)}
                  <span className="text-xs text-muted-foreground">
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Customer Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="customer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="issue" className="text-sm font-medium">
                Issue Description
              </label>
              <Textarea
                id="issue"
                placeholder="Describe the issue..."
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Create Ticket"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

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
