
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

const AdminCatalogHealth = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const runCatalogCheck = () => {
    toast({
      title: "Catalog Check Started",
      description: "The system is now validating catalog health.",
    });
    
    // Simulating a completed check
    setTimeout(() => {
      toast({
        title: "Catalog Check Complete",
        description: "Health check completed. Found 3 issues to resolve.",
      });
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8">
      <Breadcrumbs />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Catalog Health</h1>
        <Button onClick={runCatalogCheck}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Run Health Check
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Product Issues
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              Products with missing information or issues
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Status
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Products with accurate inventory data
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Price Discrepancies
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">17</div>
            <p className="text-xs text-muted-foreground">
              Products with inconsistent pricing
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="issues">Product Issues</TabsTrigger>
          <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
        </TabsList>
        
        <TabsContent value="issues">
          <Card>
            <CardHeader>
              <CardTitle>Product Issues</CardTitle>
              <CardDescription>Products with missing information or validation errors</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Product issues list will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="duplicates">
          <Card>
            <CardHeader>
              <CardTitle>Duplicate Products</CardTitle>
              <CardDescription>Products that appear to be duplicates based on name or specifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Duplicate products list will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Issues</CardTitle>
              <CardDescription>Products with inventory discrepancies or validation issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Inventory issues list will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Issues</CardTitle>
              <CardDescription>Products with inconsistent or problematic pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Pricing issues list will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminCatalogHealth;
