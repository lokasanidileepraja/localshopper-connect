
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";
import { storage } from "@/lib/storage";
import { formatCurrency } from "@/lib/formatters";
import { OrderStatus } from "@/components/orders/OrderStatus";
import { EmptyState } from "@/components/common/EmptyState";
import { Separator } from "@/components/ui/separator";

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  date: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  total: number;
  items: OrderItem[];
  trackingNumber?: string;
  address?: string;
}

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Get orders from storage or initialize with mock data
    const storedOrders = storage.get<Order[]>("orders");
    if (storedOrders && storedOrders.length > 0) {
      setOrders(storedOrders);
    } else {
      // Mock orders for demo
      const mockOrders: Order[] = [
        {
          id: "ORD-1234",
          date: "2023-04-15",
          status: "Delivered",
          total: 79999,
          items: [
            {
              id: "1",
              name: "iPhone 15",
              quantity: 1,
              price: 79999,
              image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
            },
          ],
          trackingNumber: "TRK123456789",
          address: "123 Main St, Bangalore, Karnataka, 560001"
        },
        {
          id: "ORD-5678",
          date: "2023-04-10",
          status: "Shipped",
          total: 45000,
          items: [
            {
              id: "2",
              name: "Samsung Galaxy Watch",
              quantity: 1,
              price: 25000,
              image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12"
            },
            {
              id: "3",
              name: "Wireless Earbuds",
              quantity: 1,
              price: 20000,
              image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
            }
          ],
          trackingNumber: "TRK987654321",
          address: "456 Market St, Mumbai, Maharashtra, 400001"
        }
      ];
      setOrders(mockOrders);
      storage.set("orders", mockOrders);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold">My Orders</h1>
        <div className="w-24"></div> {/* Balance the header */}
      </div>

      <Separator className="mb-6" />

      {orders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders yet"
          description="Start shopping to see your orders here"
          actionText="Start Shopping"
          actionHref="/"
        />
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatCurrency(order.total)}</p>
                    <OrderStatus status={order.status} />
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  {order.items.slice(0, 2).map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <p className="text-sm text-gray-500">
                      +{order.items.length - 2} more items
                    </p>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  View Order Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
