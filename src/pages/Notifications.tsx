import { useState } from "react";
import { Bell, Package, CreditCard, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Notifications = () => {
  const [notifications] = useState([
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #1234 has been shipped",
      icon: Package,
      date: "2024-02-20",
      read: false,
    },
    {
      id: 2,
      title: "Payment Successful",
      message: "Payment for order #1234 was successful",
      icon: CreditCard,
      date: "2024-02-19",
      read: true,
    },
    {
      id: 3,
      title: "Price Drop Alert",
      message: "A product in your wishlist is now on sale",
      icon: AlertTriangle,
      date: "2024-02-18",
      read: false,
    },
  ]);

  const { toast } = useToast();

  const handleMarkAllRead = () => {
    toast({
      title: "All notifications marked as read",
      description: "Your notifications have been updated",
    });
  };

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Notifications</h1>
        <Button variant="outline" onClick={handleMarkAllRead}>
          Mark all as read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No notifications</h2>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-600">{notification.message}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(notification.date).toLocaleDateString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;