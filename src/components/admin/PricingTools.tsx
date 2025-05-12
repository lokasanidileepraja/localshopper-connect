import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Percent, TrendingUp, Search, Filter, RefreshCw, ListFilter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function PricingTools() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock pricing recommendations
  const pricingRecommendations = [
    {
      id: "PR-001",
      product: "iPhone 15",
      currentPrice: 79999,
      recommendedPrice: 76999,
      competitorPrice: 78499,
      margin: "18%",
      potentialImpact: "+8% Sales",
      confidence: "High"
    },
    {
      id: "PR-002",
      product: "Samsung Galaxy S23",
      currentPrice: 74999,
      recommendedPrice: 69999,
      competitorPrice: 72499,
      margin: "16%",
      potentialImpact: "+12% Sales",
      confidence: "High"
    },
    {
      id: "PR-003",
      product: "Sony PlayStation 5",
      currentPrice: 49999,
      recommendedPrice: 47999,
      competitorPrice: 48999,
      margin: "14%",
      potentialImpact: "+5% Sales",
      confidence: "Medium"
    },
    {
      id: "PR-004",
      product: "MacBook Air M2",
      currentPrice: 114999,
      recommendedPrice: 109999,
      competitorPrice: 112999,
      margin: "22%",
      potentialImpact: "+7% Sales",
      confidence: "High"
    },
    {
      id: "PR-005",
      product: "OnePlus 12",
      currentPrice: 54999,
      recommendedPrice: 52999,
      competitorPrice: 53999,
      margin: "15%",
      potentialImpact: "+6% Sales",
      confidence: "Medium"
    }
  ];
  
  const getConfidenceBadge = (confidence: string) => {
    switch(confidence) {
      case "High":
        return <Badge className="bg-green-500">High</Badge>;
      case "Medium":
        return <Badge className="bg-yellow-500 text-black">Medium</Badge>;
      case "Low":
        return <Badge variant="secondary">Low</Badge>;
      default:
        return <Badge>{confidence}</Badge>;
    }
  };
  
  const filteredRecommendations = searchTerm ? 
    pricingRecommendations.filter(rec => 
      rec.product.toLowerCase().includes(searchTerm.toLowerCase())
    ) : pricingRecommendations;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Dynamic Pricing Tools</h2>
          <p className="text-muted-foreground">AI-powered pricing optimization and management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            toast({
              title: "Refreshing Recommendations",
              description: "Updating pricing intelligence with latest market data.",
            });
          }}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
          <Button onClick={() => {
            toast({
              title: "Batch Processing",
              description: "Applying recommended prices to selected products.",
            });
          }}>
            Apply Selected
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pricing Health Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-green-500">87/100</div>
            <p className="text-xs flex items-center">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              +5 points from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Price Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">New suggestions ready</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Potential Revenue Impact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-green-500">+₹2.8M</div>
            <p className="text-xs text-muted-foreground">Estimated monthly gain</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Market Position</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">Competitive</div>
            <p className="text-xs text-muted-foreground">2.4% below market average</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="recommendations">
        <TabsList>
          <TabsTrigger value="recommendations">Price Recommendations</TabsTrigger>
          <TabsTrigger value="elasticity">Price Elasticity</TabsTrigger>
          <TabsTrigger value="competitor">Competitor Analysis</TabsTrigger>
          <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Price Recommendations</CardTitle>
              <CardDescription>Smart pricing suggestions based on market data and business goals</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ListFilter className="h-4 w-4 mr-1" />
                    Sort
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Showing {filteredRecommendations.length} of {pricingRecommendations.length} recommendations
                </div>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Current Price</TableHead>
                    <TableHead>Recommended</TableHead>
                    <TableHead>Competitor Price</TableHead>
                    <TableHead>Margin</TableHead>
                    <TableHead>Potential Impact</TableHead>
                    <TableHead>Confidence</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecommendations.map((rec) => (
                    <TableRow key={rec.id}>
                      <TableCell className="font-medium">{rec.product}</TableCell>
                      <TableCell>₹{rec.currentPrice.toLocaleString()}</TableCell>
                      <TableCell className={rec.recommendedPrice < rec.currentPrice ? "text-red-500" : "text-green-500"}>
                        ₹{rec.recommendedPrice.toLocaleString()}
                      </TableCell>
                      <TableCell>₹{rec.competitorPrice.toLocaleString()}</TableCell>
                      <TableCell>{rec.margin}</TableCell>
                      <TableCell className="text-green-500">{rec.potentialImpact}</TableCell>
                      <TableCell>{getConfidenceBadge(rec.confidence)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => {
                            toast({
                              title: "View Details",
                              description: `Viewing pricing details for ${rec.product}`,
                            });
                          }}>
                            Details
                          </Button>
                          <Button size="sm" onClick={() => {
                            toast({
                              title: "Price Applied",
                              description: `New price for ${rec.product} has been applied`,
                            });
                          }}>
                            Apply
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="elasticity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Elasticity Analysis</CardTitle>
              <CardDescription>Understand how price changes impact demand</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md">
              <div className="text-muted-foreground">Price elasticity visualization would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="competitor" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
              <CardDescription>Track competitor pricing and promotions</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md">
              <div className="text-muted-foreground">Competitor pricing data and analysis would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Rules</CardTitle>
              <CardDescription>Set automated pricing rules based on market conditions</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md">
              <div className="text-muted-foreground">Automated pricing rules configuration interface would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5" />
              Price Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Price trend analysis chart would appear here</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Percent className="mr-2 h-5 w-5" />
              Markdown Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Markdown impact analysis would appear here</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
