"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const timeRanges = {
  today: {
    tickets: { total: 156, resolved: 134 },
    responseTime: "2.5h",
    satisfaction: 4.8,
    autoAgentUsage: 92,
  },
  week: {
    tickets: { total: 1023, resolved: 987 },
    responseTime: "2.8h",
    satisfaction: 4.7,
    autoAgentUsage: 88,
  },
  month: {
    tickets: { total: 4234, resolved: 4012 },
    responseTime: "3.1h",
    satisfaction: 4.6,
    autoAgentUsage: 90,
  },
}

const agentPerformance = [
  {
    name: "John Smith",
    metrics: {
      resolved: 45,
      responseTime: "1.8h",
      satisfaction: 4.9,
      accuracy: 96,
    },
  },
  {
    name: "Sarah Johnson",
    metrics: {
      resolved: 38,
      responseTime: "2.1h",
      satisfaction: 4.7,
      accuracy: 94,
    },
  },
  {
    name: "Mike Brown",
    metrics: {
      resolved: 42,
      responseTime: "1.9h",
      satisfaction: 4.8,
      accuracy: 95,
    },
  },
]

const autoAgentStats = {
  accurateResponses: 92,
  helpfulSuggestions: 88,
  timesSaved: 245,
  knowledgeGaps: 12,
}

function MetricsCard({ title, value, description, trend }: {
  title: string
  value: string | number
  description?: string
  trend?: { value: string; positive: boolean }
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {trend && (
          <Badge variant={trend.positive ? "default" : "destructive"}>
            {trend.value}
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Monitor support performance and trends
          </p>
        </div>
      </div>

      <Tabs defaultValue="today" className="space-y-6">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month">This Month</TabsTrigger>
        </TabsList>

        {Object.entries(timeRanges).map(([period, data]) => (
          <TabsContent key={period} value={period} className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricsCard
                title="Total Tickets"
                value={data.tickets.total}
                trend={{ value: "+12%", positive: false }}
              />
              <MetricsCard
                title="Resolved Tickets"
                value={data.tickets.resolved}
                trend={{ value: "+8%", positive: true }}
              />
              <MetricsCard
                title="Avg Response Time"
                value={data.responseTime}
                trend={{ value: "-5%", positive: true }}
              />
              <MetricsCard
                title="Customer Satisfaction"
                value={`${data.satisfaction}/5.0`}
                trend={{ value: "+2%", positive: true }}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Agent Performance */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>
              Individual agent metrics and rankings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {agentPerformance.map((agent) => (
                <Card key={agent.name}>
                  <CardHeader>
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span>{agent.metrics.accuracy}%</span>
                      </div>
                      <Progress value={agent.metrics.accuracy} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Satisfaction</span>
                        <span>{agent.metrics.satisfaction}/5.0</span>
                      </div>
                      <Progress value={agent.metrics.satisfaction * 20} />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div>
                        <p className="text-sm font-medium">
                          {agent.metrics.resolved}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Tickets Resolved
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {agent.metrics.responseTime}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Avg Response
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AutoAgent Performance */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>AutoAgent Performance</CardTitle>
              <CardDescription>
                AI assistance metrics and effectiveness
              </CardDescription>
            </div>
            <Badge variant="secondary">AI Powered</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Response Accuracy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">
                  {autoAgentStats.accurateResponses}%
                </div>
                <Progress value={autoAgentStats.accurateResponses} />
                <p className="text-xs text-muted-foreground">
                  Responses marked as accurate by agents
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Suggestion Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">
                  {autoAgentStats.helpfulSuggestions}%
                </div>
                <Progress value={autoAgentStats.helpfulSuggestions} />
                <p className="text-xs text-muted-foreground">
                  Suggestions used by support agents
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Time Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {autoAgentStats.timesSaved}h
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Estimated time saved this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Knowledge Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {autoAgentStats.knowledgeGaps}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Identified gaps in knowledge base
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
