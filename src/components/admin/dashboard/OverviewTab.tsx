
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { BarChart } from "lucide-react";

const OverviewTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
          <BarChart className="h-16 w-16 text-muted-foreground" />
          <p className="ml-4 text-muted-foreground">Platform summary data and overview charts would appear here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
