import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Bell, Calendar, Newspaper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { StoreLocator } from "@/components/store/StoreLocator";
import { TechNews } from "@/components/tech/TechNews";

const LocalTech = () => {
  const [location, setLocation] = useState("");
  const { toast } = useToast();

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Location Updated",
      description: "Showing tech stores near " + location,
    });
  };

  const enableNotifications = () => {
    toast({
      title: "Notifications Enabled",
      description: "You'll receive updates about new tech in your area",
    });
  };

  return (
    <div className="container py-8 space-y-8">
      <h1 className="text-4xl font-bold">Find New Tech Locally</h1>
      
      <form onSubmit={handleLocationSubmit} className="flex gap-4">
        <Input
          type="text"
          placeholder="Enter your location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit">
          <MapPin className="mr-2 h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" onClick={enableNotifications}>
          <Bell className="mr-2 h-4 w-4" />
          Enable Notifications
        </Button>
      </form>

      <div className="grid md:grid-cols-2 gap-8">
        <StoreLocator />
        <TechNews />
      </div>
    </div>
  );
};

export default LocalTech;