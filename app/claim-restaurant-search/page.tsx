"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, CheckCircle, Store } from "lucide-react";
import { mockRestaurants } from "@/lib/mock-data";

export default function ClaimRestaurantSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const unclaimedRestaurants = mockRestaurants.filter((r) => !r.isClaimed);

  const searchResults = hasSearched
    ? unclaimedRestaurants.filter(
        (r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.city.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-12">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
              <Store className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold">Claim Your Restaurant</h1>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              Search for your restaurant to claim ownership and manage your
              listing. Get access to analytics, respond to reviews, and more.
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <form onSubmit={handleSearch} className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search by restaurant name or address..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!e.target.value) setHasSearched(false);
                    }}
                    className="pl-10 h-12"
                  />
                </div>
                <Button type="submit" size="lg" className="h-12">
                  Search
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Results */}
          {hasSearched && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {searchResults.length} unclaimed restaurant(s) found
              </p>

              {searchResults.length > 0 ? (
                searchResults.map((restaurant) => (
                  <Card key={restaurant.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4" />
                            {restaurant.address}, {restaurant.city}
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {restaurant.cuisines.slice(0, 3).map((cuisine) => (
                              <Badge key={cuisine} variant="outline">
                                {cuisine}
                              </Badge>
                            ))}
                            {restaurant.isVerified && (
                              <Badge className="gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Verified Halal
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button asChild>
                          <Link href={`/claim-restaurant/${restaurant.id}`}>
                            Claim
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Store className="h-12 w-12 mx-auto text-muted-foreground/30" />
                    <h3 className="font-medium mt-4">No restaurants found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try a different search term or add your restaurant
                    </p>
                    <Button asChild className="mt-4">
                      <Link href="/add-restaurant">Add Your Restaurant</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Benefits Section */}
          {!hasSearched && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold text-center mb-6">
                Benefits of Claiming Your Restaurant
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold">Respond to Reviews</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Engage with customers by responding to their reviews
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold">Access Analytics</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      See how many people are viewing your restaurant
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold">Update Information</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Keep your menu, hours, and details up to date
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold">Run Promotions</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Create special offers to attract more customers
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
