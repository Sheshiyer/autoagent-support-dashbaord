"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SettingsPage() {
  const [settings, setSettings] = useState({
    autoAgent: {
      enabled: true,
      autoSuggest: true,
      confidenceThreshold: 0.8,
      maxSuggestions: 3,
      model: "gpt-4",
    },
    notifications: {
      email: true,
      desktop: true,
      slack: false,
      urgentOnly: false,
    },
    ui: {
      theme: "system",
      density: "comfortable",
      animations: true,
      sidebarCollapsed: false,
    },
    api: {
      endpoint: "https://api.example.com/v1",
      apiKey: "••••••••••••••••",
      timeout: 30,
    },
  })

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving settings:", settings)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your dashboard and AutoAgent preferences
          </p>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <Tabs defaultValue="autoagent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="autoagent">AutoAgent</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="ui">UI Preferences</TabsTrigger>
          <TabsTrigger value="api">API Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="autoagent">
          <Card>
            <CardHeader>
              <CardTitle>AutoAgent Configuration</CardTitle>
              <CardDescription>
                Configure how AutoAgent assists with customer support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Enable AutoAgent</Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI to assist with customer support
                  </p>
                </div>
                <Switch
                  checked={settings.autoAgent.enabled}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      autoAgent: { ...settings.autoAgent, enabled: checked },
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Suggestions</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically suggest responses
                  </p>
                </div>
                <Switch
                  checked={settings.autoAgent.autoSuggest}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      autoAgent: { ...settings.autoAgent, autoSuggest: checked },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Model Selection</Label>
                <RadioGroup
                  value={settings.autoAgent.model}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      autoAgent: { ...settings.autoAgent, model: value },
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gpt-4" id="gpt-4" />
                    <Label htmlFor="gpt-4">GPT-4 (Recommended)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gpt-3.5" id="gpt-3.5" />
                    <Label htmlFor="gpt-3.5">GPT-3.5 (Faster)</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified about support activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={settings.notifications.email}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          email: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label htmlFor="email">Email Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="desktop"
                    checked={settings.notifications.desktop}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          desktop: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label htmlFor="desktop">Desktop Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="slack"
                    checked={settings.notifications.slack}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          slack: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label htmlFor="slack">Slack Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="urgent"
                    checked={settings.notifications.urgentOnly}
                    onCheckedChange={(checked) =>
                      setSettings({
                        ...settings,
                        notifications: {
                          ...settings.notifications,
                          urgentOnly: checked as boolean,
                        },
                      })
                    }
                  />
                  <Label htmlFor="urgent">Urgent Issues Only</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ui">
          <Card>
            <CardHeader>
              <CardTitle>UI Preferences</CardTitle>
              <CardDescription>
                Customize how the dashboard looks and feels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                <RadioGroup
                  value={settings.ui.theme}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      ui: { ...settings.ui, theme: value },
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="light" id="light" />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dark" id="dark" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="system" id="system" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Density</Label>
                <RadioGroup
                  value={settings.ui.density}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      ui: { ...settings.ui, density: value },
                    })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="comfortable" id="comfortable" />
                    <Label htmlFor="comfortable">Comfortable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="compact" id="compact" />
                    <Label htmlFor="compact">Compact</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable interface animations
                  </p>
                </div>
                <Switch
                  checked={settings.ui.animations}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      ui: { ...settings.ui, animations: checked },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>
                Configure API endpoints and authentication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>API Endpoint</Label>
                <Input
                  value={settings.api.endpoint}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      api: { ...settings.api, endpoint: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input
                  type="password"
                  value={settings.api.apiKey}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      api: { ...settings.api, apiKey: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>Request Timeout (seconds)</Label>
                <Input
                  type="number"
                  value={settings.api.timeout}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      api: { ...settings.api, timeout: parseInt(e.target.value) },
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
