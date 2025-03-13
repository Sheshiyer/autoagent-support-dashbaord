"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Example data
const conversations = [
  {
    id: "1",
    customer: "John Doe",
    lastMessage: "Having issues with the smart lock",
    time: "2m ago",
    unread: true,
  },
  {
    id: "2",
    customer: "Jane Smith",
    lastMessage: "Thank you for your help!",
    time: "1h ago",
    unread: false,
  },
  {
    id: "3",
    customer: "Mike Johnson",
    lastMessage: "The device is not connecting",
    time: "3h ago",
    unread: true,
  },
]

const messages = [
  {
    id: "1",
    sender: "customer",
    name: "John Doe",
    message: "Hi, I'm having trouble with my smart lock. It's not connecting to the app.",
    time: "10:30 AM",
  },
  {
    id: "2",
    sender: "agent",
    name: "Support Agent",
    message: "I understand you're having connectivity issues. Let me help you with that. Could you tell me which model of smart lock you're using?",
    time: "10:31 AM",
  },
  {
    id: "3",
    sender: "autoagent",
    name: "AutoAgent",
    message: "Based on the customer's device history, they are using the TuyaLock Pro X1000. Common connectivity issues with this model are often related to Bluetooth pairing or firmware updates.",
    time: "10:31 AM",
  },
]

export function ConversationsPage() {
  return (
    <div className="flex h-[calc(100vh-5rem)]">
      {/* Conversations List */}
      <div className="w-80 border-r">
        <div className="p-4">
          <Input placeholder="Search conversations..." className="mb-4" />
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="mb-2">
                <button className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={`https://avatar.vercel.sh/${conversation.customer}`} />
                      <AvatarFallback>
                        {conversation.customer.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium truncate">{conversation.customer}</p>
                        <p className="text-xs text-muted-foreground">{conversation.time}</p>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                    {conversation.unread && (
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

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://avatar.vercel.sh/John%20Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">John Doe</h2>
              <p className="text-sm text-muted-foreground">Online</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "agent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[70%] ${
                    message.sender === "agent" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
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
                        message.sender === "agent"
                          ? "bg-primary text-primary-foreground"
                          : message.sender === "autoagent"
                          ? "bg-blue-100 dark:bg-blue-900"
                          : "bg-muted"
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

        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input placeholder="Type your message..." className="flex-1" />
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
