"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { ReviewCard } from "@/components/review/review-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Eye,
  Star,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  UtensilsCrossed,
  Users,
} from "lucide-react";
import { mockRestaurants, mockReviews } from "@/lib/mock-data";

// Mock analytics data
const viewsData = [
  { name: "Mon", views: 120 },
  { name: "Tue", views: 180 },
  { name: "Wed", views: 150 },
  { name: "Thu", views: 220 },
  { name: "Fri", views: 280 },
  { name: "Sat", views: 350 },
  { name: "Sun", views: 310 },
];

const reviewsOverTime = [
  { month: "Jan", reviews: 12 },
  { month: "Feb", reviews: 15 },
  { month: "Mar", reviews: 18 },
  { month: "Apr", reviews: 22 },
  { month: "May", reviews: 28 },
  { month: "Jun", reviews: 35 },
];

export default function RestaurantOwnerDashboard() {
  const restaurant = mockRestaurants[0];
  const reviews = mockReviews.filter((r) => r.restaurantId === restaurant.id);

  const stats = [
    {
      label: "Total Views",
      value: "2,345",
      change: "+12%",
      trend: "up",
      icon: Eye,
    },
    {
      label: "Average Rating",
      value: restaurant.rating.toFixed(1),
      change: "+0.2",
      trend: "up",
      icon: Star,
    },
    {
      label: "Total Reviews",
      value: restaurant.reviewCount.toString(),
      change: "+8",
      trend: "up",
      icon: MessageSquare,
    },
    {
      label: "Menu Views",
      value: "856",
      change: "+5%",
      trend: "up",
      icon: UtensilsCrossed,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn />
      <div className="flex-1 flex">
        <DashboardSidebar role="owner" />
        <main className="flex-1 p-6 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{restaurant.name}</h1>
                <p className="text-muted-foreground">Restaurant Dashboard</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/restaurant/${restaurant.id}`}>
                    View Public Page
                  </Link>
                </Button>
                <Button asChild>
                  <Link href={`/edit-restaurant/${restaurant.id}`}>
                    Edit Restaurant
                  </Link>
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge
                        variant={stat.trend === "up" ? "default" : "destructive"}
                        className="gap-1"
                      >
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold mt-4">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Views Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Views</CardTitle>
                  <CardDescription>Page views over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={viewsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews Over Time */}
              <Card>
                <CardHeader>
                  <CardTitle>Reviews Over Time</CardTitle>
                  <CardDescription>Monthly review count</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reviewsOverTime}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="reviews"
                          stroke="hsl(var(--primary))"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Reviews</h2>
                <Button variant="ghost" asChild>
                  <Link href="/review-management">
                    Manage Reviews
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground/30" />
                    <p className="text-muted-foreground mt-4">No reviews yet</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <Link href="/menu-management">
                  <CardContent className="p-6">
                    <UtensilsCrossed className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold">Menu Management</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Update your menu items
                    </p>
                  </CardContent>
                </Link>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <Link href="/promotions-manager">
                  <CardContent className="p-6">
                    <TrendingUp className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold">Promotions</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create special offers
                    </p>
                  </CardContent>
                </Link>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <Link href="/restaurant-analytics">
                  <CardContent className="p-6">
                    <Eye className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold">Analytics</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      View detailed insights
                    </p>
                  </CardContent>
                </Link>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow">
                <Link href="/profile-settings">
                  <CardContent className="p-6">
                    <Users className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-semibold">Team</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Manage staff profiles
                    </p>
                  </CardContent>
                </Link>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
