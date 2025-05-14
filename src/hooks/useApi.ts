
import { useQuery, useMutation, QueryClient, UseQueryOptions } from '@tanstack/react-query';
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

// Create a singleton query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1, // Reduce retry attempts
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection time (replaces cacheTime)
      refetchOnMount: false, // Prevent automatic refetching
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
    refetchOnMount: false,
  });
  
  const useUserPoints = (userId?: string) => useQuery({
    queryKey: ['userPoints', userId],
    queryFn: () => (userId ? apiService.getUserPoints(userId) : Promise.resolve(0)),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
  });
  
  const useUserBadges = (userId?: string) => useQuery({
    queryKey: ['userBadges', userId],
    queryFn: () => (userId ? apiService.getUserBadges(userId) : Promise.resolve([])),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes - badges don't change often
    refetchOnMount: false,
  });
  
  // Product related queries with aggressive caching
  const useProducts = (category?: string) => useQuery({
    queryKey: ['products', category],
    queryFn: () => apiService.getProducts(category),
    staleTime: 10 * 60 * 1000, // 10 minutes - product data doesn't change often
    refetchOnMount: false,
    gcTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });
  
  const useProductById = (productId?: string) => useQuery({
    queryKey: ['product', productId],
    queryFn: () => (productId ? apiService.getProductById(productId) : Promise.resolve(null)),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: false,
  });
  
  const useProductPrices = (productId?: string) => useQuery({
    queryKey: ['productPrices', productId],
    queryFn: () => (productId ? apiService.getProductPrices(productId) : Promise.resolve([])),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes - prices can change more frequently
    refetchOnMount: false,
  });
  
  // Store related queries
  const useStores = (nearbyLocation?: {lat: number, lng: number}) => useQuery({
    queryKey: ['stores', nearbyLocation ? `${nearbyLocation.lat.toFixed(2)}_${nearbyLocation.lng.toFixed(2)}` : 'all'],
    queryFn: () => apiService.getStores(nearbyLocation),
    staleTime: 10 * 60 * 1000, // 10 minutes - stores don't change locations often
    refetchOnMount: false,
  });
  
  const useStoreById = (storeId?: string) => useQuery({
    queryKey: ['store', storeId],
    queryFn: () => (storeId ? apiService.getStoreById(storeId) : Promise.resolve(null)),
    enabled: !!storeId,
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: false,
  });
  
  // Orders and reviews with more appropriate caching
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
    refetchOnMount: false,
  });
  
  // Price alerts with improved caching
  const useUserAlerts = (userId?: string) => useQuery({
    queryKey: ['userAlerts', userId],
    queryFn: () => (userId ? apiService.getUserAlerts(userId) : Promise.resolve([])),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
  });
  
  // Points and gamification
  const useUserPointsLog = (userId?: string) => useQuery({
    queryKey: ['userPointsLog', userId],
    queryFn: () => (userId ? apiService.getUserPointsLog(userId) : Promise.resolve([])),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: false,
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
