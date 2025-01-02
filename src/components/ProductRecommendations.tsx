import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";

export const ProductRecommendations = () => {
  const { toast } = useToast();
  const [recommendations, setRecommendations] = React.useState([]);

  React.useEffect(() => {
    toast({
      title: "Coming Soon",
      description: "Product recommendations will be available soon!",
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Recommended Products</h2>
        <p className="text-gray-500">Products you might like</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Sparkles className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No recommendations available yet</p>
        </div>
      ) : null}
    </div>
  );
};