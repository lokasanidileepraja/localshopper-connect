
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface Reservation {
  id: string;
  product: string;
  customer: string;
  time: string;
  status: 'pending' | 'completed' | 'cancelled';
}

interface RecentReservationsProps {
  reservations: Reservation[];
}

export const DashboardReservations = ({ reservations }: RecentReservationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Recent Reservations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="flex items-center justify-between p-2 border rounded-lg">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{reservation.product}</span>
                  <Badge variant={
                    reservation.status === "pending" ? "default" :
                    reservation.status === "completed" ? "outline" : "destructive"
                  }>
                    {reservation.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {reservation.customer} • {reservation.time}
                </p>
              </div>
              <Button variant="ghost" size="sm">Details</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
