import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Target, Layers, Filter, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function GeoTargeting() {
  const { toast } = useToast();
  
  const handleCreateCampaign = () => {
    toast({
      title: "New Campaign",
      description: "Creating a new geotargeted marketing campaign",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Geo-Targeting Hub</h2>
          <p className="text-muted-foreground">Location-based operations and marketing control center</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button onClick={handleCreateCampaign}>
            <Target className="mr-2 h-4 w-4" />
            Create Campaign
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Markets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Cities across India</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Live Campaigns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Across 12 regions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Top Market</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">Mumbai</div>
            <p className="text-xs text-green-500">28% of revenue</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fastest Growing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">Pune</div>
            <p className="text-xs text-green-500">+42% this quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Local Partners</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">Local retailers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Delivery Coverage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">Urban areas</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Market Performance Map</CardTitle>
          <CardDescription>Geographic distribution of sales and engagement</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96 relative">
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <Button variant="outline" size="sm">
                <Layers className="mr-2 h-4 w-4" />
                Layers
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <div className="h-full w-full bg-muted/50 flex items-center justify-center">
              <MapPin className="h-12 w-12 text-muted-foreground" />
              <div className="ml-4 text-muted-foreground">Interactive geospatial map would appear here</div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="markets">
        <TabsList>
          <TabsTrigger value="markets">Markets</TabsTrigger>
          <TabsTrigger value="campaigns">Geo Campaigns</TabsTrigger>
          <TabsTrigger value="insights">Regional Insights</TabsTrigger>
          <TabsTrigger value="partners">Local Partners</TabsTrigger>
        </TabsList>
        
        <TabsContent value="markets" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mumbai Market Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Mumbai
                  </CardTitle>
                  <Badge className="bg-green-500">Top Market</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Revenue:</span>
                  <span className="font-medium">₹12.4M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Users:</span>
                  <span className="font-medium">45,240</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Growth:</span>
                  <span className="font-medium text-green-500">+18% YOY</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Retail Partners:</span>
                  <span className="font-medium">32</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => {
                    toast({
                      title: "Market Details",
                      description: "Viewing detailed analytics for Mumbai market",
                    });
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
            
            {/* Delhi Market Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Delhi NCR
                  </CardTitle>
                  <Badge variant="outline">Major Market</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Revenue:</span>
                  <span className="font-medium">₹10.2M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Users:</span>
                  <span className="font-medium">38,750</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Growth:</span>
                  <span className="font-medium text-green-500">+14% YOY</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Retail Partners:</span>
                  <span className="font-medium">28</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Market Details",
                      description: "Viewing detailed analytics for Delhi NCR market",
                    });
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
            
            {/* Bangalore Market Card */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4" />
                    Bangalore
                  </CardTitle>
                  <Badge variant="outline">Major Market</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Revenue:</span>
                  <span className="font-medium">₹8.7M</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Users:</span>
                  <span className="font-medium">32,480</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Growth:</span>
                  <span className="font-medium text-green-500">+22% YOY</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Retail Partners:</span>
                  <span className="font-medium">24</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    toast({
                      title: "Market Details",
                      description: "Viewing detailed analytics for Bangalore market",
                    });
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button 
              variant="outline"
              onClick={() => {
                toast({
                  title: "All Markets",
                  description: "Viewing all available markets",
                });
              }}
            >
              <Globe className="mr-2 h-4 w-4" />
              View All Markets
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Geo-Targeted Campaigns</CardTitle>
              <CardDescription>Location-specific marketing initiatives and performance</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md">
              <div className="text-muted-foreground">Geo-targeted campaign management interface would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tab contents would be similar, with different visualizations and data */}
      </Tabs>
    </div>
  );
}
