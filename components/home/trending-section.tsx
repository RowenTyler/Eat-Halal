"use client";

import { useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { mockRestaurants } from "@/lib/mock-data";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export function TrendingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trendingRestaurants = mockRestaurants.filter((r) => r.trending);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Trending Now
            </h2>
            <p className="text-muted-foreground mt-1">
              Popular restaurants everyone is talking about
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="hidden md:flex"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="hidden md:flex"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/restaurants?trending=true">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
        >
          {trendingRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="min-w-[300px] max-w-[300px] snap-start"
            >
              <RestaurantCard restaurant={restaurant} variant="compact" />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/restaurants?trending=true">
              View All Trending
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
