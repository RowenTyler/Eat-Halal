"use client";

import { useState } from "react";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReviewCard } from "@/components/review/review-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockReviews, mockUsers } from "@/lib/mock-data";
import { Star, TrendingUp, Award, PenLine } from "lucide-react";

export default function MyReviewsPage() {
  const [sortBy, setSortBy] = useState("recent");
  const user = mockUsers[0];

  // Mock user's reviews
  const userReviews = mockReviews.filter((r) => r.userId === user.id);

  // Stats
  const totalReviews = userReviews.length;
  const avgRating = userReviews.length > 0
    ? userReviews.reduce((acc, r) => acc + r.rating, 0) / userReviews.length
    : 0;
  const totalLikes = userReviews.reduce((acc, r) => acc + r.likeCount, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Reviews</h1>
              <p className="text-muted-foreground mt-1">
                Manage and track your restaurant reviews
              </p>
            </div>
            <Button asChild>
              <a href="/restaurants">
                <PenLine className="h-4 w-4 mr-2" />
                Write a Review
              </a>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <PenLine className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalReviews}</p>
                    <p className="text-sm text-muted-foreground">Total Reviews</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-500/10 rounded-full">
                    <Star className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
                    <p className="text-sm text-muted-foreground">Avg Rating Given</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-500/10 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalLikes}</p>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <Badge>{user.level}</Badge>
                    <p className="text-sm text-muted-foreground mt-1">Current Level</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Reviews</h2>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="highest">Highest Rated</SelectItem>
                  <SelectItem value="lowest">Lowest Rated</SelectItem>
                  <SelectItem value="likes">Most Liked</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {userReviews.length > 0 ? (
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} showRestaurant />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <PenLine className="h-16 w-16 mx-auto text-muted-foreground/30" />
                  <h3 className="text-lg font-medium mt-4">No reviews yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Share your dining experiences with the community
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/restaurants">Find a Restaurant</a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
