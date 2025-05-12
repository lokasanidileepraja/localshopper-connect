import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Search, FileText, CheckCircle, AlertTriangle, Package, Settings, Star, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function VendorManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock vendors data
  const vendors = [
    {
      id: "VEN-1001",
      name: "TechDistribute Inc.",
      category: "Electronics",
      products: 245,
      performance: 92,
      onTimeDelivery: "98%",
      qualityScore: "A",
      status: "Active",
      lastDelivery: "2023-09-12"
    },
    {
      id: "VEN-1002",
      name: "MobileTech Solutions",
      category: "Smartphones",
      products: 128,
      performance: 86,
      onTimeDelivery: "94%",
      qualityScore: "A",
      status: "Active",
      lastDelivery: "2023-09-14"
    },
    {
      id: "VEN-1003",
      name: "Digital Accessories Co.",
      category: "Accessories",
      products: 512,
      performance: 78,
      onTimeDelivery: "89%",
      qualityScore: "B",
      status: "Active",
      lastDelivery: "2023-09-10"
    },
    {
      id: "VEN-1004",
      name: "Laptop World",
      category: "Computers",
      products: 98,
      performance: 91,
      onTimeDelivery: "96%",
      qualityScore: "A",
      status: "Active",
      lastDelivery: "2023-09-15"
    },
    {
      id: "VEN-1005",
      name: "Audio Experts Ltd.",
      category: "Audio",
      products: 87,
      performance: 84,
      onTimeDelivery: "92%",
      qualityScore: "B",
      status: "Warning",
      lastDelivery: "2023-09-08"
    }
  ];
  
  const getPerformanceBadge = (score: number) => {
    if (score >= 90) return <Badge className="bg-green-500">{score}%</Badge>;
    if (score >= 80) return <Badge className="bg-yellow-500 text-black">{score}%</Badge>;
    if (score >= 70) return <Badge className="bg-orange-500">{score}%</Badge>;
    return <Badge variant="destructive">{score}%</Badge>;
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Active":
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Active</Badge>;
      case "Warning":
        return <Badge className="bg-yellow-500 text-black"><AlertTriangle className="mr-1 h-3 w-3" /> Warning</Badge>;
      case "Suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredVendors = searchTerm ? 
    vendors.filter(vendor => 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) : vendors;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Vendor Management Optimization</h2>
          <p className="text-muted-foreground">Streamline supplier relationships and performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => {
            toast({
              title: "Generate Report",
              description: "Creating vendor performance report",
            });
          }}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button onClick={() => {
            toast({
              title: "Add Vendor",
              description: "New vendor onboarding process initiated",
            });
          }}>
            <Truck className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Vendors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground">Across 12 categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Fulfillment Time</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-green-500">2.3 days</div>
            <p className="text-xs text-muted-foreground">-0.5 days from last quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">37</div>
            <p className="text-xs text-muted-foreground">All on schedule</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quality Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-yellow-500">12</div>
            <p className="text-xs text-muted-foreground">Pending resolution</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="vendors">
        <TabsList>
          <TabsTrigger value="vendors">Vendor Directory</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="contracts">Contracts & SLAs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vendors" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Management</CardTitle>
              <CardDescription>Manage and optimize your supplier network</CardDescription>
              <div className="mt-4 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search vendors by name or category..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>On-Time Delivery</TableHead>
                    <TableHead>Quality</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.length > 0 ? (
                    filteredVendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.name}</TableCell>
                        <TableCell>{vendor.category}</TableCell>
                        <TableCell>{vendor.products}</TableCell>
                        <TableCell>{getPerformanceBadge(vendor.performance)}</TableCell>
                        <TableCell>{vendor.onTimeDelivery}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {vendor.qualityScore}
                            {vendor.qualityScore === 'A' && (
                              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(vendor.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Vendor Profile",
                                description: `Viewing profile for ${vendor.name}`,
                              });
                            }}>
                              Details
                            </Button>
                            <Button size="sm" onClick={() => {
                              toast({
                                title: "Create Order",
                                description: `Creating new purchase order for ${vendor.name}`,
                              });
                            }}>
                              Order
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No vendors match your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Vendor Performance Analysis</CardTitle>
              <CardDescription>Detailed metrics for supplier management</CardDescription>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center bg-muted/50 rounded-md">
              <div className="text-muted-foreground">Vendor performance analytics would appear here</div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tab contents would be similar, with different visualizations and data */}
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Inventory Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Inventory forecasting visualization would appear here</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Vendor Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Vendor comparison chart would appear here</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
