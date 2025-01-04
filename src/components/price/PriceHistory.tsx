import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2024-01', price: 79999 },
  { date: '2024-02', price: 78999 },
  { date: '2024-03', price: 77999 },
  { date: '2024-04', price: 81999 },
];

export const PriceHistory = () => {
  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Price History</h2>
      <Card className="p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};