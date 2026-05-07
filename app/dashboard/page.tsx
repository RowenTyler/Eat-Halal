"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { ReviewCard } from "@/components/review/review-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PenLine,
  Heart,
  Star,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";
import { mockUsers, mockReviews, mockRestaurants, foodieLevels } from "@/lib/mock-data";

export default function DashboardPage() {
  const user = mockUsers[0];
  const userReviews = mockReviews.filter((r) => r.userId === user.id);
  const favoriteRestaurants = mockRestaurants.slice(0, 3);

  // Calculate level progress
  const currentLevel = foodieLevels.find((l) => user.reviewCount >= l.minReviews);
  const nextLevel = foodieLevels.find((l) => l.minReviews > user.reviewCount);
  const progressToNext = nextLevel
    ? ((user.reviewCount - (currentLevel?.minReviews || 0)) /
        (nextLevel.minReviews - (currentLevel?.minReviews || 0))) *
      100
    : 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn />
      <div className="flex-1 flex">
        <DashboardSidebar role="reviewer" />
        <main className="flex-1 p-6 bg-muted/30">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>
                    {user.fullName.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {user.fullName.split(" ")[0]}!</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge>{user.level}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {user.reviewCount} reviews
                    </span>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/restaurants">
                  <PenLine className="h-4 w-4 mr-2" />
                  Write a Review
                </Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <PenLine className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{user.reviewCount}</p>
                      <p className="text-sm text-muted-foreground">Reviews</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500/10 rounded-full">
                      <Heart className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Favorites</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-full">
                      <Star className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">4.5</p>
                      <p className="text-sm text-muted-foreground">Avg Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-full">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-sm text-muted-foreground">Helpful Votes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Level Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Level Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <Badge>{currentLevel?.name}</Badge>
                  {nextLevel && (
                    <span className="text-sm text-muted-foreground">
                      {nextLevel.minReviews - user.reviewCount} reviews to {nextLevel.name}
                    </span>
                  )}
                </div>
                <Progress value={progressToNext} className="h-2" />
                <Link
                  href="/foodie-levels"
                  className="text-sm text-primary hover:underline mt-2 inline-block"
                >
                  View all levels &rarr;
                </Link>
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Recent Reviews</h2>
                <Button variant="ghost" asChild>
                  <Link href="/my-reviews">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              {userReviews.length > 0 ? (
                <div className="space-y-4">
                  {userReviews.slice(0, 2).map((review) => (
                    <ReviewCard key={review.id} review={review} showRestaurant />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No reviews yet</p>
                    <Button className="mt-4" asChild>
                      <Link href="/restaurants">Write Your First Review</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Favorite Restaurants */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Favorite Restaurants</h2>
                <Button variant="ghost" asChild>
                  <Link href="/favorites">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
