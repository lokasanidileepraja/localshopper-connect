
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
}

export const OnboardingModal = ({
  open,
  onClose
}: OnboardingModalProps) => {
  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [alertPreferences, setAlertPreferences] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useLocalStorage("has-seen-onboarding", false);
  const { toast } = useToast();
  
  const totalSteps = 3;
  
  const handleComplete = () => {
    setHasSeenOnboarding(true);
    toast({
      title: "Welcome to TechLocator!",
      description: "Your preferences have been saved. Enjoy shopping smarter!",
    });
    onClose();
  };
  
  const handleCategoryToggle = (category: string) => {
    setCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const handleAlertToggle = (alert: string) => {
    setAlertPreferences(prev => 
      prev.includes(alert)
        ? prev.filter(a => a !== alert)
        : [...prev, alert]
    );
  };
  
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl sm:text-2xl">
            Welcome to TechLocator
          </DialogTitle>
          <DialogDescription className="text-center">
            Let's set up your preferences in just a few steps
          </DialogDescription>
        </DialogHeader>
        
        {/* Progress Indicator */}
        <div className="flex justify-center gap-1.5 my-2">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 rounded-full transition-all duration-300 ${
                i + 1 === step 
                  ? "w-6 bg-primary" 
                  : i + 1 < step 
                  ? "w-6 bg-primary/50" 
                  : "w-4 bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Pick your favorite categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {["Mobiles", "Laptops", "Audio", "Wearables", "Gaming", "Accessories"].map(category => (
                    <div
                      key={category}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        categories.includes(category)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      <Checkbox
                        checked={categories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                        className="data-[state=checked]:bg-primary"
                      />
                      <span>{category}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Set your alert preferences</h3>
                <div className="flex flex-col gap-2">
                  {[
                    "Price drops",
                    "New arrivals",
                    "Limited time deals",
                    "Low stock alerts",
                    "Retailer offers"
                  ].map(alert => (
                    <div
                      key={alert}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        alertPreferences.includes(alert)
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      onClick={() => handleAlertToggle(alert)}
                    >
                      <Checkbox
                        checked={alertPreferences.includes(alert)}
                        onCheckedChange={() => handleAlertToggle(alert)}
                        className="data-[state=checked]:bg-primary"
                      />
                      <span>{alert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Enable notifications</h3>
                <p className="text-sm text-muted-foreground">
                  Get timely updates about price alerts, nearby deals, and more.
                </p>
                <div
                  className={`flex items-center gap-2 p-4 rounded-lg border cursor-pointer transition-colors ${
                    notifications
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <Checkbox
                    checked={notifications}
                    onCheckedChange={(checked) => setNotifications(!!checked)}
                    className="data-[state=checked]:bg-primary"
                  />
                  <div>
                    <p className="font-medium">Push notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Only for important updates and the alerts you selected
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <DialogFooter className="sm:justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={onClose}>
              Skip
            </Button>
          )}
          <Button onClick={nextStep} className="gap-1">
            {step === totalSteps ? (
              <>
                Get Started <CheckCircle className="h-4 w-4 ml-1" />
              </>
            ) : (
              <>
                Continue <ChevronRight className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
