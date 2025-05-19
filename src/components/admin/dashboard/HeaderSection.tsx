
import { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarRange, Users, Package, Activity } from 'lucide-react';

const HeaderSection = () => {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground mt-1">
        Overview of your application's performance and usage.
      </p>
    </div>
  );
};

export default memo(HeaderSection);
