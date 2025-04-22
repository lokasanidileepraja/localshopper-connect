
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WhatsAppStockUpdate } from "@/components/retailer/WhatsAppStockUpdate";
import { DeliveryOptions } from "@/components/retailer/DeliveryOptions";
import { PaymentManagement } from "@/components/retailer/PaymentManagement";
import { UserAccessControl } from "@/components/retailer/UserAccessControl";

const RetailerSettings = () => {
  // Mock store ID for the retailer
  const mockStoreId = "store123";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Store Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <WhatsAppStockUpdate storeId={mockStoreId} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentManagement />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Options</CardTitle>
            </CardHeader>
            <CardContent>
              <DeliveryOptions />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <UserAccessControl />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RetailerSettings;
