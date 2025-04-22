
import { Check, Package, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderTimelineProps {
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

export const OrderTimeline = ({ status, date }: OrderTimelineProps) => {
  const orderDate = new Date(date);
  
  // Set up timeline data based on current status
  const timelineItems = [
    {
      title: "Order Placed",
      description: `${orderDate.toLocaleDateString()}`,
      icon: Check,
      active: true,
      completed: true,
    },
    {
      title: "Processing",
      description: status === "Pending" ? "Waiting for processing" : "Order prepared for shipping",
      icon: Package,
      active: ["Processing", "Shipped", "Delivered"].includes(status),
      completed: ["Processing", "Shipped", "Delivered"].includes(status),
    },
    {
      title: "Shipped",
      description: status === "Shipped" ? "Your order is on the way" : 
                  status === "Delivered" ? "Delivered to carrier" : "Not shipped yet",
      icon: Truck,
      active: ["Shipped", "Delivered"].includes(status),
      completed: ["Shipped", "Delivered"].includes(status),
    },
    {
      title: "Delivered",
      description: status === "Delivered" ? 
                  `Delivered on ${new Date(Date.now() - 86400000).toLocaleDateString()}` : 
                  "Not delivered yet",
      icon: Check,
      active: status === "Delivered",
      completed: status === "Delivered",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute left-5 top-0 h-full w-0.5 bg-gray-200"></div>
      
      <div className="space-y-8">
        {timelineItems.map((item, index) => (
          <div key={index} className="relative">
            <div className={cn(
              "flex items-center mb-1",
              item.active ? "opacity-100" : "opacity-60"
            )}>
              <div className={cn(
                "z-10 flex items-center justify-center w-10 h-10 rounded-full",
                item.completed ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              <div className="ml-4">
                <h3 className={cn(
                  "text-base font-medium",
                  item.active ? "text-gray-900" : "text-gray-500"
                )}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
