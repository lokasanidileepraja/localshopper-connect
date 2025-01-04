import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <Input defaultValue="John Doe" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <div className="flex items-center gap-2">
                <Input defaultValue="john@example.com" />
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <div className="flex items-center gap-2">
                <Input defaultValue="+1 234 567 890" />
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Street Address</label>
              <Input defaultValue="123 Tech Street" />
            </div>
            <div>
              <label className="text-sm font-medium">City</label>
              <Input defaultValue="San Francisco" />
            </div>
            <div>
              <label className="text-sm font-medium">Zip Code</label>
              <Input defaultValue="94105" />
            </div>
            <Button onClick={handleSave} className="w-full">Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;