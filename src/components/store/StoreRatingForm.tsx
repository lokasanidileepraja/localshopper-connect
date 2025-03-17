
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface StoreRatingFormProps {
  storeId: string;
  storeName: string;
  onRatingSubmitted?: () => void;
}

export const StoreRatingForm = ({ storeId, storeName, onRatingSubmitted }: StoreRatingFormProps) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Rating Submitted",
      description: `Thank you for rating ${storeName}!`,
    });
    
    setIsSubmitting(false);
    setRating(0);
    setReview("");
    
    if (onRatingSubmitted) {
      onRatingSubmitted();
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold text-lg">Rate Your Experience</h3>
      
      <div className="flex items-center justify-center gap-2 py-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
          >
            <Star
              className={`h-8 w-8 ${
                (hoverRating || rating) >= star
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              } transition-colors`}
            />
          </button>
        ))}
      </div>
      
      <Textarea
        placeholder="Share your experience with this store (optional)"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="w-full resize-none"
        rows={4}
      />
      
      <Button 
        onClick={handleRatingSubmit} 
        disabled={isSubmitting || rating === 0}
        className="w-full"
      >
        {isSubmitting ? "Submitting..." : "Submit Rating"}
      </Button>
    </div>
  );
};
