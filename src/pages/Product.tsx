import React, { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { Skeleton } from "@/components/ui/skeleton";

// Import components with correct export handling
const ProductDetails = lazy(() => import("@/components/product/ProductDetails").then(module => ({ default: module.ProductDetails || (() => <div>Product Details</div>) })));
const StoreInfo = lazy(() => import("@/components/store/StoreInfo").then(module => ({ default: module.StoreInfo || (() => <div>Store Info</div>) })));
const NearbyStoreFinder = lazy(() => import("@/components/store/NearbyStoreFinder").then(module => ({ default: module.NearbyStoreFinder || (() => <div>Nearby Store Finder</div>) })));
const RetailerChat = lazy(() => import("@/components/chat/RetailerChat").then(module => ({ default: module.RetailerChat || (() => <div>Retailer Chat</div>) })));
const PriceAlerts = lazy(() => import("@/components/alerts/PriceAlerts").then(module => ({ default: module.PriceAlerts || (() => <div>Price Alerts</div>) })));
const ProductReviews = lazy(() => import("@/components/ProductReviews").then(module => ({ default: module.ProductReviews || (() => <div>Product Reviews</div>) })));
const ProductRecommendations = lazy(() => import("@/components/ProductRecommendations").then(module => ({ default: module.ProductRecommendations || (() => <div>Product Recommendations</div>) })));
const ProductAlerts = lazy(() => import("@/components/ProductAlerts").then(module => ({ default: module.ProductAlerts || (() => <div>Product Alerts</div>) })));
const BulkPurchase = lazy(() => import("@/components/BulkPurchase").then(module => ({ default: module.BulkPurchase || (() => <div>Bulk Purchase</div>) })));

const ComponentLoader = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<Skeleton className="h-32 w-full rounded-md" />}>
    {children}
  </Suspense>
);

const Product = () => {
  const { productId } = useParams<{ productId: string }>();

  // Use React Query for data fetching with loading state
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      // Simulated API call - replace with your actual API call
      return Promise.resolve({
        id: productId,
        name: "iPhone 15",
        price: 79999,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
        specs: [
          { key: "Storage", value: "128GB", tooltip: "Built-in storage capacity" },
          { key: "Color", value: "Midnight", tooltip: "Device color" },
          { key: "Screen", value: "6.1-inch", tooltip: "Super Retina XDR display" },
          { key: "Camera", value: "48MP", tooltip: "Main camera resolution" }
        ],
        rating: 4.8,
        reviews: 128,
        store: {
          id: "store123",
          name: "TechHub Electronics",
          address: "123 Tech Street, Digital City",
          phone: "+91 98765 43210",
          hours: "10:00 AM - 9:00 PM",
          rating: 4.5,
          isOpen: true
        },
        nearbyStores: [
          {
            id: "store1",
            name: "Digital World",
            distance: "1.2 km",
            address: "456 Gadget Road, Tech Park"
          },
          {
            id: "store2",
            name: "Gadget Galaxy",
            distance: "2.5 km",
            address: "789 Electronics Ave, Innovation Hub"
          }
        ]
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <p className="text-muted-foreground mt-2">The requested product could not be found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg object-cover"
          />
          <div className="mt-8">
            <ErrorBoundary>
              <ComponentLoader>
                <ProductDetails
                  name={product.name}
                  specs={product.specs}
                  rating={product.rating}
                  reviews={product.reviews}
                />
              </ComponentLoader>
            </ErrorBoundary>
          </div>
        </div>
        <div className="space-y-8">
          <ErrorBoundary>
            <ComponentLoader>
              <StoreInfo {...product.store} />
            </ComponentLoader>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <ComponentLoader>
              <PriceAlerts
                productName={product.name}
                currentPrice={product.price}
              />
            </ComponentLoader>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <ComponentLoader>
              <ProductAlerts
                productId={product.id}
                inStock={product.inStock}
                currentPrice={product.price}
              />
            </ComponentLoader>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <ComponentLoader>
              <BulkPurchase productId={product.id} basePrice={product.price} />
            </ComponentLoader>
          </ErrorBoundary>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <ErrorBoundary>
          <ComponentLoader>
            <NearbyStoreFinder
              stores={product.nearbyStores}
              onStoreSelect={(storeId) => console.log("Selected store:", storeId)}
            />
          </ComponentLoader>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ComponentLoader>
            <RetailerChat
              retailerName={product.store.name}
              retailerId={product.store.id}
            />
          </ComponentLoader>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ComponentLoader>
            <ProductReviews productId={product.id} />
          </ComponentLoader>
        </ErrorBoundary>
        
        <ErrorBoundary>
          <ComponentLoader>
            <ProductRecommendations currentProductId={product.id} />
          </ComponentLoader>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Product;
