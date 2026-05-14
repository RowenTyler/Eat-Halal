import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminSetupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-primary">Admin setup</p>
            <h1 className="text-3xl font-bold">Get the platform ready for your team</h1>
            <p className="max-w-3xl text-muted-foreground">
              Configure the admin dashboard, review access, and restaurant management settings before inviting users.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Step 1</CardTitle>
                <CardDescription>Configure permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Set up roles for administrators, restaurant owners, and reviewers.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Step 2</CardTitle>
                <CardDescription>Connect restaurant data</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Prepare your data import and review listing policies before going live.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Step 3</CardTitle>
                <CardDescription>Invite your team</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Give your team access to moderation, analytics, and claims workflows.</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Next step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">You can continue directly to the admin dashboard to manage restaurants and claims.</p>
              <Button asChild>
                <Link href="/admin-dashboard">Open Admin Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
