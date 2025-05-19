
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Reservation = {
  id: string;
  customer: string;
  product: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
};

const reservations: Reservation[] = [
  { id: 'RSV-001', customer: 'John Doe', product: 'iPhone 15 Pro', date: '2025-05-18', status: 'pending' },
  { id: 'RSV-002', customer: 'Jane Smith', product: 'Samsung Galaxy S25', date: '2025-05-17', status: 'completed' },
  { id: 'RSV-003', customer: 'Mike Johnson', product: 'Google Pixel 9', date: '2025-05-16', status: 'cancelled' },
];

export const RecentReservations = memo(() => {
  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-700 border-yellow-200">
          <Clock className="h-3 w-3 mr-1" /> Pending
        </Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
          <Check className="h-3 w-3 mr-1" /> Completed
        </Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">
          <X className="h-3 w-3 mr-1" /> Cancelled
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <div key={reservation.id} className="border rounded-lg p-3 flex flex-col sm:flex-row justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{reservation.product}</span>
              {getStatusBadge(reservation.status)}
            </div>
            <div className="text-sm text-muted-foreground">
              <span>Customer: {reservation.customer}</span> • <span>ID: {reservation.id}</span>
            </div>
          </div>
          <div className="flex gap-2 items-center self-end sm:self-center">
            <span className="text-xs text-muted-foreground">{reservation.date}</span>
            <Button size="sm" variant="outline">View Details</Button>
          </div>
        </div>
      ))}
      {reservations.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">
          No recent reservations found
        </div>
      )}
    </div>
  );
});

RecentReservations.displayName = "RecentReservations";
