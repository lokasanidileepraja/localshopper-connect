import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const StoreLocator = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nearby Tech Stores</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
          Map Component Placeholder
        </div>
      </CardContent>
    </Card>
  );
};