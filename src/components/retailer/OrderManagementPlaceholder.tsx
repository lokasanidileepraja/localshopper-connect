
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderManagementPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading order data...</p>
      </CardContent>
    </Card>
  );
};

export default OrderManagementPlaceholder;
