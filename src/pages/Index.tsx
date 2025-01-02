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
  // Mock data and handlers for demonstration
  const mockShopData = {
    currentShop: "TechHub Electronics",
    price: 79999,
    otherShops: ELECTRONICS_SHOPS.filter(shop => shop.name !== "TechHub Electronics"),
    productModel: "iPhone 15",
    onShopSelect: (shopName: string, price: number) => {
      console.log(`Selected shop: ${shopName} with price: ${price}`);
    }
  };

  const mockPriceData = {
    shops: ELECTRONICS_SHOPS,
    models: ["iPhone 15", "Galaxy S23"],
    selectedModel: null,
    onModelSelect: (model: string) => {
      console.log(`Selected model: ${model}`);
    }
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
        <ShopComparison {...mockShopData} />
        <PriceComparison {...mockPriceData} />
        <BulkPurchase productId="iphone-15" basePrice={79999} />
        <ProductAlerts productId="iphone-15" inStock={true} currentPrice={79999} />
        <ProductRecommendations currentProductId="iphone-15" />
      </div>
    </div>
  );
};

export default Index;