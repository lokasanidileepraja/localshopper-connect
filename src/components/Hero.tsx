import { Button } from "@/components/ui/button";
import { ArrowRight, Store, ShoppingBag, MessageCircle } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary-100 to-white py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Connect with Local Shops in Your Neighborhood
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover nearby stores, compare prices, and shop locally with ease. Support your community while enjoying the convenience of online shopping.
            </p>
            <div className="mt-8 flex gap-4">
              <Button size="lg" className="group">
                Start Shopping
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline">
                Register Your Shop
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
                  <Store className="h-8 w-8 text-primary-500" />
                  <h3 className="mt-4 font-semibold">Local Shops</h3>
                  <p className="mt-2 text-sm text-gray-600">Find stores near you</p>
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <ShoppingBag className="h-8 w-8 text-secondary-500" />
                  <h3 className="mt-4 font-semibold">Easy Shopping</h3>
                  <p className="mt-2 text-sm text-gray-600">Compare prices & buy</p>
                </div>
              </div>
              <div className="flex flex-col gap-6 pt-12">
                <div className="rounded-2xl bg-white p-6 shadow-lg">
                  <MessageCircle className="h-8 w-8 text-accent-DEFAULT" />
                  <h3 className="mt-4 font-semibold">Direct Chat</h3>
                  <p className="mt-2 text-sm text-gray-600">Talk to shop owners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};