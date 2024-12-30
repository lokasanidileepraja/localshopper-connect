import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { ShopList } from "@/components/ShopList";
import { AuthForm } from "@/components/auth/AuthForm";
import { UserProfile } from "@/components/profile/UserProfile";
import { AddressManager } from "@/components/profile/AddressManager";
import { PaymentMethods } from "@/components/profile/PaymentMethods";
import { OrderHistory } from "@/components/profile/OrderHistory";

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
      </div>
    </div>
  );
};

export default Index;