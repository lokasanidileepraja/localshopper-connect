import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  RefreshCcw, 
  AlertTriangle, 
  Box, 
  TrendingDown, 
  TrendingUp,
  BarChart2,
  FilePlus,
  Smartphone,
  Cable,
  Share2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const InventoryTracking = () => {
  const { toast } = useToast();
  
  const handleUpdateStock = (id: string) => {
    toast({
      title: "Update Stock",
      description: `Opening stock update form for product ID: ${id}`,
    });
  };

  const handleSyncInventory = () => {
    toast({
      title: "Sync Inventory",
      description: "Synchronizing inventory with distributor systems...",
    });
  };

  const handleAIRecommendation = () => {
    toast({
      title: "AI Stock Recommendations",
      description: "Generating AI-powered inventory insights...",
    });
  };

  const handleWhatsAppUpdate = () => {
    toast({
      title: "WhatsApp Updates",
      description: "Configuring WhatsApp for inventory notifications...",
    });
  };

  // Sample inventory data
  const inventory = [
    { 
      id: "1", 
      name: "Samsung Galaxy S23", 
      stock: 12, 
      threshold: 5, 
      trend: "up",
      status: "healthy"
    },
    { 
      id: "2", 
      name: "Apple Macbook Air M2", 
      stock: 3, 
      threshold: 5, 
      trend: "down",
      status: "low"
    },
    { 
      id: "3", 
      name: "Sony WH-1000XM5", 
      stock: 8, 
      threshold: 5, 
      trend: "stable",
      status: "healthy"
    },
    {
      id: "4",
      name: "Apple iPhone 15 Pro",
      stock: 1,
      threshold: 5,
      trend: "down",
      status: "critical"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search inventory..." className="pl-10" />
        </div>
        <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm" onClick={handleSyncInventory}>
            <RefreshCcw className="h-4 w-4 mr-1" />
            Sync
          </Button>
          <Button variant="outline" size="sm" onClick={handleAIRecommendation}>
            <BarChart2 className="h-4 w-4 mr-1" />
            AI Insights
          </Button>
          <Button size="sm" onClick={handleWhatsAppUpdate}>
            <Smartphone className="h-4 w-4 mr-1" />
            WhatsApp Update
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-yellow-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-xl font-bold">3</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-red-100 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <p className="text-xl font-bold">1</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <Box className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-xl font-bold">143</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="border rounded-md">
        <div className="flex items-center justify-between p-4 border-b bg-gray-50">
          <div className="font-medium">Inventory Status</div>
          <Button variant="outline" size="sm">
            <FilePlus className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
        {inventory.map((item, index) => (
          <div 
            key={item.id} 
            className={`flex items-center p-4 ${index !== inventory.length - 1 ? 'border-b' : ''}`}
          >
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{item.name}</p>
              <div className="flex items-center mt-1">
                <Badge 
                  variant={
                    item.status === "healthy" ? "default" : 
                    item.status === "low" ? "secondary" : "destructive"
                  }
                  className="mr-2"
                >
                  {item.stock} in stock
                </Badge>
                {item.trend === "up" && <TrendingUp className="h-4 w-4 text-green-500" />}
                {item.trend === "down" && <TrendingDown className="h-4 w-4 text-red-500" />}
                {item.trend === "stable" && <span className="text-xs text-gray-500">Stable</span>}
              </div>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleUpdateStock(item.id)}
            >
              Update Stock
            </Button>
          </div>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Inventory Management Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center mb-3">
                <Share2 className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">Distributor Sync</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Connect with your distributors for automatic inventory updates
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={handleSyncInventory}>
                Connect Distributor
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center mb-3">
                <Smartphone className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">WhatsApp Updates</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Send and receive inventory updates via WhatsApp
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={handleWhatsAppUpdate}>
                Setup WhatsApp
              </Button>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center mb-3">
                <BarChart2 className="h-5 w-5 text-primary mr-2" />
                <h4 className="font-medium">AI Stock Recommendations</h4>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Get AI-powered recommendations for optimal inventory levels
              </p>
              <Button size="sm" variant="outline" className="w-full" onClick={handleAIRecommendation}>
                View Recommendations
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
