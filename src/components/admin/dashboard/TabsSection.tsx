
import { memo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TabsSection = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Summary of key metrics and performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>View a high-level summary of your application's performance and user engagement.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>
              Detailed analytics and engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>View detailed analytics about user behavior and engagement patterns.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="reports">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
            <CardDescription>
              Generate and download custom reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Create custom reports based on various metrics and download them in different formats.</p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage system notifications and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Configure and manage notifications for different events and user actions.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default memo(TabsSection);
