
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SalesChartPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <p>Sales chart will be displayed here.</p>
      </CardContent>
    </Card>
  );
};

export default SalesChartPlaceholder;
