import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { DollarSign } from "lucide-react";

export const PriceComparison = () => {
  const { toast } = useToast();
  const [prices, setPrices] = React.useState([]);

  React.useEffect(() => {
    toast({
      title: "Coming Soon",
      description: "Price comparison will be available soon!",
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Price Comparison</h2>
        <p className="text-gray-500">Compare prices for this product</p>
      </div>

      {prices.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <DollarSign className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No price comparisons available yet</p>
        </div>
      ) : null}
    </div>
  );
};