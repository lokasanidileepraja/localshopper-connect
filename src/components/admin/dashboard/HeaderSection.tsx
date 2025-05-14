
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HeaderSection = () => {
  const { toast } = useToast();
  
  const handleAlertClick = () => {
    toast({
      title: "System Alerts",
      description: "You have 3 unread system alerts that require attention.",
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Comprehensive platform management and analytics</p>
      </div>
      <div className="flex gap-2 mt-4 md:mt-0">
        <Button variant="outline" onClick={() => toast({
          title: "Refresh Data",
          description: "Dashboard data has been refreshed.",
        })}>
          <Activity className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
        <Button onClick={handleAlertClick}>
          <Bell className="mr-2 h-4 w-4" />
          Alerts
          <Badge className="ml-2 bg-red-500" variant="secondary">3</Badge>
        </Button>
      </div>
    </div>
  );
};

export default HeaderSection;
