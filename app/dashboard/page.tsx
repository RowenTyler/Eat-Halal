"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { ReviewCard } from "@/components/review/review-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  PenLine,
  Heart,
  Star,
  TrendingUp,
  Award,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Phone,
  FileCheck,
  Scale,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { mockReviews, mockRestaurants, foodieLevels, saCertificationBodies, saHalalRegulations } from "@/lib/mock-data";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth?redirect=/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userReviews = mockReviews.slice(0, 2);
  const favoriteRestaurants = mockRestaurants.slice(0, 3);

  // Calculate level progress
  const reviewCount = user.reviewCount || 0;
  const currentLevel = foodieLevels.find((l) => reviewCount >= l.minReviews) || foodieLevels[0];
  const nextLevel = foodieLevels.find((l) => l.minReviews > reviewCount);
  const progressToNext = nextLevel
    ? ((reviewCount - (currentLevel?.minReviews || 0)) /
        (nextLevel.minReviews - (currentLevel?.minReviews || 0))) *
      100
    : 100;

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn />
      <div className="flex-1 flex">
        <DashboardSidebar role={user.role === "admin" ? "admin" : user.role === "restaurant_owner" ? "restaurant" : "reviewer"} />
        <main className="flex-1 p-6 bg-muted/30 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                    <Badge>{currentLevel.name}</Badge>
                    <Badge variant="outline" className="capitalize">{user.role.replace("_", " ")}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {reviewCount} reviews
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
                      <p className="text-2xl font-bold">{reviewCount}</p>
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
                      <p className="text-sm text-muted-foreground">Favourites</p>
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
                  <Badge className={currentLevel.color}>{currentLevel.name}</Badge>
                  {nextLevel && (
                    <span className="text-sm text-muted-foreground">
                      {nextLevel.minReviews - reviewCount} reviews to {nextLevel.name}
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

            {/* South African Halaal Regulations Card */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-primary" />
                  {saHalalRegulations.title}
                </CardTitle>
                <CardDescription>
                  {saHalalRegulations.overview}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {saHalalRegulations.keyPoints.map((point, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="shrink-0">
                        <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{point.title}</p>
                        <p className="text-sm text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                {/* Recognized Certification Bodies */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <FileCheck className="h-4 w-4" />
                    Recognized SA Halaal Certification Bodies
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {saCertificationBodies.map((body) => (
                      <div key={body.id} className="flex items-start gap-3 p-3 bg-background rounded-lg border">
                        <Badge variant="outline" className="shrink-0">{body.name}</Badge>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{body.fullName}</p>
                          <a 
                            href={body.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1"
                          >
                            Verify Certificate <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Report Non-Compliance */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2 text-amber-700">
                    <AlertTriangle className="h-4 w-4" />
                    {saHalalRegulations.reportingInfo.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {saHalalRegulations.reportingInfo.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {saHalalRegulations.reportingInfo.contacts.map((contact, index) => (
                      <a
                        key={index}
                        href={`tel:${contact.contact.replace(/\s/g, "")}`}
                        className="inline-flex items-center gap-2 text-sm bg-background px-3 py-1.5 rounded-full border hover:border-primary transition-colors"
                      >
                        <Phone className="h-3 w-3" />
                        {contact.body}: {contact.contact}
                      </a>
                    ))}
                  </div>
                </div>
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
                  {userReviews.map((review) => (
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

            {/* Favourite Restaurants */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Favourite Restaurants</h2>
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
