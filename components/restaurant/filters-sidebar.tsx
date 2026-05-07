"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { X, RotateCcw } from "lucide-react";
import { cuisineTypes } from "@/lib/mock-data";

interface FiltersState {
  cuisines: string[];
  priceRange: string[];
  rating: number;
  verified: boolean;
  distance: number;
}

interface FiltersSidebarProps {
  filters: FiltersState;
  onFiltersChange: (filters: FiltersState) => void;
  onReset: () => void;
}

const priceOptions = [
  { value: "$", label: "$ - Budget" },
  { value: "$$", label: "$$ - Moderate" },
  { value: "$$$", label: "$$$ - Upscale" },
  { value: "$$$$", label: "$$$$ - Fine Dining" },
];

export function FiltersSidebar({
  filters,
  onFiltersChange,
  onReset,
}: FiltersSidebarProps) {
  const activeFiltersCount =
    filters.cuisines.length +
    filters.priceRange.length +
    (filters.verified ? 1 : 0) +
    (filters.rating > 0 ? 1 : 0);

  const toggleCuisine = (cuisine: string) => {
    const newCuisines = filters.cuisines.includes(cuisine)
      ? filters.cuisines.filter((c) => c !== cuisine)
      : [...filters.cuisines, cuisine];
    onFiltersChange({ ...filters, cuisines: newCuisines });
  };

  const togglePriceRange = (price: string) => {
    const newPriceRange = filters.priceRange.includes(price)
      ? filters.priceRange.filter((p) => p !== price)
      : [...filters.priceRange, price];
    onFiltersChange({ ...filters, priceRange: newPriceRange });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-8">
            <RotateCcw className="h-3 w-3 mr-1" />
            Reset
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.cuisines.map((cuisine) => (
            <Badge
              key={cuisine}
              variant="secondary"
              className="gap-1 cursor-pointer"
              onClick={() => toggleCuisine(cuisine)}
            >
              {cuisine}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          {filters.priceRange.map((price) => (
            <Badge
              key={price}
              variant="secondary"
              className="gap-1 cursor-pointer"
              onClick={() => togglePriceRange(price)}
            >
              {price}
              <X className="h-3 w-3" />
            </Badge>
          ))}
          {filters.verified && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer"
              onClick={() =>
                onFiltersChange({ ...filters, verified: false })
              }
            >
              Verified Only
              <X className="h-3 w-3" />
            </Badge>
          )}
        </div>
      )}

      <Accordion
        type="multiple"
        defaultValue={["cuisines", "price", "rating"]}
        className="w-full"
      >
        {/* Cuisine Filter */}
        <AccordionItem value="cuisines">
          <AccordionTrigger>Cuisine Type</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-2">
              {cuisineTypes.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cuisine-${cuisine}`}
                    checked={filters.cuisines.includes(cuisine)}
                    onCheckedChange={() => toggleCuisine(cuisine)}
                  />
                  <Label
                    htmlFor={`cuisine-${cuisine}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {cuisine}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {priceOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`price-${option.value}`}
                    checked={filters.priceRange.includes(option.value)}
                    onCheckedChange={() => togglePriceRange(option.value)}
                  />
                  <Label
                    htmlFor={`price-${option.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="rating">
          <AccordionTrigger>Minimum Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={[filters.rating]}
                onValueChange={([value]) =>
                  onFiltersChange({ ...filters, rating: value })
                }
                max={5}
                step={0.5}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Any</span>
                <span>{filters.rating > 0 ? `${filters.rating}+ stars` : "All ratings"}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Distance Filter */}
        <AccordionItem value="distance">
          <AccordionTrigger>Distance</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                value={[filters.distance]}
                onValueChange={([value]) =>
                  onFiltersChange({ ...filters, distance: value })
                }
                max={50}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Any distance</span>
                <span>{filters.distance > 0 ? `Within ${filters.distance} km` : "All"}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Verification Filter */}
        <AccordionItem value="verification">
          <AccordionTrigger>Verification</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified-only"
                checked={filters.verified}
                onCheckedChange={(checked) =>
                  onFiltersChange({ ...filters, verified: !!checked })
                }
              />
              <Label
                htmlFor="verified-only"
                className="text-sm font-normal cursor-pointer"
              >
                Halal Verified Only
              </Label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
