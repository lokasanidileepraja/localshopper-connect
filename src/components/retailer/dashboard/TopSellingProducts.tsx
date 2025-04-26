
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

interface Product {
  name: string;
  qty: number;
  revenue: number;
}

interface TopSellingProductsProps {
  products: Product[];
}

export const TopSellingProducts = ({ products }: TopSellingProductsProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5" />
          Top Selling Products
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <span className="font-medium">{product.name}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Units Sold</p>
                  <p className="font-medium">{product.qty}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="font-medium">₹{product.revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
