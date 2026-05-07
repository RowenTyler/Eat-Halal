"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Sparkles } from "lucide-react";

const popularSearches = [
  "Indian",
  "Pakistani",
  "Middle Eastern",
  "Burgers",
  "Turkish",
];

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (location) params.set("location", location);
    router.push(`/restaurants?${params.toString()}`);
  };

  const handleQuickSearch = (cuisine: string) => {
    router.push(`/restaurants?cuisine=${cuisine.toLowerCase()}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-16 md:py-24 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Badge
            variant="secondary"
            className="mb-4 gap-1.5 px-3 py-1.5 text-sm"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Discover 2,500+ Halal Restaurants
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Halal Food
            </span>{" "}
            Near You
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Discover verified halal restaurants, read authentic reviews, and
            explore delicious halal dining experiences in your area.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-10 text-base"
              />
            </div>
            <div className="relative flex-1 sm:max-w-[200px]">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12 pl-10 text-base"
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8">
              Search
            </Button>
          </form>

          {/* Popular Searches */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-muted-foreground">Popular:</span>
            {popularSearches.map((search) => (
              <Button
                key={search}
                variant="outline"
                size="sm"
                onClick={() => handleQuickSearch(search)}
                className="rounded-full"
              >
                {search}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
