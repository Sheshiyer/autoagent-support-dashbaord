"use client"

import { ReactNode } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

// Icons (we'll use a basic menu icon for now)
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const navigationItems = [
  { name: "Dashboard", href: "/" },
  { name: "Tickets", href: "/tickets" },
  { name: "Customers", href: "/customers" },
  { name: "Knowledge", href: "/knowledge" },
  { name: "Analytics", href: "/analytics" },
  { name: "Settings", href: "/settings" },
]

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="lg:hidden fixed left-4 top-4">
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <nav className="flex flex-col space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed left-0 top-0 bottom-0 w-64 bg-card border-r p-4">
        <div className="flex flex-col space-y-2">
          {navigationItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-sm hover:bg-accent rounded-md transition-colors"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>

      {/* Header */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 border-b bg-card px-4">
        <div className="flex items-center justify-between h-full">
          <h1 className="text-lg font-semibold">Tuya Support Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* We'll add search, notifications, and profile components here later */}
            <Button variant="outline" size="sm">
              Search
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
