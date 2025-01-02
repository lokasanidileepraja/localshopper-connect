import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Scale } from "lucide-react";

export const ShopComparison = () => {
  const { toast } = useToast();
  const [comparisons, setComparisons] = React.useState([]);

  React.useEffect(() => {
    toast({
      title: "Coming Soon",
      description: "Shop comparison will be available soon!",
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Shop Comparison</h2>
        <p className="text-gray-500">Compare prices across different shops</p>
      </div>

      {comparisons.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Scale className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No comparisons available yet</p>
        </div>
      ) : null}
    </div>
  );
};