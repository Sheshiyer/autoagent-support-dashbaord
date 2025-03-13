"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

// Example data
const customers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    devices: 3,
    status: "Active",
    lastActive: "2h ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    devices: 2,
    status: "Active",
    lastActive: "1d ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.j@example.com",
    devices: 1,
    status: "Inactive",
    lastActive: "1w ago",
  },
]

const customerDevices = [
  {
    id: "d1",
    name: "Smart Lock Pro X1000",
    type: "Lock",
    status: "Online",
    lastSync: "5m ago",
  },
  {
    id: "d2",
    name: "Security Camera V2",
    type: "Camera",
    status: "Offline",
    lastSync: "2h ago",
  },
  {
    id: "d3",
    name: "Smart Doorbell",
    type: "Doorbell",
    status: "Online",
    lastSync: "1m ago",
  },
]

const supportHistory = [
  {
    id: "t1",
    issue: "Device connectivity issue",
    status: "Resolved",
    date: "2024-03-10",
    agent: "Support Agent",
  },
  {
    id: "t2",
    issue: "Firmware update failed",
    status: "In Progress",
    date: "2024-03-12",
    agent: "Technical Support",
  },
]

export function CustomersPage() {
  const [selectedCustomer, setSelectedCustomer] = useState(customers[0])

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-4 p-4">
      {/* Customers Table */}
      <div className="w-2/3">
        <Card>
          <CardHeader>
            <CardTitle>Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Devices</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    key={customer.id}
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`https://avatar.vercel.sh/${customer.name}`} />
                          <AvatarFallback>
                            {customer.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {customer.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.devices}</TableCell>
                    <TableCell>
                      <Badge variant={customer.status === "Active" ? "default" : "secondary"}>
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{customer.lastActive}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details */}
      <div className="w-1/3">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={`https://avatar.vercel.sh/${selectedCustomer.name}`} />
                <AvatarFallback>
                  {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{selectedCustomer.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{selectedCustomer.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="devices" className="h-[calc(100vh-15rem)]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="history">Support History</TabsTrigger>
              </TabsList>
              <TabsContent value="devices" className="mt-4">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-4">
                    {customerDevices.map((device) => (
                      <Card key={device.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{device.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {device.type}
                              </p>
                            </div>
                            <Badge
                              variant={device.status === "Online" ? "default" : "secondary"}
                            >
                              {device.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Last synced: {device.lastSync}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-4">
                    {supportHistory.map((ticket) => (
                      <Card key={ticket.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{ticket.issue}</h3>
                              <p className="text-sm text-muted-foreground">
                                {ticket.agent} • {ticket.date}
                              </p>
                            </div>
                            <Badge
                              variant={ticket.status === "Resolved" ? "default" : "secondary"}
                            >
                              {ticket.status}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
