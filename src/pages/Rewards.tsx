
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Rewards() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-accent">
        <CardHeader className={isMobile ? "px-4 py-3" : ""}>
          <CardTitle className="flex items-center">
            <Star className="inline-block mr-2 text-yellow-400" /> Your Rewards
          </CardTitle>
        </CardHeader>
        <CardContent className={isMobile ? "px-4 pb-4" : ""}>
          <div className="space-y-3 sm:space-y-4">
            <div className="text-base sm:text-lg">
              <b>0</b> / 3 orders to next Reward Coupon!
            </div>
            <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
              <div className="h-full bg-primary w-0" style={{ width: "0%" }}></div>
            </div>
            <Button 
              className="w-full mt-3" 
              onClick={() => navigate('/category/electronics')}
              size={isMobile ? "sm" : "default"}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Shop now & earn points!
            </Button>
            <p className="text-sm text-muted-foreground">
              Earn rewards for every order, unlock badges, and get bonus deals.
              <span className="block mt-2 text-accent-foreground font-semibold">Student exclusive: Collect points, win goodies & get surprise deals! 🎁</span>
              Notifications for coupon drops coming soon!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
