import { Button } from "@/components/ui/button";
import { Product } from "@/types/shop";

interface CartSummaryProps {
  items: (Product & { shopName: string })[];
  onCheckout: () => void;
}

export const CartSummary = ({ items, onCheckout }: CartSummaryProps) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border sticky top-8">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name}</span>
            <span>₹{item.price.toLocaleString()}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>₹{total.toLocaleString()}</span>
        </div>
      </div>
      <Button className="w-full mt-6" onClick={onCheckout}>
        Proceed to Checkout
      </Button>
    </div>
  );
};