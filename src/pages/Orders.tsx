import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock } from "lucide-react";

const Orders = () => {
  const orders = [
    {
      id: "ORD001",
      date: "2024-03-15",
      status: "Delivered",
      total: 799.99,
      items: [
        { name: "iPhone 15", quantity: 1, price: 799.99 }
      ]
    },
    {
      id: "ORD002",
      date: "2024-03-10",
      status: "Processing",
      total: 1299.99,
      items: [
        { name: "MacBook Air M2", quantity: 1, price: 1299.99 }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order #{order.id}
                </div>
                <Badge variant={order.status === "Delivered" ? "default" : "secondary"}>
                  {order.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  {order.date}
                </div>
                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-medium">₹{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 flex justify-between items-center">
                  <p className="font-medium">Total</p>
                  <p className="font-bold text-lg">₹{order.total.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;