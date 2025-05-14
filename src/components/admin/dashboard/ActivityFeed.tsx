
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ShoppingBag, DollarSign, Flag } from "lucide-react";
import ActivityItem from "./ActivityItem";

const ActivityFeed = () => {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Real-time Activity</CardTitle>
        <CardDescription>Live platform interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <ActivityItem 
            icon={<Users className="h-4 w-4 text-green-600" />}
            iconBg="bg-green-100"
            title="User Registration"
            description="New user from Mumbai, India"
            time="2 mins ago"
          />
          
          <ActivityItem 
            icon={<ShoppingBag className="h-4 w-4 text-blue-600" />}
            iconBg="bg-blue-100"
            title="Product Added"
            description="New product: Samsung Galaxy S25"
            time="5 mins ago"
          />
          
          <ActivityItem 
            icon={<DollarSign className="h-4 w-4 text-purple-600" />}
            iconBg="bg-purple-100"
            title="Order Processed"
            description="Order #12489 - ₹5,999 - Pune"
            time="12 mins ago"
          />
          
          <ActivityItem 
            icon={<Flag className="h-4 w-4 text-yellow-600" />}
            iconBg="bg-yellow-100"
            title="Report Generated"
            description="Weekly sales report - Q2 2023"
            time="25 mins ago"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
