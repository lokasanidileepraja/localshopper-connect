
import { ReactNode } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend: string;
}

const MetricCard = ({ title, value, icon, trend }: MetricCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center">
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        <span className="text-green-500">{trend}</span> from last month
      </p>
    </CardContent>
  </Card>
);

export default MetricCard;
