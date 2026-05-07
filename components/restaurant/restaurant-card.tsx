"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "@/components/ui/star-rating";
import { MapPin, CheckCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Restaurant } from "@/lib/mock-data";

interface RestaurantCardProps {
  restaurant: Restaurant;
  variant?: "default" | "compact" | "featured";
}

export function RestaurantCard({ restaurant, variant = "default" }: RestaurantCardProps) {
  const isFeatured = variant === "featured";
  const isCompact = variant === "compact";

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all hover:shadow-lg",
        isFeatured && "md:flex md:h-64"
      )}
    >
      <Link
        href={`/restaurant/${restaurant.id}`}
        className={cn(
          "relative block overflow-hidden",
          isFeatured ? "md:w-2/5" : "aspect-[4/3]"
        )}
      >
        <Image
          src={restaurant.imageUrl}
          alt={restaurant.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        {restaurant.featured && !isFeatured && (
          <Badge className="absolute top-3 left-3 bg-primary">
            Featured
          </Badge>
        )}
        {restaurant.trending && (
          <Badge variant="secondary" className="absolute top-3 right-3">
            Trending
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add to favorites
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </Link>

      <CardContent className={cn("p-4", isFeatured && "md:flex-1 md:p-6")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link
              href={`/restaurant/${restaurant.id}`}
              className="hover:underline"
            >
              <h3
                className={cn(
                  "font-semibold truncate",
                  isFeatured ? "text-xl" : "text-lg"
                )}
              >
                {restaurant.name}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {restaurant.address}, {restaurant.city}
              </span>
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {restaurant.priceRange}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <StarRating value={restaurant.rating} size="sm" />
          <span className="text-sm font-medium">{restaurant.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({restaurant.reviewCount} reviews)
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {restaurant.cuisines.slice(0, isCompact ? 2 : 3).map((cuisine) => (
            <Badge key={cuisine} variant="outline" className="text-xs">
              {cuisine}
            </Badge>
          ))}
          {restaurant.cuisines.length > (isCompact ? 2 : 3) && (
            <Badge variant="outline" className="text-xs">
              +{restaurant.cuisines.length - (isCompact ? 2 : 3)}
            </Badge>
          )}
        </div>

        {restaurant.isVerified && (
          <div className="flex items-center gap-1.5 mt-3 text-sm text-primary">
            <CheckCircle className="h-4 w-4" />
            <span>
              Halal Verified
              {restaurant.certificationBody && ` (${restaurant.certificationBody})`}
            </span>
          </div>
        )}

        {isFeatured && (
          <Button asChild className="mt-4">
            <Link href={`/restaurant/${restaurant.id}`}>
              View Restaurant
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
