import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard } from "lucide-react";

export const PaymentMethods = () => {
  const { toast } = useToast();
  const [paymentMethods, setPaymentMethods] = React.useState([]);

  const handleAddPayment = () => {
    toast({
      title: "Coming Soon",
      description: "Payment method management will be available soon!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Payment Methods</h2>
          <p className="text-gray-500">Manage your payment options</p>
        </div>
        <Button onClick={handleAddPayment}>
          <CreditCard className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {paymentMethods.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <CreditCard className="h-12 w-12 mx-auto text-gray-400" />
          <p className="mt-2 text-gray-500">No payment methods added yet</p>
        </div>
      ) : null}
    </div>
  );
};
