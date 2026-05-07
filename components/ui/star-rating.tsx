"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: "sm" | "md" | "lg";
  readonly?: boolean;
  showValue?: boolean;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StarRating({
  value,
  onChange,
  size = "md",
  readonly = true,
  showValue = false,
}: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];

  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {stars.map((star) => {
        const filled = star <= value;
        const halfFilled = star - 0.5 <= value && star > value;

        return (
          <button
            key={star}
            type="button"
            onClick={() => handleClick(star)}
            disabled={readonly}
            className={cn(
              "focus:outline-none transition-transform",
              !readonly && "hover:scale-110 cursor-pointer",
              readonly && "cursor-default"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                filled || halfFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-muted text-muted-foreground/30"
              )}
            />
          </button>
        );
      })}
      {showValue && (
        <span className="ml-1 text-sm font-medium">{value.toFixed(1)}</span>
      )}
    </div>
  );
}
