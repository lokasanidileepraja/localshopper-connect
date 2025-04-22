
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

const RetailerRegister = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [storeType, setStoreType] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration submitted",
      description: "Your store registration is being processed. We'll review and contact you soon.",
    });
    navigate("/retailer?onboarding=true");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/50 px-4 py-12">
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Register Your Store</CardTitle>
            <CardDescription>Join our marketplace and increase your business visibility</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Store Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" placeholder="Your store name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="storeType">Store Type</Label>
                    <Select onValueChange={setStoreType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select store type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="mobile">Mobile Phones</SelectItem>
                        <SelectItem value="computer">Computer Hardware</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                        <SelectItem value="service">Service Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Contact Phone</Label>
                    <Input id="phone" placeholder="+91 12345 67890" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input id="email" type="email" placeholder="business@example.com" required />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="address">Store Address</Label>
                    <Textarea id="address" placeholder="Complete store address" required />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Owner Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input id="ownerName" placeholder="Full name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerPhone">Owner Phone</Label>
                    <Input id="ownerPhone" placeholder="+91 98765 43210" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idType">ID Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aadhar">Aadhar Card</SelectItem>
                        <SelectItem value="pan">PAN Card</SelectItem>
                        <SelectItem value="voter">Voter ID</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input id="idNumber" placeholder="Enter ID number" required />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Business Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gstNumber">GST Number</Label>
                    <Input id="gstNumber" placeholder="Enter GST number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proprietorship">Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llp">LLP</SelectItem>
                        <SelectItem value="pvtltd">Pvt Ltd</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea id="description" placeholder="Tell us about your business" required />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Store Timings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="openingTime">Opening Time</Label>
                    <Input id="openingTime" type="time" defaultValue="09:00" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="closingTime">Closing Time</Label>
                    <Input id="closingTime" type="time" defaultValue="21:00" required />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label>Working Days</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <div key={day} className="flex items-center space-x-2">
                          <Checkbox id={day.toLowerCase()} defaultChecked={day !== "Sunday"} />
                          <label
                            htmlFor={day.toLowerCase()}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {day}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Retailer Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 justify-end">
                <Button variant="outline" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RetailerRegister;
