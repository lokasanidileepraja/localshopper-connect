
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

// Initialize a query client
const queryClient = new QueryClient();

export const useApi = () => {
  const { toast } = useToast();
  
  // User related queries
  const useCurrentUser = () => useQuery({
    queryKey: ['currentUser'],
    queryFn: () => apiService.getCurrentUser(),
  });
  
  const useUserPoints = (userId?: string) => useQuery({
    queryKey: ['userPoints', userId],
    queryFn: () => (userId ? apiService.getUserPoints(userId) : Promise.resolve(0)),
    enabled: !!userId
  });
  
  const useUserBadges = (userId?: string) => useQuery({
    queryKey: ['userBadges', userId],
    queryFn: () => (userId ? apiService.getUserBadges(userId) : Promise.resolve([])),
    enabled: !!userId
  });
  
  // Product related queries
  const useProducts = (category?: string) => useQuery({
    queryKey: ['products', category],
    queryFn: () => apiService.getProducts(category),
  });
  
  const useProductById = (productId?: string) => useQuery({
    queryKey: ['product', productId],
    queryFn: () => (productId ? apiService.getProductById(productId) : Promise.resolve(null)),
    enabled: !!productId
  });
  
  const useProductPrices = (productId?: string) => useQuery({
    queryKey: ['productPrices', productId],
    queryFn: () => (productId ? apiService.getProductPrices(productId) : Promise.resolve([])),
    enabled: !!productId
  });
  
  // Store related queries
  const useStores = (nearbyLocation?: {lat: number, lng: number}) => useQuery({
    queryKey: ['stores', nearbyLocation],
    queryFn: () => apiService.getStores(nearbyLocation),
  });
  
  const useStoreById = (storeId?: string) => useQuery({
    queryKey: ['store', storeId],
    queryFn: () => (storeId ? apiService.getStoreById(storeId) : Promise.resolve(null)),
    enabled: !!storeId
  });
  
  // Orders and reviews
  const useUserOrders = (userId?: string) => useQuery({
    queryKey: ['userOrders', userId],
    queryFn: () => (userId ? apiService.getUserOrders(userId) : Promise.resolve([])),
    enabled: !!userId
  });
  
  const useProductReviews = (productId?: string) => useQuery({
    queryKey: ['productReviews', productId],
    queryFn: () => (productId ? apiService.getProductReviews(productId) : Promise.resolve([])),
    enabled: !!productId
  });
  
  // Price alerts
  const useUserAlerts = (userId?: string) => useQuery({
    queryKey: ['userAlerts', userId],
    queryFn: () => (userId ? apiService.getUserAlerts(userId) : Promise.resolve([])),
    enabled: !!userId
  });
  
  // Points and gamification
  const useUserPointsLog = (userId?: string) => useQuery({
    queryKey: ['userPointsLog', userId],
    queryFn: () => (userId ? apiService.getUserPointsLog(userId) : Promise.resolve([])),
    enabled: !!userId
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
