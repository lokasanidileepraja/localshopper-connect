import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { MapPin } from "lucide-react";

export const AddressManager = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = React.useState([]);

  const handleAddAddress = () => {
    toast({
      title: "Coming Soon",
      description: "Address management will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">My Addresses</h2>
          <p className="text-gray-500">Manage your delivery addresses</p>
        </div>
        <Button onClick={handleAddAddress}>
          <MapPin className="h-4 w-4 mr-2" />
          Add New Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <MapPin className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No addresses added yet</p>
        </div>
      ) : null}
    </div>
  );
};