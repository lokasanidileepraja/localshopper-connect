import { UserProfile } from "@/components/profile/UserProfile";
import { AddressManager } from "@/components/profile/AddressManager";
import { PaymentMethods } from "@/components/profile/PaymentMethods";
import { OrderHistory } from "@/components/profile/OrderHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="payments">Payment Methods</TabsTrigger>
          <TabsTrigger value="orders">Order History</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <UserProfile />
        </TabsContent>
        <TabsContent value="addresses">
          <AddressManager />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentMethods />
        </TabsContent>
        <TabsContent value="orders">
          <OrderHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;