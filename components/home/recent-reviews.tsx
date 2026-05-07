import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "@/components/review/review-card";
import { mockReviews } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export function RecentReviews() {
  const recentReviews = mockReviews.slice(0, 3);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Recent Reviews</h2>
            <p className="text-muted-foreground mt-1">
              See what our community is saying
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/restaurants">
              Browse All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} showRestaurant />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/restaurants">
              Browse All Reviews
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
