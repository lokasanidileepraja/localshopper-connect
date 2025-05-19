
import { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    month: 'Jan',
    sales: 4000,
  },
  {
    month: 'Feb',
    sales: 3000,
  },
  {
    month: 'Mar',
    sales: 5000,
  },
  {
    month: 'Apr',
    sales: 2780,
  },
  {
    month: 'May',
    sales: 1890,
  },
  {
    month: 'Jun',
    sales: 2390,
  },
  {
    month: 'Jul',
    sales: 3490,
  },
];

export const SalesChart = memo(() => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

SalesChart.displayName = "SalesChart";
