import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { ShopList } from "@/components/ShopList";
import { AuthForm } from "@/components/auth/AuthForm";
import { UserProfile } from "@/components/profile/UserProfile";
import { AddressManager } from "@/components/profile/AddressManager";
import { PaymentMethods } from "@/components/profile/PaymentMethods";
import { OrderHistory } from "@/components/profile/OrderHistory";
import { ShopComparison } from "@/components/ShopComparison";
import { PriceComparison } from "@/components/PriceComparison";
import { BulkPurchase } from "@/components/BulkPurchase";
import { ProductAlerts } from "@/components/ProductAlerts";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { ELECTRONICS_SHOPS } from "@/data/shops";

const Index = () => {
  // Mock data for ShopComparison
  const shopComparisonProps = {
    currentShop: "TechHub Electronics",
    price: 79999,
    otherShops: ELECTRONICS_SHOPS.filter(shop => shop.name !== "TechHub Electronics"),
    productModel: "iPhone 15",
    onShopSelect: (shopName: string, price: number) => {
      console.log(`Selected shop: ${shopName} with price: ${price}`);
    }
  };

  // Mock data for PriceComparison
  const priceComparisonProps = {
    shops: ELECTRONICS_SHOPS,
    models: ["iPhone 15", "Galaxy S23", "MacBook Air M2", "AirPods Pro 2nd Gen"],
    selectedModel: "iPhone 15",
    onModelSelect: (model: string) => {
      console.log(`Selected model: ${model}`);
    }
  };

  // Mock data for BulkPurchase
  const bulkPurchaseProps = {
    productId: "1", // iPhone 15 ID from the mock data
    basePrice: 79999
  };

  // Mock data for ProductAlerts
  const productAlertsProps = {
    productId: "1",
    inStock: true,
    currentPrice: 79999
  };

  // Mock data for ProductRecommendations
  const productRecommendationsProps = {
    currentProductId: "1"
  };

  return (
    <div className="min-h-screen space-y-8">
      <Hero />
      <SearchBar />
      <ShopList />
      <div className="container mx-auto px-4 space-y-8">
        <AuthForm />
        <UserProfile />
        <AddressManager />
        <PaymentMethods />
        <OrderHistory />
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Compare Shops</h2>
            <ShopComparison {...shopComparisonProps} />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">Compare Prices</h2>
            <PriceComparison {...priceComparisonProps} />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">Bulk Purchase Options</h2>
            <BulkPurchase {...bulkPurchaseProps} />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">Product Alerts</h2>
            <ProductAlerts {...productAlertsProps} />
          </section>
          
          <section>
            <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
            <ProductRecommendations {...productRecommendationsProps} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Index;