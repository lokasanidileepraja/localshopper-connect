import { Card, CardContent } from "@/components/ui/card";
import { AlertForm } from "@/components/alerts/AlertForm";
import { ActiveAlert } from "@/components/alerts/ActiveAlert";
import { NotificationPreferences } from "@/components/alerts/NotificationPreferences";
import { useState } from "react";

export const PriceAlerts = () => {
  const [targetPrice, setTargetPrice] = useState("");
  const [hasActiveAlert, setHasActiveAlert] = useState(false);

  const handleSetAlert = () => {
    setHasActiveAlert(true);
  };

  const handleRemoveAlert = () => {
    setHasActiveAlert(false);
    setTargetPrice("");
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="pt-6">
          {hasActiveAlert ? (
            <ActiveAlert
              targetPrice={targetPrice}
              onRemoveAlert={handleRemoveAlert}
            />
          ) : (
            <AlertForm
              targetPrice={targetPrice}
              onTargetPriceChange={setTargetPrice}
              onSetAlert={handleSetAlert}
              currentPrice={100000}
            />
          )}
        </CardContent>
      </Card>
      <NotificationPreferences />
    </div>
  );
};