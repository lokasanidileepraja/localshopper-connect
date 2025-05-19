
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const InventorySummaryPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Summary</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading inventory data...</p>
      </CardContent>
    </Card>
  );
};

export default InventorySummaryPlaceholder;
