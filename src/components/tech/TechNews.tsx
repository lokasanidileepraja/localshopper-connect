import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TechNews = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Tech News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">New iPhone Launch Event</h3>
            <p className="text-sm text-gray-600">Coming to local stores next week</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Tech Expo 2024</h3>
            <p className="text-sm text-gray-600">Visit our booth at the city convention center</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};