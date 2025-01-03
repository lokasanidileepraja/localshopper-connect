import { Truck, Package, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ShippingInfoProps {
  estimatedDelivery: string;
  shippingCost: number;
}

export const ShippingInfo = ({ estimatedDelivery, shippingCost }: ShippingInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <Truck className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold mb-1">Free Shipping</h3>
            <p className="text-sm text-gray-600">
              {shippingCost === 0
                ? "Eligible for free shipping"
                : `Shipping cost: ₹${shippingCost}`}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Clock className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold mb-1">Estimated Delivery</h3>
            <p className="text-sm text-gray-600">{estimatedDelivery}</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Package className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold mb-1">Order Tracking</h3>
            <p className="text-sm text-gray-600">
              Track your order status in real-time
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};