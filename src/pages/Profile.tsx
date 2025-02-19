
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/components/profile/UserProfile";
import { OrderHistory } from "@/components/profile/OrderHistory";
import { PaymentMethods } from "@/components/profile/PaymentMethods";
import { AddressManager } from "@/components/profile/AddressManager";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <UserProfile />
        </TabsContent>

        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>

        <TabsContent value="addresses">
          <AddressManager />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentMethods />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
