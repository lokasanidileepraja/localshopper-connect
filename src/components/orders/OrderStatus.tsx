
import { cn } from "@/lib/utils";

interface OrderStatusProps {
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  className?: string;
}

export const OrderStatus = ({ status, className }: OrderStatusProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case "Pending":
        return { bg: "bg-yellow-100", text: "text-yellow-800" };
      case "Processing":
        return { bg: "bg-blue-100", text: "text-blue-800" };
      case "Shipped":
        return { bg: "bg-purple-100", text: "text-purple-800" };
      case "Delivered":
        return { bg: "bg-green-100", text: "text-green-800" };
      case "Cancelled":
        return { bg: "bg-red-100", text: "text-red-800" };
      default:
        return { bg: "bg-gray-100", text: "text-gray-800" };
    }
  };

  const { bg, text } = getStatusConfig();

  return (
    <span 
      className={cn(
        "inline-block px-2 py-1 text-xs font-medium rounded-full",
        bg,
        text,
        className
      )}
    >
      {status}
    </span>
  );
};
