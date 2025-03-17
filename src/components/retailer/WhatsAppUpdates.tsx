
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MessageSquare, Send, Clock, RotateCw, BellDot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const WhatsAppUpdates = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [settings, setSettings] = useState({
    stockUpdates: true,
    orderNotifications: true,
    customerInquiries: true,
    weeklyReminders: true,
  });
  const [weeklyDay, setWeeklyDay] = useState("Monday");
  const [weeklyTime, setWeeklyTime] = useState("09:00");

  const handleVerify = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid WhatsApp number",
        variant: "destructive",
      });
      return;
    }

    // Simulate verification process
    toast({
      title: "Verification Code Sent",
      description: "We've sent a verification code to your WhatsApp number",
    });

    // Mock successful verification after 2 seconds
    setTimeout(() => {
      setIsVerified(true);
      toast({
        title: "WhatsApp Verified",
        description: "Your WhatsApp number has been successfully verified",
      });
    }, 2000);
  };

  const handleUpdateSettings = (key: keyof typeof settings) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      return newSettings;
    });
  };

  const handleSendTestMessage = () => {
    toast({
      title: "Test Message Sent",
      description: "A test message has been sent to your WhatsApp number",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            WhatsApp Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!isVerified ? (
              <div className="space-y-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Connect Your WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">
                    Link your WhatsApp number to receive order notifications, update stock, and interact with customers
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>WhatsApp Number</Label>
                  <div className="flex gap-2">
                    <Input 
                      type="tel" 
                      placeholder="Enter your WhatsApp number" 
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Button onClick={handleVerify}>
                      Verify
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We'll send a verification code to this WhatsApp number
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-green-800">WhatsApp Connected</h3>
                      <p className="text-sm text-green-700">{phoneNumber}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSendTestMessage}>
                    Send Test
                  </Button>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-medium">Notification Settings</h3>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="stock-updates">Stock Updates</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive reminders to update your inventory
                      </p>
                    </div>
                    <Switch 
                      id="stock-updates"
                      checked={settings.stockUpdates}
                      onCheckedChange={() => handleUpdateSettings('stockUpdates')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="order-notifications">New Orders</Label>
                      <p className="text-xs text-muted-foreground">
                        Get notifications when customers make reservations
                      </p>
                    </div>
                    <Switch 
                      id="order-notifications"
                      checked={settings.orderNotifications}
                      onCheckedChange={() => handleUpdateSettings('orderNotifications')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="customer-inquiries">Customer Inquiries</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive messages from interested customers
                      </p>
                    </div>
                    <Switch 
                      id="customer-inquiries"
                      checked={settings.customerInquiries}
                      onCheckedChange={() => handleUpdateSettings('customerInquiries')}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-reminders">Weekly Reminders</Label>
                      <p className="text-xs text-muted-foreground">
                        Get weekly reminders to update prices and stock
                      </p>
                    </div>
                    <Switch 
                      id="weekly-reminders"
                      checked={settings.weeklyReminders}
                      onCheckedChange={() => handleUpdateSettings('weeklyReminders')}
                    />
                  </div>
                  
                  {settings.weeklyReminders && (
                    <div className="ml-6 mt-2 space-y-3 p-3 border rounded-lg">
                      <div className="space-y-1">
                        <Label>Reminder Day</Label>
                        <select 
                          className="w-full p-2 rounded-md border"
                          value={weeklyDay}
                          onChange={(e) => setWeeklyDay(e.target.value)}
                        >
                          {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <Label>Reminder Time</Label>
                        <Input 
                          type="time"
                          value={weeklyTime}
                          onChange={(e) => setWeeklyTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {isVerified && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <RotateCw className="h-5 w-5" />
              Quick Stock Update
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Quickly update your inventory through WhatsApp. This helps customers see accurate stock information.
              </p>
              
              <div className="space-y-2">
                <Label>Update Message</Label>
                <Textarea 
                  placeholder="List products that are out of stock or have limited quantity..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  You can also update inventory directly through WhatsApp by sending a message with the keyword "UPDATE"
                </p>
              </div>
              
              <Button className="w-full">
                <Send className="mr-2 h-4 w-4" />
                Send Update via WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isVerified && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BellDot className="h-5 w-5" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h4 className="font-medium">Weekly Stock Update Reminder</h4>
                      <p className="text-sm text-muted-foreground">
                        It's time to update your inventory for the week
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">1 hour ago</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h4 className="font-medium">New Customer Inquiry</h4>
                      <p className="text-sm text-muted-foreground">
                        A customer is asking about iPhone 15 Pro availability
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Send className="h-5 w-5 text-muted-foreground mt-1" />
                    <div>
                      <h4 className="font-medium">Price Update Confirmed</h4>
                      <p className="text-sm text-muted-foreground">
                        Your product price updates have been successfully applied
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View All Notifications
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
