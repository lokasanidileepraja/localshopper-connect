
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentReservationsPlaceholder = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reservations</CardTitle>
      </CardHeader>
      <CardContent className="min-h-[200px] flex items-center justify-center">
        <p className="text-muted-foreground">Loading reservation data...</p>
      </CardContent>
    </Card>
  );
};

export default RecentReservationsPlaceholder;
