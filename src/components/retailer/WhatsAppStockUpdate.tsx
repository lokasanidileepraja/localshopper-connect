
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone, Send, RefreshCw, Bell } from "lucide-react";

interface WhatsAppStockUpdateProps {
  storeId: string;
}

export const WhatsAppStockUpdate = ({ storeId }: WhatsAppStockUpdateProps) => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReminderSet, setIsReminderSet] = useState(false);

  const handleConnect = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid WhatsApp number",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate WhatsApp verification process
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "WhatsApp Connected",
        description: "Your store is now connected to WhatsApp for updates",
      });
      
      setIsVerified(true);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendUpdate = async () => {
    setIsLoading(true);
    
    try {
      // Simulate sending WhatsApp message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Update Sent",
        description: "Stock update message sent via WhatsApp",
      });
    } catch (error) {
      toast({
        title: "Send Failed",
        description: "Could not send WhatsApp message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetReminder = () => {
    setIsReminderSet(true);
    
    toast({
      title: "Reminder Set",
      description: "You'll receive weekly stock update reminders via WhatsApp",
    });
  };

  const formatFormattedPhoneNumber = (number: string) => {
    // Add +91 prefix for display if not already present
    if (number && !number.startsWith('+')) {
      return `+91 ${number}`;
    }
    return number;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          WhatsApp Stock Updates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isVerified ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Connect your WhatsApp number to send and receive stock updates easily.
            </p>
            
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="WhatsApp Number (e.g., 9876543210)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Enter your number without country code. We'll add +91 for India.
              </p>
            </div>
            
            <Button
              className="w-full"
              onClick={handleConnect}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect WhatsApp"
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-green-50 rounded-lg p-3 text-green-700 text-sm flex items-center">
              <Phone className="h-4 w-4 mr-2 text-green-500" />
              Connected to WhatsApp: {formatFormattedPhoneNumber(phoneNumber)}
            </div>
            
            <div className="space-y-1">
              <h4 className="text-sm font-medium">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  className="text-sm"
                  onClick={handleSendUpdate}
                  disabled={isLoading}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Stock Update
                </Button>
                
                <Button
                  variant={isReminderSet ? "outline" : "default"}
                  className="text-sm"
                  onClick={handleSetReminder}
                  disabled={isReminderSet || isLoading}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  {isReminderSet ? "Reminder Set" : "Set Weekly Reminder"}
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg border p-3 space-y-2">
              <h4 className="text-sm font-medium">How It Works</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Send "UPDATE" to update your inventory via WhatsApp</li>
                <li>• Customers will see last updated timestamp</li>
                <li>• Weekly reminders ensure your inventory stays current</li>
                <li>• Receive notifications for new reservations</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
