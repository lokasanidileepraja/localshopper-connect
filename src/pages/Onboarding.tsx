
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, MapPin, Bell, Tag } from "lucide-react";

const OnboardingSteps = [
  {
    title: "Welcome to TechLocator",
    description: "Find the best electronics shops near you with real-time price comparison",
    icon: Home,
    color: "bg-blue-500"
  },
  {
    title: "Set Your Location",
    description: "We'll show you the nearest stores and best deals based on your location",
    icon: MapPin,
    color: "bg-green-500"
  },
  {
    title: "Get Price Alerts",
    description: "Set up alerts for when products drop in price at stores near you",
    icon: Bell,
    color: "bg-purple-500"
  },
  {
    title: "Exclusive Deals",
    description: "Local stores often have better deals than online - we help you find them",
    icon: Tag,
    color: "bg-amber-500"
  }
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep === OnboardingSteps.length - 1) {
      // Last step, redirect to home
      navigate('/home');
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const skipTutorial = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="p-0">
          <div className="relative h-64">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
              >
                <div className={`p-4 rounded-full ${OnboardingSteps[currentStep].color} text-white mb-4`}>
                  {React.createElement(OnboardingSteps[currentStep].icon, { size: 24 })}
                </div>
                <h2 className="text-2xl font-bold mb-2">{OnboardingSteps[currentStep].title}</h2>
                <p className="text-muted-foreground">{OnboardingSteps[currentStep].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="p-6 border-t flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {currentStep > 0 ? (
                <Button variant="outline" size="sm" onClick={prevStep}>
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={skipTutorial}>
                  Skip
                </Button>
              )}
            </div>

            <div className="flex items-center justify-center space-x-1">
              {OnboardingSteps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === currentStep ? 'bg-primary' : 'bg-secondary'}`}
                  animate={{ scale: index === currentStep ? 1.2 : 1 }}
                />
              ))}
            </div>

            <Button onClick={nextStep}>
              {currentStep === OnboardingSteps.length - 1 ? 'Get Started' : 'Next'}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
