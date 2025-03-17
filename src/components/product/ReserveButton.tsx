
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReservationForm } from "@/components/reservation/ReservationForm";

interface ReserveButtonProps {
  productId: string;
  productName: string;
  storeName: string;
  storeAddress: string;
  storePhone: string;
  price: number;
  productImage?: string;
  inStock: boolean;
}

export const ReserveButton = ({
  productId,
  productName,
  storeName,
  storeAddress,
  storePhone,
  price,
  productImage,
  inStock,
}: ReserveButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full" 
          variant="outline"
          disabled={!inStock}
        >
          <Clock className="mr-2 h-4 w-4" />
          Reserve for Pickup (₹99)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reserve for Pickup</DialogTitle>
        </DialogHeader>
        <ReservationForm
          productName={productName}
          storeName={storeName}
          storeAddress={storeAddress}
          storePhone={storePhone}
          productPrice={price}
          productImage={productImage}
        />
      </DialogContent>
    </Dialog>
  );
};
