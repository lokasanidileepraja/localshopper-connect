import React from "react";
import { Star } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ProductReviewsProps {
  productId: string;
}

export const ProductReviews = ({ productId }: ProductReviewsProps) => {
  const { toast } = useToast();
  const [reviews, setReviews] = React.useState<Review[]>([]);

  const ratingDistribution = {
    5: 70,
    4: 20,
    3: 5,
    2: 3,
    1: 2,
  };

  const handleAddReview = () => {
    toast({
      title: "Coming Soon",
      description: "Review submission will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Customer Reviews</h3>
        <Button onClick={handleAddReview}>Write a Review</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold">4.5</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= 4.5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500">Based on 123 reviews</p>
        </div>

        <div className="space-y-2">
          {Object.entries(ratingDistribution)
            .reverse()
            .map(([rating, percentage]) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="w-12 text-sm">{rating} stars</span>
                <Progress value={percentage} className="h-2" />
                <span className="w-12 text-sm text-right">{percentage}%</span>
              </div>
            ))}
        </div>
      </div>

      <ScrollArea className="h-[400px] rounded-md border p-4">
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500">No reviews yet</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="space-y-2 border-b pb-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{review.userName}</span>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};