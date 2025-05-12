
import { useQuery, useMutation, QueryClient } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { 
  Product, 
  Store, 
  User, 
  Order, 
  Review,
  PriceAlert,
  Price,
  PointsLog,
  Badge
} from '@/types/models';
import { useToast } from './use-toast';

// Initialize a query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retry attempts
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time
    },
  },
});

export const useApi = () => {
  const { toast } = useToast();
  
  // User related queries with optimized settings
  const useCurrentUser = () => useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiService.getCurrentUser(),
    staleTime: 15 * 60 * 1000, // 15 minutes - user data changes less frequently
  });
  
  const useUserPoints = (userId?: string) => useQuery({
    queryKey: ['userPoints', userId],
    queryFn: () => (userId ? apiService.getUserPoints(userId) : Promise.resolve(0)),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const useUserBadges = (userId?: string) => useQuery({
    queryKey: ['userBadges', userId],
    queryFn: () => (userId ? apiService.getUserBadges(userId) : Promise.resolve([])),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes - badges don't change often
  });
  
  // Product related queries
  const useProducts = (category?: string) => useQuery({
    queryKey: ['products', category],
    queryFn: () => apiService.getProducts(category),
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
  
  const useProductById = (productId?: string) => useQuery({
    queryKey: ['product', productId],
    queryFn: () => (productId ? apiService.getProductById(productId) : Promise.resolve(null)),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const useProductPrices = (productId?: string) => useQuery({
    queryKey: ['productPrices', productId],
    queryFn: () => (productId ? apiService.getProductPrices(productId) : Promise.resolve([])),
    enabled: !!productId,
    staleTime: 2 * 60 * 1000, // 2 minutes - prices can change more frequently
  });
  
  // Store related queries
  const useStores = (nearbyLocation?: {lat: number, lng: number}) => useQuery({
    queryKey: ['stores', nearbyLocation],
    queryFn: () => apiService.getStores(nearbyLocation),
    staleTime: 10 * 60 * 1000, // 10 minutes - stores don't change locations often
  });
  
  const useStoreById = (storeId?: string) => useQuery({
    queryKey: ['store', storeId],
    queryFn: () => (storeId ? apiService.getStoreById(storeId) : Promise.resolve(null)),
    enabled: !!storeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Orders and reviews
  const useUserOrders = (userId?: string) => useQuery({
    queryKey: ['userOrders', userId],
    queryFn: () => (userId ? apiService.getUserOrders(userId) : Promise.resolve([])),
    enabled: !!userId,
    staleTime: 2 * 60 * 1000, // 2 minutes - orders can update frequently
  });
  
  const useProductReviews = (productId?: string) => useQuery({
    queryKey: ['productReviews', productId],
    queryFn: () => (productId ? apiService.getProductReviews(productId) : Promise.resolve([])),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes - reviews don't change often
  });
  
  // Price alerts
  const useUserAlerts = (userId?: string) => useQuery({
    queryKey: ['userAlerts', userId],
    queryFn: () => (userId ? apiService.getUserAlerts(userId) : Promise.resolve([])),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Points and gamification
  const useUserPointsLog = (userId?: string) => useQuery({
    queryKey: ['userPointsLog', userId],
    queryFn: () => (userId ? apiService.getUserPointsLog(userId) : Promise.resolve([])),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  return {
    // User related hooks
    useCurrentUser,
    useUserPoints,
    useUserBadges,
    
    // Product related hooks
    useProducts,
    useProductById,
    useProductPrices,
    
    // Store related hooks
    useStores,
    useStoreById,
    
    // Orders and reviews
    useUserOrders,
    useProductReviews,
    
    // Price alerts
    useUserAlerts,
    
    // Points and gamification
    useUserPointsLog,
  };
};

// Export the query client to be used in the app
export { queryClient };
