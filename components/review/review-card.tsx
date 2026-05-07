"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { ThumbsUp, MessageCircle, Flag } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { Review } from "@/lib/mock-data";

interface ReviewCardProps {
  review: Review;
  showRestaurant?: boolean;
}

export function ReviewCard({ review, showRestaurant = false }: ReviewCardProps) {
  const [liked, setLiked] = useState(review.isLiked || false);
  const [likeCount, setLikeCount] = useState(review.likeCount);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const initials = review.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card>
      <CardContent className="p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={review.userAvatar} alt={review.userName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <Link
                href={`/user/${review.userId}`}
                className="font-medium hover:underline"
              >
                {review.userName}
              </Link>
              <span className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </span>
            </div>

            {showRestaurant && (
              <Link
                href={`/restaurant/${review.restaurantId}`}
                className="text-sm text-muted-foreground hover:underline"
              >
                {review.restaurantName}
              </Link>
            )}

            <div className="mt-1">
              <StarRating value={review.rating} size="sm" />
            </div>
          </div>
        </div>

        {/* Body */}
        <p className="mt-4 text-sm leading-relaxed">{review.body}</p>

        {/* Photos */}
        {review.photos.length > 0 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {review.photos.map((photo, index) => (
              <div
                key={index}
                className="relative h-24 w-24 shrink-0 rounded-lg overflow-hidden"
              >
                <Image
                  src={photo}
                  alt={`Review photo ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t">
          <Button
            variant={liked ? "default" : "ghost"}
            size="sm"
            onClick={handleLike}
            className="gap-1.5"
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{likeCount}</span>
          </Button>

          <Button variant="ghost" size="sm" className="gap-1.5">
            <MessageCircle className="h-4 w-4" />
            <span>Reply</span>
          </Button>

          <Button variant="ghost" size="sm" className="ml-auto">
            <Flag className="h-4 w-4" />
            <span className="sr-only">Report</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
