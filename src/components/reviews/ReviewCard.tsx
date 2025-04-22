
import { Star, ThumbsUp, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/formatters';
import { Review } from '@/pages/ProductReviews';

interface ReviewCardProps {
  review: Review;
  onMarkHelpful: () => void;
}

export const ReviewCard = ({ review, onMarkHelpful }: ReviewCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex justify-between">
        <div>
          <div className="flex items-center">
            <h3 className="font-semibold">{review.userName}</h3>
            {review.verified && (
              <div className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                <Check className="h-3 w-3 mr-1" />
                Verified
              </div>
            )}
          </div>
          <div className="flex items-center mt-1 mb-2">
            <div className="flex mr-2">
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
            <span className="text-sm text-gray-500">
              {formatDate(review.date)}
            </span>
          </div>
        </div>
      </div>

      <h4 className="font-medium mb-2">{review.title}</h4>
      <p className="text-gray-700 mb-4">{review.comment}</p>

      {review.images && review.images.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {review.images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`Review image ${index + 1}`}
                className="h-20 w-20 object-cover rounded-md"
              />
            ))}
          </div>
        </div>
      )}

      <Separator className="my-3" />

      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-600 hover:text-gray-900"
          onClick={onMarkHelpful}
        >
          <ThumbsUp className="h-4 w-4 mr-2" />
          Helpful ({review.helpful})
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-600 hover:text-gray-900"
        >
          Report
        </Button>
      </div>
    </div>
  );
};
