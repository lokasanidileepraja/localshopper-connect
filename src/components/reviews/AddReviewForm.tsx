
import { useState } from 'react';
import { Star, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Review } from '@/pages/ProductReviews';
import { cn } from '@/lib/utils';

interface AddReviewFormProps {
  productId: string;
  onSubmit: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  onCancel: () => void;
}

export const AddReviewForm = ({ productId, onSubmit, onCancel }: AddReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [errors, setErrors] = useState({ 
    rating: false, 
    title: false, 
    comment: false 
  });

  // In a real app, this would come from auth
  const user = {
    id: 'current_user',
    name: 'You',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    const newErrors = {
      rating: rating === 0,
      title: title.trim() === '',
      comment: comment.trim() === '',
    };

    setErrors(newErrors);

    if (newErrors.rating || newErrors.title || newErrors.comment) {
      return;
    }

    onSubmit({
      productId,
      userId: user.id,
      userName: user.name,
      rating,
      title,
      comment,
      images,
      verified: true,
    });
  };

  // Mock image upload function
  const handleImageUpload = () => {
    // In a real app, this would open a file picker and upload the image
    // For demo purposes, we'll just add a placeholder image
    setImages([...images, 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd']);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="border rounded-lg p-6 shadow-sm bg-white">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Write Your Review</h3>
        <Button variant="ghost" size="sm" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Overall Rating</label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={cn(
                  "focus:outline-none",
                  errors.rating && "animate-shake"
                )}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    (hoverRating || rating) >= star
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">Please select a rating</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="review-title" className="block text-sm font-medium mb-1">
            Review Title
          </label>
          <Input
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience"
            className={errors.title ? "border-red-500" : ""}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Please enter a title</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="review-comment" className="block text-sm font-medium mb-1">
            Review Details
          </label>
          <Textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What did you like or dislike? How was your experience with this product?"
            rows={5}
            className={errors.comment ? "border-red-500" : ""}
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">Please enter review details</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Add Photos (Optional)
          </label>
          
          <div className="flex flex-wrap gap-2 mb-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image} 
                  alt={`Review image ${index + 1}`}
                  className="h-20 w-20 object-cover rounded-md"
                />
                <button
                  type="button"
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            
            {images.length < 3 && (
              <button 
                type="button"
                onClick={handleImageUpload}
                className="h-20 w-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-500 hover:border-gray-400"
              >
                <Upload className="h-6 w-6" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-500">You can add up to 3 photos</p>
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
};
