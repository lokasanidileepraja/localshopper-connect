
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CellSignalFull, AlertTriangle, PackageCheck } from "lucide-react";

const mockInventoryData = [
  {
    category: "Mobile Phones",
    stock: 65,
    total: 100,
    status: "healthy"
  },
  {
    category: "Laptops",
    stock: 12,
    total: 35,
    status: "warning"
  },
  {
    category: "Accessories",
    stock: 85,
    total: 200,
    status: "healthy"
  },
  {
    category: "Tablets",
    stock: 3,
    total: 30,
    status: "critical"
  }
];

export const InventorySummary = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockInventoryData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{item.category}</span>
                <Badge variant={
                  item.status === "healthy" ? "outline" :
                  item.status === "warning" ? "default" : "destructive"
                }>
                  {item.stock}/{item.total}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={(item.stock / item.total) * 100} className="h-2" />
                {item.status === "healthy" && <CellSignalFull className="h-4 w-4 text-green-500" />}
                {item.status === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                {item.status === "critical" && <AlertTriangle className="h-4 w-4 text-red-500" />}
              </div>
            </div>
          ))}
          
          <div className="pt-2 mt-2 border-t text-center">
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
              <PackageCheck className="h-4 w-4" />
              <span>Total items in stock: 165</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
