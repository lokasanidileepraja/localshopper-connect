
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
  const handleFastReserve = () => {
    // Simulate 1-click fast reserve (minimal info, quick confirmation)
    setIsDialogOpen(false);
    window.setTimeout(() => {
      alert("Fast Reserve Complete! We'll text you soon.");
    }, 500);
  };
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          className="w-full rounded-full shadow-lg" 
          variant="outline"
          disabled={!inStock}
        >
          <Clock className="mr-2 h-4 w-4" />
          Reserve for Pickup (₹99)
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Reserve for Pickup
          </DialogTitle>
        </DialogHeader>
        <ReservationForm
          productName={productName}
          storeName={storeName}
          storeAddress={storeAddress}
          storePhone={storePhone}
          productPrice={price}
          productImage={productImage}
        />
        <div className="flex flex-col gap-2 mt-3">
          <Button
            variant="ghost"
            className="text-xs text-primary"
            onClick={handleFastReserve}
            aria-label="1-Click Fast Reserve"
          >
            Fast Reserve & Pay (auto-detect info)
          </Button>
          <span className="text-xs text-muted-foreground text-center">
            Fast Reserve uses your saved mobile for quickest pickup, <br/> or fill the form for customized pickup.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
