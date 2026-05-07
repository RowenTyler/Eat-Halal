import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { mockRestaurants } from "@/lib/mock-data";
import { ArrowRight } from "lucide-react";

export function FeaturedSection() {
  const featuredRestaurants = mockRestaurants.filter((r) => r.featured);

  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">
              Featured Restaurants
            </h2>
            <p className="text-muted-foreground mt-1">
              Handpicked halal restaurants you&apos;ll love
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/restaurants?featured=true">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/restaurants?featured=true">
              View All Featured
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
