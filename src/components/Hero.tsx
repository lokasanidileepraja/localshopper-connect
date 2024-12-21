import { Button } from "@/components/ui/button";
import { ArrowRight, Computer, Smartphone, CircuitBoard } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-100 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Find Local Electronics Stores Near You
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover nearby electronics shops, compare prices on gadgets, and connect directly with local tech retailers. Get the latest devices with the convenience of local shopping.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" className="group">
                Browse Electronics
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Register Your Store
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-64 w-64 animate-float rounded-full bg-primary-200 opacity-20 blur-3xl"></div>
            </div>
            <div className="relative grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <Computer className="h-8 w-8 text-primary-500" />
                  <h3 className="mt-4 font-semibold">Latest Gadgets</h3>
                  <p className="mt-2 text-sm text-gray-600">Find new tech locally</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <Smartphone className="h-8 w-8 text-secondary-500" />
                  <h3 className="mt-4 font-semibold">Smart Devices</h3>
                  <p className="mt-2 text-sm text-gray-600">Compare prices nearby</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 pt-12">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <CircuitBoard className="h-8 w-8 text-accent-DEFAULT" />
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