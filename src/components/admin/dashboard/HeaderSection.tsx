
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { memo, useCallback } from "react";

const HeaderSection = memo(() => {
  const { toast } = useToast();
  
  // Memoize event handlers
  const handleAlertClick = useCallback(() => {
    toast({
      title: "System Alerts",
      description: "You have 3 unread system alerts that require attention.",
    });
  }, [toast]);
  
  const handleRefreshClick = useCallback(() => {
    toast({
      title: "Refresh Data",
      description: "Dashboard data has been refreshed.",
    });
  }, [toast]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive platform management and analytics</p>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button 
          variant="outline" 
          onClick={handleRefreshClick}
          className="flex items-center gap-2"
        >
          <Activity className="h-4 w-4" />
          Refresh Data
        </Button>
        <Button 
          onClick={handleAlertClick}
          className="flex items-center gap-2"
        >
          <Bell className="h-4 w-4" />
          Alerts
          <Badge className="ml-1 bg-red-500" variant="secondary">3</Badge>
        </Button>
      </div>
    </div>
  );
});

HeaderSection.displayName = 'HeaderSection';

export default HeaderSection;
