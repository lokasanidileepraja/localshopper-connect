
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Truck, 
  Store, 
  ShoppingBag,
  Map,
  Settings,
  Clock,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DeliveryOptions = () => {
  const { toast } = useToast();
  
  const handleConfigureOption = (option: string) => {
    toast({
      title: "Configure Delivery",
      description: `Setting up ${option} delivery options`,
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Delivery & Pickup Options</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-xl font-bold">243</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Delivered</p>
              <p className="text-xl font-bold">187</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-yellow-100 p-3 rounded-full">
              <Store className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pickup</p>
              <p className="text-xl font-bold">56</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 flex flex-col">
          <CardContent className="p-4 flex-1">
            <h3 className="font-semibold mb-4">Delivery Options Configuration</h3>
            
            <div className="space-y-4">
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 bg-blue-100 p-2 rounded-full">
                      <Store className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Self-Managed Pickup</h4>
                      <p className="text-sm text-gray-600">Customers collect orders from your store</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    Active
                  </Badge>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => handleConfigureOption("pickup")}>
                    Configure
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 bg-green-100 p-2 rounded-full">
                      <Truck className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">NearMart Delivery Partners</h4>
                      <p className="text-sm text-gray-600">Use the NearMart delivery network</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    Active
                  </Badge>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => handleConfigureOption("nearmart")}>
                    Configure
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3 bg-purple-100 p-2 rounded-full">
                      <Map className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Third-Party Logistics</h4>
                      <p className="text-sm text-gray-600">Connect with external delivery services</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    Inactive
                  </Badge>
                </div>
                <div className="mt-3 flex justify-end">
                  <Button size="sm" variant="outline" onClick={() => handleConfigureOption("third-party")}>
                    Set Up
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex flex-col">
          <CardContent className="p-4 flex-1">
            <h3 className="font-semibold mb-4">Delivery Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">Delivery Radius</p>
                  <p className="text-sm text-gray-600">Maximum distance for delivery</p>
                </div>
                <div>
                  <Badge>5 km</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-t">
                <div>
                  <p className="font-medium">Delivery Fee</p>
                  <p className="text-sm text-gray-600">Charge for delivery service</p>
                </div>
                <div>
                  <Badge>₹40</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-t">
                <div>
                  <p className="font-medium">Free Delivery Above</p>
                  <p className="text-sm text-gray-600">Order value for free delivery</p>
                </div>
                <div>
                  <Badge>₹499</Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-2 border-t">
                <div>
                  <p className="font-medium">Estimated Delivery Time</p>
                  <p className="text-sm text-gray-600">Average delivery duration</p>
                </div>
                <div>
                  <Badge className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    30-45 min
                  </Badge>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-4" variant="outline" onClick={() => handleConfigureOption("settings")}>
              <Settings className="h-4 w-4 mr-1" />
              Edit Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
