import Header from "@/components/layout/header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex bg-muted/30">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Admin Settings</h1>
              <p className="text-muted-foreground">Configure platform policies, security, and administrative preferences.</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Platform policies</CardTitle>
                <CardDescription>Update moderation and listing rules.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">These settings are placeholders for admin system configuration. When the backend is connected, this page will allow you to customize verification workflows, claim approval rules, and review moderation thresholds.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security & access</CardTitle>
                <CardDescription>Control who can access admin and restaurant dashboards.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Create roles, audit access, and manage feature flags as your backend is integrated.</p>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="secondary">Review permissions</Button>
              <Button>Update platform settings</Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
