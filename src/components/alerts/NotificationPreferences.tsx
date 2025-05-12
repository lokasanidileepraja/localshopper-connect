
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, Phone, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const NotificationPreferences = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
    sms: false,
    priceDrops: true,
    stockAlerts: true,
    deals: false,
  });

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    setPreferences(prev => {
      const newPrefs = { ...prev, [key]: !prev[key] };
      toast({
        title: "Preferences Updated",
        description: `${key} notifications ${newPrefs[key] ? 'enabled' : 'disabled'}`,
      });
      return newPrefs;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Preferences
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h3 className="font-medium">Notification Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="email">Email Notifications</Label>
                </div>
                <Switch
                  id="email"
                  checked={preferences.email}
                  onCheckedChange={() => handlePreferenceChange('email')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="push">Push Notifications</Label>
                </div>
                <Switch
                  id="push"
                  checked={preferences.push}
                  onCheckedChange={() => handlePreferenceChange('push')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="sms">SMS Notifications</Label>
                </div>
                <Switch
                  id="sms"
                  checked={preferences.sms}
                  onCheckedChange={() => handlePreferenceChange('sms')}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Alert Types</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="price-drops">Price Drops</Label>
                </div>
                <Switch
                  id="price-drops"
                  checked={preferences.priceDrops}
                  onCheckedChange={() => handlePreferenceChange('priceDrops')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="stock-alerts">Stock Alerts</Label>
                </div>
                <Switch
                  id="stock-alerts"
                  checked={preferences.stockAlerts}
                  onCheckedChange={() => handlePreferenceChange('stockAlerts')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="deals">Special Deals</Label>
                </div>
                <Switch
                  id="deals"
                  checked={preferences.deals}
                  onCheckedChange={() => handlePreferenceChange('deals')}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};
