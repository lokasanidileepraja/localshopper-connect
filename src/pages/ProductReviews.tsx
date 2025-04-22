
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Upload, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { AddReviewForm } from '@/components/reviews/AddReviewForm';
import { storage } from '@/lib/storage';
import { formatDate } from '@/lib/formatters';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  images?: string[];
  helpful: number;
  verified: boolean;
}

const ProductReviews = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [product, setProduct] = useState<{ id: string; name: string; image?: string } | null>(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Mock product data
    setProduct({
      id: productId || '1',
      name: 'iPhone 15',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    });

    // Get reviews from storage or use mock data
    const storedReviews = storage.get<Review[]>(`reviews_${productId}`);
    if (storedReviews && storedReviews.length > 0) {
      setReviews(storedReviews);
    } else {
      // Mock reviews
      const mockReviews: Review[] = [
        {
          id: '1',
          productId: productId || '1',
          userId: 'user1',
          userName: 'Rahul Singh',
          rating: 5,
          title: 'Amazing product!',
          comment: 'This is the best phone I have ever used. The camera quality is excellent and battery life is impressive.',
          date: '2023-04-01',
          helpful: 12,
          verified: true,
        },
        {
          id: '2',
          productId: productId || '1',
          userId: 'user2',
          userName: 'Priya Patel',
          rating: 4,
          title: 'Good but expensive',
          comment: 'Great phone overall but a bit expensive compared to competitors. The UI is very smooth and responsive.',
          date: '2023-03-25',
          helpful: 8,
          verified: true,
        },
        {
          id: '3',
          productId: productId || '1',
          userId: 'user3',
          userName: 'Amit Kumar',
          rating: 3,
          title: 'Average battery life',
          comment: 'The phone is good but the battery drains quickly. Need to charge it twice a day with moderate usage.',
          date: '2023-03-20',
          images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd'],
          helpful: 5,
          verified: false,
        },
      ];
      setReviews(mockReviews);
      storage.set(`reviews_${productId}`, mockReviews);
    }
  }, [productId]);

  const handleAddReview = (newReview: Omit<Review, 'id' | 'date' | 'helpful'>) => {
    const review: Review = {
      ...newReview,
      id: `review_${Date.now()}`,
      date: new Date().toISOString(),
      helpful: 0,
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    storage.set(`reviews_${productId}`, updatedReviews);
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId: string) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 } 
        : review
    );
    setReviews(updatedReviews);
    storage.set(`reviews_${productId}`, updatedReviews);
  };

  // Calculate rating statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  const filteredReviews = activeTab === 'all' 
    ? reviews 
    : activeTab === 'verified' 
      ? reviews.filter(review => review.verified)
      : activeTab === 'images'
        ? reviews.filter(review => review.images && review.images.length > 0)
        : reviews;

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(`/product/${productId}`)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Product
      </Button>

      <div className="flex items-center space-x-4 mb-6">
        {product.image && (
          <img 
            src={product.image} 
            alt={product.name} 
            className="h-16 w-16 object-cover rounded-md"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{product.name} - Reviews</h1>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {averageRating.toFixed(1)} out of 5 ({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Rating Distribution</h2>
            
            <div className="space-y-2">
              {ratingDistribution.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center gap-2">
                  <span className="w-12 text-sm">{rating} stars</span>
                  <Progress value={percentage} className="h-2 flex-1" />
                  <span className="w-12 text-sm text-right">{count}</span>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            <Button 
              className="w-full flex items-center justify-center"
              onClick={() => setShowReviewForm(true)}
            >
              <Upload className="mr-2 h-4 w-4" />
              Write a Review
            </Button>
          </div>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Reviews</TabsTrigger>
                <TabsTrigger value="verified">Verified Purchases</TabsTrigger>
                <TabsTrigger value="images">With Images</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="space-y-6">
              {showReviewForm && (
                <div className="mb-6">
                  <AddReviewForm 
                    productId={product.id} 
                    onSubmit={handleAddReview}
                    onCancel={() => setShowReviewForm(false)}
                  />
                </div>
              )}

              {filteredReviews.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No reviews yet</h2>
                  <p className="text-gray-600 mb-4">Be the first to review this product</p>
                  <Button onClick={() => setShowReviewForm(true)}>Write a Review</Button>
                </div>
              ) : (
                filteredReviews.map(review => (
                  <ReviewCard
                    key={review.id}
                    review={review}
                    onMarkHelpful={() => handleHelpful(review.id)}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
