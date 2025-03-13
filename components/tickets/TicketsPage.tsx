"use client"

import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Example data
const tickets = [
  {
    id: "T-1234",
    customer: "John Doe",
    issue: "Smart Lock Connection Issue",
    status: "In Progress",
    time: "2m ago",
    unread: true,
  },
  {
    id: "T-1233",
    customer: "Jane Smith",
    issue: "Device Pairing Failed",
    status: "Resolved",
    time: "1h ago",
    unread: false,
  },
  {
    id: "T-1232",
    customer: "Mike Johnson",
    issue: "Device not connecting",
    status: "Pending",
    time: "3h ago",
    unread: true,
  },
]

const messages = [
  {
    id: "1",
    type: "customer",
    name: "John Doe",
    message: "Hi, I'm having trouble with my smart lock. It's not connecting to the app.",
    time: "10:30 AM",
  },
  {
    id: "2",
    type: "system",
    name: "Device Details Agent",
    message: "Retrieved device information for Smart Lock A1 (ID: DEV001). Device is online but showing connection instability.",
    time: "10:31 AM",
  },
  {
    id: "3",
    type: "system",
    name: "Log Analysis Agent",
    message: "Analysis shows multiple failed connection attempts in the last hour. Battery level is at 15%.",
    time: "10:31 AM",
  },
  {
    id: "4",
    type: "system",
    name: "Reasoning Agent",
    message: "Based on the device logs and connection patterns, this appears to be a low battery issue causing connection instability.",
    time: "10:32 AM",
  },
  {
    id: "5",
    type: "system",
    name: "Knowledge Retrieval Agent",
    message: "Found relevant documentation: Smart Lock A1 requires battery replacement when levels drop below 20% to maintain stable connectivity.",
    time: "10:32 AM",
  },
  {
    id: "6",
    type: "system",
    name: "Response Generation Agent",
    message: "The connection issues are due to low battery (15%). Please replace the batteries with new alkaline batteries. This is recommended when levels drop below 20% to ensure stable connectivity. Would you like instructions on how to replace the batteries?",
    time: "10:33 AM",
  },
]

export function TicketsPage() {
  return (
    <div className="flex h-[calc(100vh-5rem)]">
      {/* Tickets List */}
      <div className="w-80 border-r">
        <div className="p-4">
          <Input placeholder="Search tickets..." className="mb-4" />
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="mb-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${ticket.customer}`} />
                      <AvatarFallback>
                        {ticket.customer.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{ticket.customer}</p>
                        <p className="text-xs text-muted-foreground">{ticket.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {ticket.issue}
                      </p>
                      <div className="flex items-center mt-1">
                        <Badge variant="outline" className="text-xs">
                          {ticket.status}
                        </Badge>
                      </div>
                    </div>
                    {ticket.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </div>
                </button>
                <Separator className="my-2" />
              </div>
            ))}
          </ScrollArea>
        </div>
      </div>

      {/* Resolution Process */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="https://avatar.vercel.sh/John%20Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-muted-foreground">Smart Lock Connection Issue</p>
              </div>
            </div>
            <Badge variant="outline">In Progress</Badge>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === "customer" ? "justify-start" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[70%]`}
                >
                  <Avatar className="mt-1">
                    <AvatarImage src={`https://avatar.vercel.sh/${message.name}`} />
                    <AvatarFallback>
                      {message.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium">{message.name}</span>
                      <span className="text-xs text-muted-foreground">{message.time}</span>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${
                        message.type === "customer"
                          ? "bg-muted"
                          : "bg-blue-50 dark:bg-blue-900"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
