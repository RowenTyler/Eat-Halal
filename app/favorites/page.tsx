"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RestaurantCard } from "@/components/restaurant/restaurant-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockRestaurants } from "@/lib/mock-data";
import { Search, Heart, Plus, FolderPlus } from "lucide-react";

// Mock favorite lists
const favoriteLists = [
  { id: "all", name: "All Favorites", count: 5 },
  { id: "date-night", name: "Date Night", count: 2 },
  { id: "family", name: "Family Friendly", count: 2 },
  { id: "quick-bites", name: "Quick Bites", count: 1 },
];

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeList, setActiveList] = useState("all");

  // Mock: first 5 restaurants are favorited
  const favoriteRestaurants = mockRestaurants.slice(0, 5);

  const filteredRestaurants = favoriteRestaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header isLoggedIn />
      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Favorites</h1>
              <p className="text-muted-foreground mt-1">
                Restaurants you&apos;ve saved for later
              </p>
            </div>
            <Button>
              <FolderPlus className="h-4 w-4 mr-2" />
              New List
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-4">
            {/* Sidebar - Lists */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search favorites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="space-y-1">
                {favoriteLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => setActiveList(list.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      activeList === list.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span className="font-medium">{list.name}</span>
                    <span
                      className={`text-sm ${
                        activeList === list.id
                          ? "text-primary-foreground/70"
                          : "text-muted-foreground"
                      }`}
                    >
                      {list.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {filteredRestaurants.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredRestaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Heart className="h-16 w-16 mx-auto text-muted-foreground/30" />
                  <h3 className="text-lg font-medium mt-4">No favorites yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Start exploring and save restaurants you love
                  </p>
                  <Button className="mt-4" asChild>
                    <a href="/restaurants">Browse Restaurants</a>
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
