
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Box, MapPin, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { storage } from "@/lib/storage";
import { formatCurrency } from "@/lib/formatters";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { OrderTimeline } from "@/components/orders/OrderTimeline";
import { Order } from "./Orders";
import { EmptyState } from "@/components/common/EmptyState";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = () => {
      const allOrders = storage.get<Order[]>("orders") || [];
      const foundOrder = allOrders.find(o => o.id === orderId);
      setOrder(foundOrder || null);
      setLoading(false);
    };

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6" onClick={() => navigate('/orders')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
        
        <EmptyState
          icon={Box}
          title="Order not found"
          description="We couldn't find the order you were looking for"
          actionText="View All Orders"
          actionHref="/orders"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate('/orders')}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Orders
      </Button>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
        </div>
        <OrderStatus status={order.status} className="mt-2 md:mt-0" />
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-4">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded-md"
                        />
                      )}
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Included</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mt-8 mb-4">Order Timeline</h2>
          <OrderTimeline status={order.status} date={order.date} />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">Delivery Address</h3>
                  <p className="text-gray-600">{order.address || "No address provided"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {order.trackingNumber && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Truck className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">Tracking Number</h3>
                    <p className="text-gray-600">{order.trackingNumber}</p>
                    <Button variant="link" className="p-0 h-auto mt-1 text-primary" size="sm">
                      Track Package
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-medium mb-3">Need Help?</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full">Contact Support</Button>
                <Button variant="outline" className="w-full">Return Items</Button>
                <Button variant="outline" className="w-full">Download Invoice</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
