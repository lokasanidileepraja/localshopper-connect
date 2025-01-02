import React from "react";
import { useToast } from "@/components/ui/use-toast";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProductAlerts = () => {
  const { toast } = useToast();

  const handleSetAlert = () => {
    toast({
      title: "Coming Soon",
      description: "Product alerts will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Product Alerts</h2>
        <p className="text-gray-500">Get notified about product updates</p>
      </div>

      <Button onClick={handleSetAlert}>
        <Bell className="h-4 w-4 mr-2" />
        Set Price Alert
      </Button>
    </div>
  );
};