
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function Rewards() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg border-accent">
        <CardHeader>
          <CardTitle>
            <Star className="inline-block mr-2 text-yellow-400" /> Your Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-lg">
              <b>0</b> / 3 orders to next Reward Coupon!
            </div>
            <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-primary w-0" style={{ width: "0%" }}></div>
            </div>
            <Button className="w-full mt-3" onClick={() => navigate('/category/electronics')}>
              <ShoppingCart className="h-4 w-4 mr-1" />
              Shop now & earn points!
            </Button>
            <p className="text-sm text-muted-foreground">
              Earn rewards for every order, unlock badges, and get bonus deals.
              Notifications for coupon drops coming soon!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
