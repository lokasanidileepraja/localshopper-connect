import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const ExpertDirectory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Local Tech Experts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">John Smith</h3>
                <p className="text-sm text-gray-600">Apple Certified Technician</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm">4.8</span>
                </div>
              </div>
              <Button>Book Now</Button>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <p className="text-sm text-gray-600">Samsung Expert</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm">4.9</span>
                </div>
              </div>
              <Button>Book Now</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};