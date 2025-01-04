import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Calendar, Calculator, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ExpertDirectory } from "@/components/expert/ExpertDirectory";
import { ServiceBooking } from "@/components/expert/ServiceBooking";

const ExpertServices = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleExpertSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Searching Experts",
      description: "Finding tech experts near you",
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-4xl font-bold">Expert Local Service</h1>

      <form onSubmit={handleExpertSearch} className="flex gap-4">
        <Input
          type="text"
          placeholder="Search for tech experts or services"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit">Find Experts</Button>
      </form>

      <div className="grid md:grid-cols-2 gap-8">
        <ExpertDirectory />
        <ServiceBooking />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Live Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Chat with local tech experts for immediate assistance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Book Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Schedule a consultation with certified technicians
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Cost Estimator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Get instant repair cost estimates
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Tech Guides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Access DIY repair guides and tips
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpertServices;