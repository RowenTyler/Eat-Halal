"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Phone, Globe, Clock, X, Upload } from "lucide-react";
import { cuisineTypes } from "@/lib/mock-data";

const priceRanges = [
  { value: "$", label: "$ - Budget Friendly" },
  { value: "$$", label: "$$ - Moderate" },
  { value: "$$$", label: "$$$ - Upscale" },
  { value: "$$$$", label: "$$$$ - Fine Dining" },
];

const certificationBodies = [
  "HMC (Halal Monitoring Committee)",
  "HFA (Halal Food Authority)",
  "IFANCA",
  "ISNA",
  "Other",
];

export default function AddRestaurantPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
    website: "",
    priceRange: "",
    description: "",
    certificationBody: "",
    isVerified: false,
  });

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines((prev) =>
      prev.includes(cuisine)
        ? prev.filter((c) => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Submit to database
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push("/restaurants");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-muted/30 py-8">
        <div className="container max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Add a Restaurant</h1>
            <p className="text-muted-foreground mt-1">
              Help the community discover a new halal dining spot
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Tell us about the restaurant
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter restaurant name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="Brief description of the restaurant..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cuisine Types *</Label>
                  <div className="flex flex-wrap gap-2 p-3 border rounded-md min-h-[60px]">
                    {selectedCuisines.length > 0 ? (
                      selectedCuisines.map((cuisine) => (
                        <Badge
                          key={cuisine}
                          variant="secondary"
                          className="gap-1 cursor-pointer"
                          onClick={() => toggleCuisine(cuisine)}
                        >
                          {cuisine}
                          <X className="h-3 w-3" />
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">
                        Select cuisines below
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {cuisineTypes.slice(0, 12).map((cuisine) => (
                      <Badge
                        key={cuisine}
                        variant={
                          selectedCuisines.includes(cuisine)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => toggleCuisine(cuisine)}
                      >
                        {cuisine}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priceRange">Price Range</Label>
                  <Select
                    value={formData.priceRange}
                    onValueChange={(value) =>
                      setFormData({ ...formData, priceRange: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      {priceRanges.map((range) => (
                        <SelectItem key={range.value} value={range.value}>
                          {range.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Location & Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Location & Contact</CardTitle>
                <CardDescription>
                  How can people find and reach the restaurant?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="123 Main Street"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    placeholder="London"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+44 20 1234 5678"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          setFormData({ ...formData, website: e.target.value })
                        }
                        placeholder="https://example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Halal Certification */}
            <Card>
              <CardHeader>
                <CardTitle>Halal Certification</CardTitle>
                <CardDescription>
                  Information about halal certification (if known)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificationBody">Certification Body</Label>
                  <Select
                    value={formData.certificationBody}
                    onValueChange={(value) =>
                      setFormData({ ...formData, certificationBody: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select certification body" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificationBodies.map((body) => (
                        <SelectItem key={body} value={body}>
                          {body}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="isVerified"
                    checked={formData.isVerified}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isVerified: !!checked })
                    }
                  />
                  <div>
                    <Label htmlFor="isVerified" className="cursor-pointer">
                      I have verified this restaurant is halal certified
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Please only check this if you have personally verified the
                      certification
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Photos */}
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                  Add photos of the restaurant (optional)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Drag and drop photos here, or click to browse
                  </p>
                  <Button variant="outline" className="mt-4">
                    Upload Photos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Restaurant
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
