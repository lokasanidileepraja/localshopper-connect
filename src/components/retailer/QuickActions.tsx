
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, RefreshCw, Tag, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const QuickActions = () => {
  const { toast } = useToast();
  
  const handleAction = (action: string) => {
    toast({
      title: `${action} Action`,
      description: `${action} action initiated successfully`,
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            className="flex flex-col h-auto py-4 justify-center"
            onClick={() => handleAction("Update Stock")}
          >
            <Package className="h-4 w-4 mb-2" />
            <span className="text-xs">Update Stock</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col h-auto py-4 justify-center"
            onClick={() => handleAction("Update Prices")}
          >
            <Tag className="h-4 w-4 mb-2" />
            <span className="text-xs">Update Prices</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col h-auto py-4 justify-center"
            onClick={() => handleAction("View Orders")}
          >
            <RefreshCw className="h-4 w-4 mb-2" />
            <span className="text-xs">View Orders</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="flex flex-col h-auto py-4 justify-center"
            onClick={() => handleAction("Send Alert")}
          >
            <Bell className="h-4 w-4 mb-2" />
            <span className="text-xs">Send Alert</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
