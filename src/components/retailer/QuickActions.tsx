
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Package, Tag, Bell, MessageSquare } from 'lucide-react';

export const QuickActions = memo(() => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" size="sm" className="justify-start gap-2">
        <PlusCircle className="h-4 w-4" />
        <span>Add Product</span>
      </Button>
      <Button variant="outline" size="sm" className="justify-start gap-2">
        <Package className="h-4 w-4" />
        <span>Manage Inventory</span>
      </Button>
      <Button variant="outline" size="sm" className="justify-start gap-2">
        <Tag className="h-4 w-4" />
        <span>Create Offer</span>
      </Button>
      <Button variant="outline" size="sm" className="justify-start gap-2">
        <Bell className="h-4 w-4" />
        <span>Send Notification</span>
      </Button>
      <Button variant="outline" size="sm" className="justify-start gap-2 col-span-2">
        <MessageSquare className="h-4 w-4" />
        <span>Customer Messages</span>
      </Button>
    </div>
  );
});

QuickActions.displayName = "QuickActions";
