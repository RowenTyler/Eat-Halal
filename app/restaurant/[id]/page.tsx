"use client";

import { useState } from "react";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StarRating } from "@/components/ui/star-rating";
import { ReviewCard } from "@/components/review/review-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MapPin,
  Phone,
  Globe,
  Clock,
  CheckCircle,
  Heart,
  Share2,
  Flag,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Utensils,
  DollarSign,
} from "lucide-react";
import {
  mockRestaurants,
  mockReviews,
  mockMenuItems,
  mockStaff,
} from "@/lib/mock-data";

export default function RestaurantDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  const restaurant = mockRestaurants.find((r) => r.id === id);
  const reviews = mockReviews.filter((r) => r.restaurantId === id);
  const menuItems = mockMenuItems.filter((m) => m.restaurantId === id);
  const staff = mockStaff.filter((s) => s.restaurantId === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Restaurant Not Found</h1>
            <p className="text-muted-foreground mt-2">
              The restaurant you&apos;re looking for doesn&apos;t exist.
            </p>
            <Button asChild className="mt-4">
              <Link href="/restaurants">Browse Restaurants</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const allPhotos = restaurant.photos.length > 0 ? restaurant.photos : [restaurant.imageUrl];

  const menuCategories = [...new Set(menuItems.map((item) => item.category))];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit review to database
    console.log("Review submitted:", { rating: userRating, text: reviewText });
    setUserRating(0);
    setReviewText("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section with Photos */}
        <div className="relative h-64 md:h-96 bg-muted">
          <Image
            src={allPhotos[activePhotoIndex]}
            alt={restaurant.name}
            fill
            className="object-cover"
          />
          {/* Photo Navigation */}
          {allPhotos.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev === 0 ? allPhotos.length - 1 : prev - 1
                  )
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev === allPhotos.length - 1 ? 0 : prev + 1
                  )
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {allPhotos.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activePhotoIndex
                        ? "bg-white"
                        : "bg-white/50"
                    }`}
                    onClick={() => setActivePhotoIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="container py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Restaurant Info Header */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                      {restaurant.isVerified && (
                        <Badge className="bg-primary gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <StarRating value={restaurant.rating} size="sm" />
                        <span className="font-medium text-foreground">
                          {restaurant.rating}
                        </span>
                        <span>({restaurant.reviewCount} reviews)</span>
                      </div>
                      <span>{restaurant.priceRange}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {restaurant.cuisines.map((cuisine) => (
                        <Badge key={cuisine} variant="outline">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorited ? "fill-red-500 text-red-500" : ""
                        }`}
                      />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Claim Banner */}
                {!restaurant.isClaimed && (
                  <Card className="mt-6 border-primary/50 bg-primary/5">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium">Own this restaurant?</p>
                        <p className="text-sm text-muted-foreground">
                          Claim this listing to manage your business
                        </p>
                      </div>
                      <Button asChild>
                        <Link href={`/claim-restaurant/${restaurant.id}`}>
                          Claim Now
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Tabs Content */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="menu">Menu</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="photos">Photos</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-6">
                  {/* About */}
                  <Card>
                    <CardHeader>
                      <CardTitle>About</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {restaurant.name} is a popular {restaurant.cuisines.join(" & ")}{" "}
                        restaurant located in {restaurant.city}. Known for authentic
                        halal cuisine and excellent service.
                      </p>

                      {restaurant.certificationBody && (
                        <div className="mt-4 p-4 bg-primary/5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-5 w-5 text-primary" />
                            <span className="font-medium">
                              Halal Certified by {restaurant.certificationBody}
                            </span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Popular Dishes */}
                  {menuItems.filter((m) => m.isPopular).length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Popular Dishes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 sm:grid-cols-2">
                          {menuItems
                            .filter((m) => m.isPopular)
                            .map((item) => (
                              <div
                                key={item.id}
                                className="flex gap-4 p-3 rounded-lg border"
                              >
                                {item.imageUrl && (
                                  <div className="relative h-20 w-20 rounded-md overflow-hidden shrink-0">
                                    <Image
                                      src={item.imageUrl}
                                      alt={item.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-muted-foreground line-clamp-2">
                                    {item.description}
                                  </p>
                                  <p className="text-sm font-medium mt-1">
                                    £{item.price.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Staff */}
                  {staff.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Meet the Team</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-6 flex-wrap">
                          {staff.map((member) => (
                            <div key={member.id} className="text-center">
                              <Avatar className="h-16 w-16 mx-auto">
                                <AvatarImage src={member.photoUrl} />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <p className="font-medium mt-2">{member.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Menu Tab */}
                <TabsContent value="menu" className="space-y-6 mt-6">
                  {menuCategories.length > 0 ? (
                    menuCategories.map((category) => (
                      <Card key={category}>
                        <CardHeader>
                          <CardTitle>{category}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {menuItems
                              .filter((item) => item.category === category)
                              .map((item) => (
                                <div
                                  key={item.id}
                                  className="flex justify-between gap-4 pb-4 border-b last:border-0 last:pb-0"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium">{item.name}</h4>
                                      {item.isVegetarian && (
                                        <Badge variant="outline" className="text-xs">
                                          V
                                        </Badge>
                                      )}
                                      {item.isPopular && (
                                        <Badge className="text-xs">Popular</Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {item.description}
                                    </p>
                                  </div>
                                  <p className="font-medium shrink-0">
                                    £{item.price.toFixed(2)}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <Utensils className="h-12 w-12 mx-auto text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">
                          Menu not available yet
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-6 mt-6">
                  {/* Write Review */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Write a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleReviewSubmit} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Your Rating
                          </label>
                          <StarRating
                            value={userRating}
                            onChange={setUserRating}
                            readonly={false}
                            size="lg"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Your Review
                          </label>
                          <Textarea
                            placeholder="Share your experience..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows={4}
                          />
                        </div>
                        <Button type="submit" disabled={!userRating}>
                          Submit Review
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Reviews List */}
                  {reviews.length > 0 ? (
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <p className="text-muted-foreground">
                          No reviews yet. Be the first to review!
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Photos Tab */}
                <TabsContent value="photos" className="mt-6">
                  <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                    {allPhotos.map((photo, index) => (
                      <Dialog key={index}>
                        <DialogTrigger asChild>
                          <button className="relative aspect-square rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                            <Image
                              src={photo}
                              alt={`${restaurant.name} photo ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>{restaurant.name}</DialogTitle>
                          </DialogHeader>
                          <div className="relative aspect-video">
                            <Image
                              src={photo}
                              alt={`${restaurant.name} photo ${index + 1}`}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact & Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                    <div>
                      <p>{restaurant.address}</p>
                      <p className="text-muted-foreground">{restaurant.city}</p>
                    </div>
                  </div>

                  {restaurant.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={`tel:${restaurant.phone}`}
                        className="hover:underline"
                      >
                        {restaurant.phone}
                      </a>
                    </div>
                  )}

                  {restaurant.website && (
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <a
                        href={restaurant.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        Visit Website
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span className="text-green-600 font-medium">Open Now</span>
                  </div>

                  <Button className="w-full mt-4">Get Directions</Button>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">{restaurant.rating}</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">{restaurant.reviewCount}</p>
                      <p className="text-sm text-muted-foreground">Reviews</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <DollarSign className="h-6 w-6 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        {restaurant.priceRange}
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      {restaurant.isVerified ? (
                        <>
                          <CheckCircle className="h-6 w-6 mx-auto text-primary" />
                          <p className="text-sm text-muted-foreground">Verified</p>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-6 w-6 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Pending</p>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Report */}
              <Button variant="outline" className="w-full">
                <Flag className="h-4 w-4 mr-2" />
                Report an Issue
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
