import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserSearch, Users, Heart, Download, Calendar, ShoppingBag, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CustomerInsights() {
  const { toast } = useToast();
  
  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Customer data is being prepared for download.",
    });
  };
  
  // Mock customer segments
  const customerSegments = [
    {
      id: "SEG-001",
      name: "High-Value Shoppers",
      count: 452,
      avgValue: 15200,
      retention: "87%",
      growth: "+12%"
    },
    {
      id: "SEG-002",
      name: "Tech Enthusiasts",
      count: 1245,
      avgValue: 8750,
      retention: "78%",
      growth: "+24%"
    },
    {
      id: "SEG-003",
      name: "Budget Buyers",
      count: 2870,
      avgValue: 2100,
      retention: "45%",
      growth: "+8%"
    },
    {
      id: "SEG-004",
      name: "One-Time Shoppers",
      count: 5120,
      avgValue: 1500,
      retention: "22%",
      growth: "-3%"
    },
    {
      id: "SEG-005",
      name: "Returning Customers",
      count: 3680,
      avgValue: 4500,
      retention: "72%",
      growth: "+15%"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Advanced Customer Insights</h2>
          <p className="text-muted-foreground">Deep analytics on customer behavior and patterns</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            toast({
              title: "AI Analysis",
              description: "Starting AI-powered customer behavior analysis",
            });
          }}>
            <UserSearch className="mr-2 h-4 w-4" />
            AI Analysis
          </Button>
          <Button onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">14,583</div>
            <p className="text-xs flex items-center text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12% from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lifetime Value (Avg.)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">₹8,240</div>
            <p className="text-xs flex items-center text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +7.5% from last year
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Retention Rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs flex items-center text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +5% from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Orders/Customer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">3.2</div>
            <p className="text-xs flex items-center text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +0.4 from last quarter
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="segments">
        <TabsList>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="behavior">Shopping Behavior</TabsTrigger>
          <TabsTrigger value="journey">Customer Journey</TabsTrigger>
          <TabsTrigger value="loyalty">Loyalty Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="segments" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Segments</CardTitle>
              <CardDescription>AI-generated customer groupings based on behavior</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment Name</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead>Avg. Order Value</TableHead>
                    <TableHead>Retention Rate</TableHead>
                    <TableHead>Growth</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customerSegments.map((segment) => (
                    <TableRow key={segment.id}>
                      <TableCell className="font-medium">{segment.name}</TableCell>
                      <TableCell>{segment.count.toLocaleString()}</TableCell>
                      <TableCell>₹{segment.avgValue.toLocaleString()}</TableCell>
                      <TableCell>{segment.retention}</TableCell>
                      <TableCell 
                        className={segment.growth.startsWith('+') ? 'text-green-500' : 'text-red-500'}
                      >
                        {segment.growth}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => {
                            toast({
                              title: "Customer Segment",
                              description: `Viewing details for ${segment.name} segment`,
                            });
                          }}>
                            Details
                          </Button>
                          <Button size="sm" onClick={() => {
                            toast({
                              title: "Campaign Created",
                              description: `New campaign targeted at ${segment.name} segment`,
                            });
                          }}>
                            Target
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Segment Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                <div className="text-muted-foreground">Segment distribution pie chart would appear here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Segment Growth</CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
                <div className="text-muted-foreground">Segment growth trend chart would appear here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="behavior" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Shopping Behavior Analysis</CardTitle>
              <CardDescription>Customer purchasing patterns and preferences</CardDescription>
            </CardHeader>
            <CardContent className="h-96 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold mb-2">Popular Product Combinations</h3>
                <div className="flex-1 bg-muted/50 rounded-md flex items-center justify-center">
                  <div className="text-muted-foreground">Product affinity chart would appear here</div>
                </div>
              </div>
              <div className="flex flex-col h-full">
                <h3 className="text-lg font-semibold mb-2">Shopping Time Distribution</h3>
                <div className="flex-1 bg-muted/50 rounded-md flex items-center justify-center">
                  <div className="text-muted-foreground">Daily shopping pattern graph would appear here</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="journey" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Journey Analysis</CardTitle>
              <CardDescription>Visualize customer touchpoints and conversion paths</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md">
              <div className="text-muted-foreground">Customer journey visualization would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loyalty" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Loyalty Program Analysis</CardTitle>
              <CardDescription>Metrics and engagement for loyalty programs</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md">
              <div className="text-muted-foreground">Loyalty program performance metrics would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Customer Lifecycle
            </CardTitle>
          </CardHeader>
          <CardContent className="h-60 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Customer lifecycle visualization would appear here</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Purchase Frequency
            </CardTitle>
          </CardHeader>
          <CardContent className="h-60 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Purchase frequency distribution would appear here</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5" />
              Brand Loyalty
            </CardTitle>
          </CardHeader>
          <CardContent className="h-60 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Brand loyalty metrics would appear here</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
