
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RetailerOverviewPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retailer Dashboard Overview</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading dashboard overview data...</p>
      </CardContent>
    </Card>
  );
};

export default RetailerOverviewPlaceholder;
