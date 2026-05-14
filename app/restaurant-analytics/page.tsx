"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { mockReviews, mockRestaurants } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function RestaurantAnalyticsPage() {
  const restaurant = mockRestaurants[0];
  const totalsByMonth = [
    { month: "Jan", reviews: 14, rating: 4.5 },
    { month: "Feb", reviews: 18, rating: 4.6 },
    { month: "Mar", reviews: 23, rating: 4.7 },
    { month: "Apr", reviews: 19, rating: 4.6 },
    { month: "May", reviews: 27, rating: 4.8 },
    { month: "Jun", reviews: 31, rating: 4.9 },
  ];

  const averageRating = ((mockReviews.reduce((sum, item) => sum + item.rating, 0) / mockReviews.length) || 0).toFixed(1);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex bg-muted/30">
        <DashboardSidebar role="owner" />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">View restaurant performance, review trends, and customer sentiment.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Selected restaurant</p>
                  <h2 className="text-xl font-semibold">{restaurant.name}</h2>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Average review rating</p>
                  <p className="text-3xl font-bold">{averageRating}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Total reviews</p>
                  <p className="text-3xl font-bold">{mockReviews.length}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Review volume</CardTitle>
                <CardDescription>Monthly review submissions and satisfaction trends.</CardDescription>
              </CardHeader>
              <CardContent className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={totalsByMonth} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="reviews" name="Reviews" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
