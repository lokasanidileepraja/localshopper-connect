import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Filter, Search, AlertCircle, CheckCircle, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function InventoryManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleRestockAlert = () => {
    toast({
      title: "Restock Alert Sent",
      description: "Suppliers have been notified of low inventory items.",
    });
  };
  
  // Mock inventory data
  const inventory = [
    { id: 1, sku: "IP15-256-BLK", name: "iPhone 15", category: "Smartphones", stock: 24, threshold: 15, status: "In Stock" },
    { id: 2, sku: "SG23-256-GRY", name: "Samsung Galaxy S23", category: "Smartphones", stock: 8, threshold: 10, status: "Low Stock" },
    { id: 3, sku: "PS5-1TB-WHT", name: "PlayStation 5", category: "Gaming", stock: 0, threshold: 5, status: "Out of Stock" },
    { id: 4, sku: "MBA-13-M2-256", name: "MacBook Air M2", category: "Laptops", stock: 12, threshold: 8, status: "In Stock" },
    { id: 5, sku: "XBSX-1TB-BLK", name: "Xbox Series X", category: "Gaming", stock: 3, threshold: 5, status: "Low Stock" },
    { id: 6, sku: "OP12-256-BLK", name: "OnePlus 12", category: "Smartphones", stock: 15, threshold: 10, status: "In Stock" },
    { id: 7, sku: "DJI-MINI3", name: "DJI Mini 3 Pro", category: "Drones", stock: 4, threshold: 5, status: "Low Stock" }
  ];
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "In Stock":
        return <Badge className="bg-green-500">In Stock</Badge>;
      case "Low Stock":
        return <Badge variant="secondary" className="bg-yellow-500 text-black">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredInventory = searchTerm ? 
    inventory.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) : inventory;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Real-time Inventory Management</h2>
          <p className="text-muted-foreground">Monitor and manage your product inventory across all locations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button onClick={handleRestockAlert}>
            <AlertCircle className="mr-2 h-4 w-4" />
            Send Restock Alerts
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">23,947</div>
            <p className="text-xs text-muted-foreground">Across 16 categories</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Low Stock Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-yellow-500">43</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-red-500">12</div>
            <p className="text-xs text-muted-foreground">Across 6 categories</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Inventory Status</CardTitle>
          <CardDescription>Monitor and manage your product inventory levels</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by product name, SKU or category..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="low">Low Stock</TabsTrigger>
              <TabsTrigger value="out">Out of Stock</TabsTrigger>
              <TabsTrigger value="in">In Stock</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.length > 0 ? (
                    filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className={item.stock < item.threshold ? "text-yellow-500 font-medium" : ""}>
                          {item.stock} units
                        </TableCell>
                        <TableCell>{item.threshold} units</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Update Stock",
                                description: `Updating inventory for ${item.name}`,
                              });
                            }}>
                              Update
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Order Placed",
                                description: `Restock order placed for ${item.name}`,
                              });
                            }}>
                              Restock
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No inventory items match your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="low">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.filter(item => item.status === "Low Stock").length > 0 ? (
                    filteredInventory.filter(item => item.status === "Low Stock").map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className={item.stock < item.threshold ? "text-yellow-500 font-medium" : ""}>
                          {item.stock} units
                        </TableCell>
                        <TableCell>{item.threshold} units</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Update Stock",
                                description: `Updating inventory for ${item.name}`,
                              });
                            }}>
                              Update
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Order Placed",
                                description: `Restock order placed for ${item.name}`,
                              });
                            }}>
                              Restock
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No inventory items match your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="out">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.filter(item => item.status === "Out of Stock").length > 0 ? (
                    filteredInventory.filter(item => item.status === "Out of Stock").map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className={item.stock < item.threshold ? "text-yellow-500 font-medium" : ""}>
                          {item.stock} units
                        </TableCell>
                        <TableCell>{item.threshold} units</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Update Stock",
                                description: `Updating inventory for ${item.name}`,
                              });
                            }}>
                              Update
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Order Placed",
                                description: `Restock order placed for ${item.name}`,
                              });
                            }}>
                              Restock
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No inventory items match your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="in">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>SKU</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Threshold</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.filter(item => item.status === "In Stock").length > 0 ? (
                    filteredInventory.filter(item => item.status === "In Stock").map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.sku}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className={item.stock < item.threshold ? "text-yellow-500 font-medium" : ""}>
                          {item.stock} units
                        </TableCell>
                        <TableCell>{item.threshold} units</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Update Stock",
                                description: `Updating inventory for ${item.name}`,
                              });
                            }}>
                              Update
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => {
                              toast({
                                title: "Order Placed",
                                description: `Restock order placed for ${item.name}`,
                              });
                            }}>
                              Restock
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        No inventory items match your search
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Warehouse Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Warehouse utilization analytics would appear here</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="mr-2 h-5 w-5" />
              Inventory Forecasting
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Predictive inventory forecasting would appear here</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
