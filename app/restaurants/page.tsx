"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { FiltersSidebar } from "@/components/restaurant/filters-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mockRestaurants } from "@/lib/mock-data";
import { Search, SlidersHorizontal, MapPin, Grid, List } from "lucide-react";

interface FiltersState {
  cuisines: string[];
  priceRange: string[];
  rating: number;
  verified: boolean;
  distance: number;
}

const initialFilters: FiltersState = {
  cuisines: [],
  priceRange: [],
  rating: 0,
  verified: false,
  distance: 0,
};

const sortOptions = [
  { value: "rating-desc", label: "Highest Rated" },
  { value: "rating-asc", label: "Lowest Rated" },
  { value: "reviews-desc", label: "Most Reviews" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
];

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredRestaurants = useMemo(() => {
    let result = [...mockRestaurants];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.cuisines.some((c) => c.toLowerCase().includes(query)) ||
          r.city.toLowerCase().includes(query)
      );
    }

    // Cuisine filter
    if (filters.cuisines.length > 0) {
      result = result.filter((r) =>
        r.cuisines.some((c) => filters.cuisines.includes(c))
      );
    }

    // Price range filter
    if (filters.priceRange.length > 0) {
      result = result.filter((r) => filters.priceRange.includes(r.priceRange));
    }

    // Rating filter
    if (filters.rating > 0) {
      result = result.filter((r) => r.rating >= filters.rating);
    }

    // Verified filter
    if (filters.verified) {
      result = result.filter((r) => r.isVerified);
    }

    // Sort
    const [field, direction] = sortBy.split("-");
    result.sort((a, b) => {
      let comparison = 0;
      if (field === "rating") {
        comparison = a.rating - b.rating;
      } else if (field === "reviews") {
        comparison = a.reviewCount - b.reviewCount;
      } else if (field === "name") {
        comparison = a.name.localeCompare(b.name);
      }
      return direction === "desc" ? -comparison : comparison;
    });

    return result;
  }, [searchQuery, filters, sortBy]);

  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Page Header */}
        <div className="border-b bg-muted/30">
          <div className="container py-8">
            <h1 className="text-3xl font-bold">Find Halal Restaurants</h1>
            <p className="text-muted-foreground mt-2">
              Discover verified halal restaurants near you
            </p>
          </div>
        </div>

        {/* Search and Controls Bar */}
        <div className="border-b sticky top-16 z-40 bg-background">
          <div className="container py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search restaurants, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Location Button */}
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <MapPin className="h-4 w-4 mr-2" />
                  Near Me
                </Button>

                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="hidden sm:flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Filters Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="lg:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <FiltersSidebar
                        filters={filters}
                        onFiltersChange={setFilters}
                        onReset={resetFilters}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container py-8">
          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-36">
                <FiltersSidebar
                  filters={filters}
                  onFiltersChange={setFilters}
                  onReset={resetFilters}
                />
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Results Count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredRestaurants.length} restaurants
                </p>
              </div>

              {/* Restaurant Grid/List */}
              {filteredRestaurants.length > 0 ? (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                      : "space-y-4"
                  }
                >
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard
                      key={restaurant.id}
                      restaurant={restaurant}
                      variant={viewMode === "list" ? "featured" : "default"}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-lg font-medium">No restaurants found</p>
                  <p className="text-muted-foreground mt-1">
                    Try adjusting your filters or search query
                  </p>
                  <Button
                    variant="outline"
                    onClick={resetFilters}
                    className="mt-4"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
