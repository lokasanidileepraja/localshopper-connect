import { Button } from "@/components/ui/button";
import { ArrowRight, Computer, Smartphone, CircuitBoard, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-100 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">Your Local Tech Hub</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Local Electronics Stores Near You
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover nearby electronics shops, compare prices on gadgets, and connect directly with local tech retailers. Get the latest devices with the convenience of local shopping and expert support.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="group"
                onClick={() => navigate("/shop/TechHub Electronics")}
              >
                Browse Electronics
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  // This would typically open a registration form
                  window.alert("Store registration coming soon!");
                }}
              >
                Register Your Store
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 animate-float rounded-full bg-primary/10 opacity-20 blur-3xl"></div>
            </div>
            <div className="relative grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
                  <Computer className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Latest Gadgets</h3>
                  <p className="mt-2 text-sm text-gray-600">Find new tech locally</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
                  <Smartphone className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Smart Devices</h3>
                  <p className="mt-2 text-sm text-gray-600">Compare prices nearby</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 pt-12">
                <div className="rounded-2xl bg-white p-6 shadow-lg transition-transform hover:scale-105">
                  <CircuitBoard className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold">Tech Support</h3>
                  <p className="mt-2 text-sm text-gray-600">Expert local service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};