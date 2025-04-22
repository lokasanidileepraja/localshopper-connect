
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageSquare, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StoreReviewCard } from '@/components/reviews/StoreReviewCard';
import { storage } from '@/lib/storage';

export interface StoreReview {
  id: string;
  storeId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  productsBought: number;
  verified: boolean;
}

const StoreReviews = () => {
  const { storeName } = useParams<{ storeName: string }>();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<StoreReview[]>([]);
  const [store, setStore] = useState<{ id: string; name: string; image?: string } | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Mock store data
    setStore({
      id: 'store123',
      name: storeName || 'TechHub Electronics',
      image: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282',
    });

    // Get reviews from storage or use mock data
    const storedReviews = storage.get<StoreReview[]>(`store_reviews_${storeName}`);
    if (storedReviews && storedReviews.length > 0) {
      setReviews(storedReviews);
    } else {
      // Mock reviews
      const mockReviews: StoreReview[] = [
        {
          id: '1',
          storeId: 'store123',
          userId: 'user1',
          userName: 'Rahul Singh',
          rating: 5,
          comment: 'Excellent shopping experience. The staff was very helpful and the prices were competitive. Will definitely shop here again.',
          date: '2023-04-01',
          helpful: 12,
          productsBought: 5,
          verified: true,
        },
        {
          id: '2',
          storeId: 'store123',
          userId: 'user2',
          userName: 'Priya Patel',
          rating: 4,
          comment: 'Good store with wide selection. The only issue was the waiting time at checkout.',
          date: '2023-03-25',
          helpful: 8,
          productsBought: 2,
          verified: true,
        },
        {
          id: '3',
          storeId: 'store123',
          userId: 'user3',
          userName: 'Amit Kumar',
          rating: 3,
          comment: 'Average experience. The products are good but customer service needs improvement.',
          date: '2023-03-20',
          helpful: 5,
          productsBought: 1,
          verified: false,
        },
      ];
      setReviews(mockReviews);
      storage.set(`store_reviews_${storeName}`, mockReviews);
    }
  }, [storeName]);

  const handleHelpful = (reviewId: string) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 } 
        : review
    );
    setReviews(updatedReviews);
    storage.set(`store_reviews_${storeName}`, updatedReviews);
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
      : reviews;

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(`/store/${storeName}`)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Store
      </Button>

      <div className="flex items-center space-x-4 mb-6">
        {store.image && (
          <img 
            src={store.image} 
            alt={store.name} 
            className="h-16 w-16 object-cover rounded-md"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{store.name} - Reviews</h1>
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

            <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
              <div className="flex items-start mb-2">
                <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                <h3 className="font-medium text-blue-700">Verified Store</h3>
              </div>
              <p className="text-sm text-blue-600">
                This store has been verified by our team to ensure authenticity and reliability.
              </p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Reviews</TabsTrigger>
                <TabsTrigger value="verified">Verified Customers</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeTab} className="space-y-6">
              {filteredReviews.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">No reviews yet</h2>
                  <p className="text-gray-600">This store doesn't have any reviews yet</p>
                </div>
              ) : (
                filteredReviews.map(review => (
                  <StoreReviewCard
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

export default StoreReviews;
