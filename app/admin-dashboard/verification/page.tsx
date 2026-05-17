import Header from "@/components/layout/header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockRestaurants } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";

export default function AdminVerificationPage() {
  const unverified = mockRestaurants.filter((restaurant) => !restaurant.isVerified);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex bg-muted/30">
        <DashboardSidebar role="admin" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div>
              <h1 className="text-2xl font-bold">Verification Queue</h1>
              <p className="text-muted-foreground">Manage certification and verification requests for restaurant listings.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Total restaurants</CardTitle>
                  <CardDescription>{mockRestaurants.length} listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{mockRestaurants.filter((restaurant) => restaurant.isVerified).length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Needs verification</CardTitle>
                  <CardDescription>Restaurants waiting for manual review</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-semibold">{unverified.length}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Unverified restaurants</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {unverified.length === 0 ? (
                  <p className="text-muted-foreground">All restaurants are verified.</p>
                ) : (
                  unverified.map((restaurant) => (
                    <div key={restaurant.id} className="rounded-xl border p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-semibold">{restaurant.name}</p>
                          <p className="text-sm text-muted-foreground">{restaurant.city}, {restaurant.province}</p>
                        </div>
                        <Badge variant="outline">Needs review</Badge>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
