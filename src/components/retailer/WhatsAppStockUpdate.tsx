
import { memo } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppStockUpdateProps {
  storeId: string;
}

export const WhatsAppStockUpdate = memo(({ storeId }: WhatsAppStockUpdateProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground">
          Notify customers about stock updates via WhatsApp
        </p>
        <div className="flex gap-2 items-center">
          <Button variant="default" size="sm" className="gap-1">
            <MessageCircle className="h-4 w-4" />
            Enable WhatsApp Updates
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold">Store ID: {storeId}</span> - Improve customer engagement by notifying them when products are back in stock.
        </p>
      </div>
    </div>
  );
});

WhatsAppStockUpdate.displayName = "WhatsAppStockUpdate";
