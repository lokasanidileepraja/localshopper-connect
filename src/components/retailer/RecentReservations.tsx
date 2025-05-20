
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockReservations = [
  {
    id: "res001",
    customer: "Amit Singh",
    product: "Samsung Galaxy S23",
    time: "Today, 10:30 AM",
    status: "pending"
  },
  {
    id: "res002",
    customer: "Priya Sharma",
    product: "Apple iPhone 15",
    time: "Today, 9:15 AM",
    status: "pending"
  },
  {
    id: "res003",
    customer: "Rahul Patel",
    product: "OnePlus 12",
    time: "Yesterday, 4:45 PM",
    status: "completed"
  },
  {
    id: "res004",
    customer: "Neha Gupta",
    product: "MacBook Air M2",
    time: "Yesterday, 2:20 PM",
    status: "cancelled"
  }
];

export const RecentReservations = () => {
  const { toast } = useToast();
  
  const handleAccept = (id: string, customer: string) => {
    toast({
      title: "Reservation Accepted",
      description: `You've accepted ${customer}'s reservation`,
    });
  };
  
  const handleReject = (id: string, customer: string) => {
    toast({
      title: "Reservation Rejected",
      description: `You've rejected ${customer}'s reservation`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Reservations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockReservations.map((reservation) => (
            <div key={reservation.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{reservation.customer}</span>
                  <Badge variant={
                    reservation.status === "pending" ? "default" :
                    reservation.status === "completed" ? "outline" : "destructive"
                  }>
                    {reservation.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{reservation.product}</p>
                <p className="text-xs text-muted-foreground">{reservation.time}</p>
              </div>
              
              {reservation.status === "pending" && (
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleAccept(reservation.id, reservation.customer)}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleReject(reservation.id, reservation.customer)}
                  >
                    <XCircle className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
