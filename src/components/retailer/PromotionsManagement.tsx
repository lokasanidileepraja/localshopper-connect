
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tag, 
  CalendarDays, 
  Percent, 
  TrendingUp,
  Plus,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PromotionsManagement = () => {
  const { toast } = useToast();
  
  // Sample promotions data
  const promotions = [
    { 
      id: "1", 
      name: "Summer Sale", 
      discount: "20% off",
      type: "Storewide",
      start: "2023-09-01",
      end: "2023-09-30",
      status: "active"
    },
    { 
      id: "2", 
      name: "New User Special", 
      discount: "₹500 off",
      type: "First Order",
      start: "2023-08-15",
      end: "2023-12-31",
      status: "active"
    },
    { 
      id: "3", 
      name: "Clearance", 
      discount: "Up to 50% off",
      type: "Selected Items",
      start: "2023-09-10",
      end: "2023-09-20",
      status: "upcoming"
    },
    { 
      id: "4", 
      name: "Festival Offer", 
      discount: "10% off",
      type: "Electronics",
      start: "2023-08-01",
      end: "2023-09-10",
      status: "expired"
    }
  ];

  const handleCreatePromotion = () => {
    toast({
      title: "Create Promotion",
      description: "Opening the promotion creation form",
    });
  };

  const handlePromotionClick = (id: string) => {
    toast({
      title: "View Promotion",
      description: `Viewing details for promotion ID: ${id}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Promotions & Offers</h2>
        <Button onClick={handleCreatePromotion}>
          <Plus className="h-4 w-4 mr-1" />
          Create Promotion
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <Tag className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Promotions</p>
              <p className="text-xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <CalendarDays className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming</p>
              <p className="text-xl font-bold">1</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-purple-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Sales Increase</p>
              <p className="text-xl font-bold">18%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promotions.map((promo) => (
          <Card 
            key={promo.id} 
            className="cursor-pointer hover:border-primary transition-colors"
            onClick={() => handlePromotionClick(promo.id)}
          >
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{promo.name}</h3>
                <Badge 
                  variant={
                    promo.status === "active" ? "default" : 
                    promo.status === "upcoming" ? "secondary" : "outline"
                  }
                  className="capitalize"
                >
                  {promo.status}
                </Badge>
              </div>
              <div className="flex items-center mb-2">
                <Percent className="h-4 w-4 text-primary mr-1" />
                <span className="font-medium">{promo.discount}</span>
                <span className="text-sm text-gray-500 ml-2">on {promo.type}</span>
              </div>
              <div className="text-sm text-gray-600">
                {new Date(promo.start).toLocaleDateString()} - {new Date(promo.end).toLocaleDateString()}
              </div>
              <div className="mt-3 flex justify-end">
                <Button variant="ghost" size="sm">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        <Card className="flex items-center justify-center h-full min-h-[150px] border-dashed">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center">
            <Button 
              variant="ghost" 
              className="rounded-full h-12 w-12 mb-2" 
              onClick={handleCreatePromotion}
            >
              <Plus className="h-6 w-6" />
            </Button>
            <p className="text-sm font-medium">Create New Promotion</p>
            <p className="text-xs text-gray-500">Set up discounts, offers, and featured listings</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Featured Listing Opportunities</h3>
          <p className="text-sm text-gray-600 mb-4">
            Boost your visibility and increase sales by featuring your products in prime positions
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-1">Homepage Spotlight</h4>
              <p className="text-sm text-gray-600 mb-2">Feature your products on the homepage</p>
              <p className="font-bold text-primary mb-3">₹499/week</p>
              <Button size="sm" variant="outline" className="w-full">Select</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-1">Category Top Results</h4>
              <p className="text-sm text-gray-600 mb-2">Appear at the top of your category</p>
              <p className="font-bold text-primary mb-3">₹349/week</p>
              <Button size="sm" variant="outline" className="w-full">Select</Button>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-1">Deal of the Day</h4>
              <p className="text-sm text-gray-600 mb-2">Featured as the daily special offer</p>
              <p className="font-bold text-primary mb-3">₹999/day</p>
              <Button size="sm" variant="outline" className="w-full">Select</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
