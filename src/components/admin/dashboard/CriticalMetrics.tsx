
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CriticalMetrics = () => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Critical Metrics</CardTitle>
        <CardDescription>Real-time platform health</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">System Uptime</span>
            <Badge className="bg-green-500">99.98%</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Database Performance</span>
            <Badge className="bg-green-500">Optimal</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">API Response Time</span>
            <Badge className="bg-yellow-500">142ms</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Failed Transactions</span>
            <Badge variant="destructive">3 Today</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Active Support Cases</span>
            <Badge variant="outline">12</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CriticalMetrics;
