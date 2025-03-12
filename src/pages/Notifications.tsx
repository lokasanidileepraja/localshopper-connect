
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bell, ShoppingBag, Tag, AlertTriangle, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Sample notification data
const SAMPLE_NOTIFICATIONS = [
  {
    id: "1",
    type: "price_drop",
    title: "Price Drop Alert",
    message: "iPhone 15 price has dropped by ₹5,000",
    date: "2 hours ago",
    read: false,
    actionUrl: "/product/1"
  },
  {
    id: "2",
    type: "order",
    title: "Order Shipped",
    message: "Your order #12345 has been shipped",
    date: "1 day ago",
    read: true,
    actionUrl: "/orders"
  },
  {
    id: "3",
    type: "promotion",
    title: "Weekend Sale",
    message: "Get 20% off on all accessories this weekend",
    date: "3 days ago",
    read: false,
    actionUrl: "/category/accessories"
  },
  {
    id: "4",
    type: "stock",
    title: "Back in Stock",
    message: "MacBook Air M2 is now back in stock",
    date: "5 days ago",
    read: true,
    actionUrl: "/product/2"
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(SAMPLE_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "Notifications marked as read",
      description: "All notifications have been marked as read"
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    toast({
      title: "Notification removed",
      description: "The notification has been deleted"
    });
  };

  const getFilteredNotifications = () => {
    if (activeTab === "all") return notifications;
    if (activeTab === "unread") return notifications.filter(n => !n.read);
    return notifications.filter(n => n.type === activeTab);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "price_drop":
        return <Tag className="h-5 w-5 text-green-500" />;
      case "order":
        return <ShoppingBag className="h-5 w-5 text-blue-500" />;
      case "stock":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Bell className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground">
              {unreadCount > 0 
                ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` 
                : 'You have no unread notifications'}
            </p>
          </div>
          
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:w-auto">
            <TabsTrigger value="all">
              All
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="price_drop">Price</TabsTrigger>
            <TabsTrigger value="order">Orders</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {getFilteredNotifications().length > 0 ? (
              <div className="space-y-4">
                {getFilteredNotifications().map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={notification.read ? "opacity-75" : "border-l-4 border-l-primary"}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              {getIcon(notification.type)}
                            </div>
                            <div onClick={() => markAsRead(notification.id)} className="cursor-pointer flex-1">
                              <h3 className="font-semibold flex items-center gap-2">
                                {notification.title}
                                {!notification.read && (
                                  <span className="w-2 h-2 rounded-full bg-primary" />
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteNotification(notification.id)} 
                            className="h-8 w-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 border rounded-lg bg-muted/10">
                <Bell className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No notifications</h3>
                <p className="text-muted-foreground">
                  {activeTab === "all" 
                    ? "You don't have any notifications yet" 
                    : "You don't have any notifications in this category"}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Notifications;
