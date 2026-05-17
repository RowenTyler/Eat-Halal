"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
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
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2, MapPin, Phone, AlertCircle } from "lucide-react";
import GooglePlacesSearch, { GooglePlaceResult } from "@/components/GooglePlacesSearch";
import CuisineMultiSelect from "@/components/CuisineMultiSelect";
import { saProvinces } from "@/lib/mock-data";

const restaurantTypes = [
  "Casual Dining",
  "Fast Food",
  "Fine Dining",
  "Takeaway",
  "Café",
  "Bakery",
  "Food Truck",
];

const priceRanges = [
  { value: "$", label: "$ (Budget)" },
  { value: "$$", label: "$$ (Mid-Range)" },
  { value: "$$$", label: "$$$ (Upscale)" },
  { value: "$$$$", label: "$$$$ (Fine Dining)" },
];

interface RestaurantFormData {
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  phone: string;
  email: string;
  website: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  restaurant_type: string;
  cuisine_type: string[];
  price_range: string;
  imageUrl: string;
  claimAsOwner: boolean;
  ownerFullName: string;
  ownerPhoneNumber: string;
  certificationBody: string;
  certificateExpiryDate: string;
}

export default function AddRestaurantPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [showCommunityVerifiedDialog, setShowCommunityVerifiedDialog] = useState(false);
  const [formData, setFormData] = useState<RestaurantFormData>({
    name: "",
    description: "",
    address: "",
    city: "",
    province: "",
    postal_code: "",
    phone: "",
    email: "",
    website: "",
    instagram: "",
    facebook: "",
    tiktok: "",
    restaurant_type: "",
    cuisine_type: [],
    price_range: "",
    imageUrl: "",
    claimAsOwner: false,
    ownerFullName: "",
    ownerPhoneNumber: "",
    certificationBody: "SANHA",
    certificateExpiryDate: "",
  });

  const handlePlaceSelect = (place: GooglePlaceResult) => {
    setFormData((prev) => ({
      ...prev,
      name: place.name,
      address: place.address,
      city: place.city,
      province: place.province || prev.province,
      postal_code: place.postal_code || prev.postal_code,
      phone: place.phone || prev.phone,
      website: place.website || prev.website,
      imageUrl: place.imageUrl || prev.imageUrl,
    }));
    setShowManualEntry(false);
  };

  const handleCertificationBodyChange = (value: string) => {
    setFormData((prev) => ({ ...prev, certificationBody: value }));
    if (value === "Community Verified") {
      setShowCommunityVerifiedDialog(true);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    router.push("/restaurants");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-white to-amber-50">
      <Header />

      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Restaurant</h1>
            <p className="text-gray-600">Help the community discover amazing halal restaurants</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Card */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <MapPin className="h-5 w-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Search Section */}
                <div className="space-y-4">
                  <GooglePlacesSearch
                    onPlaceSelect={handlePlaceSelect}
                    onManualEntry={() => setShowManualEntry(true)}
                  />
                </div>

                {/* Manual Entry Section */}
                {showManualEntry && (
                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Restaurant Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(event) =>
                            setFormData({ ...formData, name: event.target.value })
                          }
                          placeholder="Le Kreamery"
                          required
                        />
                      </div>

                      <div>
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setShowManualEntry(false)}
                          className="mt-6"
                        >
                          ← Back to search
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Restaurant Type & Description */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="restaurant-type">Restaurant Type</Label>
                    <Input
                      id="restaurant-type"
                      list="restaurant-types"
                      value={formData.restaurant_type}
                      onChange={(event) =>
                        setFormData({ ...formData, restaurant_type: event.target.value })
                      }
                      placeholder="Type or choose a type"
                    />
                    <datalist id="restaurant-types">
                      {restaurantTypes.map((type) => (
                        <option key={type} value={type} />
                      ))}
                    </datalist>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price-range">Price Range</Label>
                    <Select
                      value={formData.price_range}
                      onValueChange={(value) => setFormData({ ...formData, price_range: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(event) =>
                      setFormData({ ...formData, description: event.target.value })
                    }
                    placeholder="Describe the restaurant, its atmosphere, and specialties..."
                    rows={3}
                  />
                </div>

                {/* Restaurant Image Preview */}
                {formData.imageUrl && (
                  <div className="rounded-lg border-2 border-dashed border-green-200 bg-green-50 p-4">
                    <p className="mb-3 text-sm font-medium text-green-800">
                      Restaurant Image Preview
                    </p>
                    <div className="flex items-start gap-4">
                      <img
                        src={formData.imageUrl}
                        alt={formData.name || "Restaurant image"}
                        className="h-24 w-32 rounded-lg border object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-green-600">
                          This image will be used as the restaurant's preview photo
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Cuisine Types */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cuisine_type">Cuisine Types</Label>
                    <CuisineMultiSelect
                      value={formData.cuisine_type}
                      onChange={(value) => setFormData({ ...formData, cuisine_type: value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Contact Card */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="flex items-center gap-2 text-green-700">
                  <Phone className="h-5 w-5" />
                  Location & Contact
                </CardTitle>
                {formData.imageUrl && (
                  <p className="text-sm text-green-600 font-normal mt-2">
                    Auto-populated from search
                  </p>
                )}
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(event) =>
                      setFormData({ ...formData, address: event.target.value })
                    }
                    placeholder="99 Sunnyside Ave, Lakefield, Benoni"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(event) =>
                        setFormData({ ...formData, city: event.target.value })
                      }
                      placeholder="Benoni"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="province">Province *</Label>
                    <Select
                      value={formData.province}
                      onValueChange={(value) =>
                        setFormData({ ...formData, province: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select province" />
                      </SelectTrigger>
                      <SelectContent>
                        {saProvinces.map((province) => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input
                      id="postal_code"
                      value={formData.postal_code}
                      onChange={(event) =>
                        setFormData({ ...formData, postal_code: event.target.value })
                      }
                      placeholder="1501"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(event) =>
                        setFormData({ ...formData, phone: event.target.value })
                      }
                      placeholder="084 535 7326"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(event) =>
                        setFormData({ ...formData, email: event.target.value })
                      }
                      placeholder="contact@restaurant.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(event) =>
                      setFormData({ ...formData, website: event.target.value })
                    }
                    placeholder="https://www.restaurant.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Media Card */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="text-green-700">Social Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(event) =>
                        setFormData({ ...formData, instagram: event.target.value })
                      }
                      placeholder="@restaurant_handle"
                    />
                  </div>

                  <div>
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(event) =>
                        setFormData({ ...formData, facebook: event.target.value })
                      }
                      placeholder="facebook.com/restaurant"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tiktok">TikTok</Label>
                    <Input
                      id="tiktok"
                      value={formData.tiktok}
                      onChange={(event) =>
                        setFormData({ ...formData, tiktok: event.target.value })
                      }
                      placeholder="@restaurant_tiktok"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ownership Claim Card */}
            <Card className="border-gray-200">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                <CardTitle className="text-green-700">Ownership Claim</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                <div className="flex items-center space-x-3">
                  <Switch
                    id="claimAsOwner"
                    checked={formData.claimAsOwner}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, claimAsOwner: checked }))
                    }
                  />
                  <Label htmlFor="claimAsOwner" className="cursor-pointer">
                    I am the owner of this restaurant
                  </Label>
                </div>

                {formData.claimAsOwner && (
                  <div className="space-y-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-800">
                      To fast-track your application, please provide the following information:
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="ownerFullName">Full Name *</Label>
                        <Input
                          id="ownerFullName"
                          value={formData.ownerFullName}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              ownerFullName: event.target.value,
                            })
                          }
                          placeholder="Your full name"
                          required={formData.claimAsOwner}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ownerPhoneNumber">Phone Number *</Label>
                        <Input
                          id="ownerPhoneNumber"
                          value={formData.ownerPhoneNumber}
                          onChange={(event) =>
                            setFormData({
                              ...formData,
                              ownerPhoneNumber: event.target.value,
                            })
                          }
                          placeholder="+27 11 123 4567"
                          required={formData.claimAsOwner}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="certificationBody">Certification Body *</Label>
                        <Select
                          value={formData.certificationBody}
                          onValueChange={handleCertificationBodyChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select certification body" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SANHA">SANHA</SelectItem>
                            <SelectItem value="NIHT">NIHT</SelectItem>
                            <SelectItem value="MJC">MJC</SelectItem>
                            <SelectItem value="Community Verified">
                              Community Verified
                            </SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {formData.certificationBody !== "Community Verified" && (
                        <div className="space-y-2">
                          <Label htmlFor="certificateExpiryDate">
                            Certificate Expiry Date *
                          </Label>
                          <Input
                            id="certificateExpiryDate"
                            type="date"
                            value={formData.certificateExpiryDate}
                            onChange={(event) =>
                              setFormData({
                                ...formData,
                                certificateExpiryDate: event.target.value,
                              })
                            }
                            required={
                              formData.claimAsOwner &&
                              formData.certificationBody !== "Community Verified"
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!formData.claimAsOwner && (
                  <div className="flex gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800">
                      You can add this restaurant without claiming ownership. Restaurant owners
                      can claim their restaurants later.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row justify-between">
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                  </>
                ) : (
                  "Add Restaurant"
                )}
              </Button>
            </div>
          </form>

          {/* Community Verified Dialog */}
          <Dialog open={showCommunityVerifiedDialog} onOpenChange={setShowCommunityVerifiedDialog}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-green-700">
                  Community Verified Restaurant
                </DialogTitle>
                <DialogDescription className="space-y-3 text-gray-600 pt-4">
                  <p>You've selected "Community Verified" certification. This means:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Your restaurant will be marked as community-verified</li>
                    <li>No halal certificate upload is required</li>
                    <li>The community will help verify the halal status</li>
                    <li>You can always update to formal certification later</li>
                  </ul>
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-end">
                <Button onClick={() => setShowCommunityVerifiedDialog(false)}>
                  Got it
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </main>

      <Footer />
    </div>
  );
}
