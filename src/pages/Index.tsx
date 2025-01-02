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

const Index = () => {
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
        <ShopComparison />
        <PriceComparison />
        <BulkPurchase />
        <ProductAlerts />
        <ProductRecommendations />
      </div>
    </div>
  );
};

export default Index;