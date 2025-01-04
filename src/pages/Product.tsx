import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ProductDetails } from "@/components/product/ProductDetails";
import { StoreInfo } from "@/components/store/StoreInfo";
import { NearbyStoreFinder } from "@/components/store/NearbyStoreFinder";
import { RetailerChat } from "@/components/chat/RetailerChat";
import { PriceAlerts } from "@/components/alerts/PriceAlerts";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { ProductAlerts } from "@/components/ProductAlerts";
import { BulkPurchase } from "@/components/BulkPurchase";

const Product = () => {
  const { productId } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      // Simulated API call
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

  if (isLoading) return <LoadingSpinner />;
  if (!product) return <div>Product not found</div>;

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
            <ProductDetails
              name={product.name}
              specs={product.specs}
              rating={product.rating}
              reviews={product.reviews}
            />
          </div>
        </div>
        <div className="space-y-8">
          <StoreInfo {...product.store} />
          <PriceAlerts
            productName={product.name}
            currentPrice={product.price}
          />
          <ProductAlerts
            productId={product.id}
            inStock={product.inStock}
            currentPrice={product.price}
          />
          <BulkPurchase productId={product.id} basePrice={product.price} />
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <NearbyStoreFinder
          stores={product.nearbyStores}
          onStoreSelect={(storeId) => console.log("Selected store:", storeId)}
        />
        <RetailerChat
          retailerName={product.store.name}
          retailerId={product.id}
        />
        <ProductReviews productId={product.id} />
        <ProductRecommendations currentProductId={product.id} />
      </div>
    </div>
  );
};

export default Product;