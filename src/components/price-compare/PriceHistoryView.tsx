
import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PriceHistoryViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const PriceHistoryView = ({ searchQuery, filters }: PriceHistoryViewProps) => {
  // Mock data for price history
  const priceHistory = [
    { date: "Jan", price: 79999 },
    { date: "Feb", price: 77999 },
    { date: "Mar", price: 76999 },
    { date: "Apr", price: 78999 },
    { date: "May", price: 75999 },
    { date: "Jun", price: 74999 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#2563eb"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
