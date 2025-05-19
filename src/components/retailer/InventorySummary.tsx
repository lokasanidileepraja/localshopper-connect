
import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertCircle, ShoppingBag } from 'lucide-react';

export const InventorySummary = memo(() => {
  const categories = [
    { name: 'Smartphones', inStock: 45, total: 50, low: false },
    { name: 'Laptops', inStock: 12, total: 30, low: false },
    { name: 'Accessories', inStock: 120, total: 200, low: false },
    { name: 'Tablets', inStock: 5, total: 25, low: true },
  ];

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-sm">{category.name}</span>
            <span className="text-xs text-muted-foreground">{category.inStock}/{category.total} items</span>
          </div>
          <Progress value={(category.inStock / category.total) * 100} />
          {category.low && (
            <div className="flex items-center gap-1 text-amber-600 text-xs">
              <AlertCircle className="h-3 w-3" />
              <span>Low stock - Reorder soon</span>
            </div>
          )}
        </div>
      ))}
      <Button variant="outline" size="sm" className="w-full mt-4">
        <ShoppingBag className="h-4 w-4 mr-2" />
        View Full Inventory
      </Button>
    </div>
  );
});

InventorySummary.displayName = "InventorySummary";
