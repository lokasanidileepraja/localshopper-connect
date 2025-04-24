
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useNavigate } from "react-router-dom";

const AdminUserFeedback = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8">
      <Breadcrumbs />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Feedback</h1>
        <Button 
          onClick={() => {
            toast({
              title: "Report Generated",
              description: "User feedback report has been generated successfully.",
            });
          }}
        >
          Generate Report
        </Button>
      </div>
      
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="reviews">Product Reviews</TabsTrigger>
          <TabsTrigger value="store">Store Ratings</TabsTrigger>
          <TabsTrigger value="surveys">Survey Results</TabsTrigger>
          <TabsTrigger value="trends">Feedback Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Product Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Analyze customer reviews and ratings for products across the platform.
              </p>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Product review analytics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="store">
          <Card>
            <CardHeader>
              <CardTitle>Store Ratings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View and analyze customer ratings and feedback for stores.
              </p>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Store rating analytics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="surveys">
          <Card>
            <CardHeader>
              <CardTitle>Survey Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Results from customer satisfaction surveys and feedback forms.
              </p>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Survey results will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Analyze trends and patterns in customer feedback over time.
              </p>
              <div className="bg-secondary/20 p-6 rounded-lg text-center">
                <p>Feedback trend analytics will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminUserFeedback;
