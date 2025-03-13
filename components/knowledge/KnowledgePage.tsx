"use client"

import { useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Example data
const categories = [
  { id: "all", name: "All Documents" },
  { id: "product", name: "Product Documentation" },
  { id: "troubleshooting", name: "Troubleshooting Guides" },
  { id: "faq", name: "FAQs" },
  { id: "api", name: "API Documentation" },
]

const documents = [
  {
    id: "1",
    title: "Smart Lock Installation Guide",
    category: "product",
    summary: "Step-by-step guide for installing and configuring Tuya smart locks.",
    lastUpdated: "2024-03-01",
    relevance: 98,
  },
  {
    id: "2",
    title: "Common Connectivity Issues",
    category: "troubleshooting",
    summary: "Solutions for common connectivity problems with Tuya devices.",
    lastUpdated: "2024-03-10",
    relevance: 95,
  },
  {
    id: "3",
    title: "Firmware Update Process",
    category: "product",
    summary: "Instructions for updating device firmware safely.",
    lastUpdated: "2024-03-05",
    relevance: 92,
  },
  {
    id: "4",
    title: "Device Pairing FAQ",
    category: "faq",
    summary: "Frequently asked questions about device pairing and setup.",
    lastUpdated: "2024-03-08",
    relevance: 88,
  },
  {
    id: "5",
    title: "API Authentication",
    category: "api",
    summary: "Guide to implementing API authentication for Tuya devices.",
    lastUpdated: "2024-03-12",
    relevance: 85,
  },
]

export function KnowledgePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState(documents[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredDocuments = documents.filter(
    (doc) =>
      (selectedCategory === "all" || doc.category === selectedCategory) &&
      (doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="flex h-[calc(100vh-5rem)] gap-4 p-4">
      {/* Search and Document List */}
      <div className="w-1/2">
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Knowledge Base</CardTitle>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Command className="rounded-lg border shadow-md">
              <CommandInput
                placeholder="Search documentation..."
                value={searchQuery}
                onValueChange={setSearchQuery}
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {filteredDocuments.map((doc) => (
                    <CommandItem
                      key={doc.id}
                      onSelect={() => setSelectedDocument(doc)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div>
                          <h3 className="font-medium">{doc.title}</h3>
                          <p className="text-sm text-muted-foreground truncate max-w-[300px]">
                            {doc.summary}
                          </p>
                        </div>
                        <Badge variant="secondary">{doc.relevance}%</Badge>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </CardContent>
        </Card>
      </div>

      {/* Document Preview */}
      <div className="w-1/2">
        <Card className="h-full">
          <CardHeader>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <CardTitle>{selectedDocument.title}</CardTitle>
                <Badge>
                  Last updated: {selectedDocument.lastUpdated}
                </Badge>
              </div>
              <Badge variant="secondary" className="capitalize">
                {categories.find(c => c.id === selectedDocument.category)?.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-15rem)]">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {selectedDocument.summary}
                </p>
                {/* This would be replaced with actual document content */}
                <div className="prose dark:prose-invert">
                  <h2>Introduction</h2>
                  <p>
                    This document provides comprehensive information about {selectedDocument.title.toLowerCase()}.
                    Follow these guidelines to ensure proper implementation and troubleshooting.
                  </p>
                  
                  <h2>Key Features</h2>
                  <ul>
                    <li>Feature 1: Description of the first key feature</li>
                    <li>Feature 2: Description of the second key feature</li>
                    <li>Feature 3: Description of the third key feature</li>
                  </ul>

                  <h2>Common Issues</h2>
                  <p>
                    Here are some common issues users might encounter and their solutions:
                  </p>
                  <ul>
                    <li>Issue 1: Solution for the first common issue</li>
                    <li>Issue 2: Solution for the second common issue</li>
                    <li>Issue 3: Solution for the third common issue</li>
                  </ul>

                  <h2>Best Practices</h2>
                  <p>
                    Follow these best practices to ensure optimal performance and reliability:
                  </p>
                  <ul>
                    <li>Best Practice 1: Description of the first best practice</li>
                    <li>Best Practice 2: Description of the second best practice</li>
                    <li>Best Practice 3: Description of the third best practice</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
