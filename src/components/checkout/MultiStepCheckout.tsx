
import { useState } from "react";
import { Check, ListCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import { useNavigate } from "react-router-dom";
import { ThankYouVoucher } from "@/components/reciprocity/ThankYouVoucher";

// Form schemas for each step
const personalInfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required")
});

const addressSchema = z.object({
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(6, "Postal code is required")
});

const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Valid card number required"),
  cardName: z.string().min(2, "Cardholder name required"),
  expiry: z.string().min(5, "Expiry date required"),
  cvv: z.string().min(3, "CVV required")
});

const steps = [
  { id: "personal", title: "Personal Info", schema: personalInfoSchema },
  { id: "address", title: "Shipping", schema: addressSchema },
  { id: "payment", title: "Payment", schema: paymentSchema },
  { id: "review", title: "Review" }
];

export const MultiStepCheckout = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal info
    name: "",
    email: "",
    phone: "",
    
    // Address
    street: "",
    city: "",
    state: "",
    postalCode: "",
    
    // Payment
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const { toast } = useToast();
  const { items, cartTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  
  // Current step form
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: currentStep < 3 ? zodResolver(steps[currentStep].schema) : undefined,
    defaultValues: formData
  });
  
  const handleNextStep = (data: any) => {
    // Update form data with values from current step
    setFormData({ ...formData, ...data });
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random order ID
      const newOrderId = `ORD${Math.floor(Math.random() * 1000000)}`;
      setOrderId(newOrderId);
      
      // Clear cart
      clearCart();
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${newOrderId} has been confirmed.`,
      });
      
      setIsComplete(true);
    } catch (error) {
      toast({
        title: "Error placing order",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleContinueShopping = () => {
    navigate("/");
  };
  
  const handleViewOrders = () => {
    navigate("/orders");
  };
  
  const renderFormStep = () => {
    switch (currentStep) {
      case 0: // Personal Info
        return (
          <form onSubmit={handleSubmit(handleNextStep)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Full Name</label>
              <input
                id="name"
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email Address</label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="john@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <input
                id="phone"
                type="tel"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="+91 98765 43210"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message as string}</p>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Next</Button>
            </div>
          </form>
        );
        
      case 1: // Shipping Address
        return (
          <form onSubmit={handleSubmit(handleNextStep)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="street" className="text-sm font-medium">Street Address</label>
              <input
                id="street"
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="123 Main St"
                {...register("street")}
              />
              {errors.street && (
                <p className="text-sm text-red-500">{errors.street.message as string}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="city" className="text-sm font-medium">City</label>
                <input
                  id="city"
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Mumbai"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="text-sm text-red-500">{errors.city.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="state" className="text-sm font-medium">State</label>
                <input
                  id="state"
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Maharashtra"
                  {...register("state")}
                />
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state.message as string}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="postalCode" className="text-sm font-medium">Postal Code</label>
              <input
                id="postalCode"
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="400001"
                {...register("postalCode")}
              />
              {errors.postalCode && (
                <p className="text-sm text-red-500">{errors.postalCode.message as string}</p>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button type="submit">Next</Button>
            </div>
          </form>
        );
        
      case 2: // Payment
        return (
          <form onSubmit={handleSubmit(handleNextStep)} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="cardName" className="text-sm font-medium">Cardholder Name</label>
              <input
                id="cardName"
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
                {...register("cardName")}
              />
              {errors.cardName && (
                <p className="text-sm text-red-500">{errors.cardName.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cardNumber" className="text-sm font-medium">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="1234 5678 9012 3456"
                {...register("cardNumber")}
              />
              {errors.cardNumber && (
                <p className="text-sm text-red-500">{errors.cardNumber.message as string}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="expiry" className="text-sm font-medium">Expiry Date</label>
                <input
                  id="expiry"
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="MM/YY"
                  {...register("expiry")}
                />
                {errors.expiry && (
                  <p className="text-sm text-red-500">{errors.expiry.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cvv" className="text-sm font-medium">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="123"
                  {...register("cvv")}
                />
                {errors.cvv && (
                  <p className="text-sm text-red-500">{errors.cvv.message as string}</p>
                )}
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button type="submit">Review Order</Button>
            </div>
          </form>
        );
        
      case 3: // Review
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              <h3 className="font-medium">Customer Information</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Name:</span>
                </div>
                <div>{formData.name}</div>
                
                <div>
                  <span className="text-muted-foreground">Email:</span>
                </div>
                <div>{formData.email}</div>
                
                <div>
                  <span className="text-muted-foreground">Phone:</span>
                </div>
                <div>{formData.phone}</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h3 className="font-medium">Shipping Address</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Street:</span>
                </div>
                <div>{formData.street}</div>
                
                <div>
                  <span className="text-muted-foreground">City:</span>
                </div>
                <div>{formData.city}</div>
                
                <div>
                  <span className="text-muted-foreground">State:</span>
                </div>
                <div>{formData.state}</div>
                
                <div>
                  <span className="text-muted-foreground">Postal Code:</span>
                </div>
                <div>{formData.postalCode}</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h3 className="font-medium">Payment Method</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Card:</span>
                </div>
                <div>•••• •••• •••• {formData.cardNumber.slice(-4)}</div>
                
                <div>
                  <span className="text-muted-foreground">Expiry:</span>
                </div>
                <div>{formData.expiry}</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <h3 className="font-medium">Order Summary</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span>₹{item.currentPrice.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-medium text-lg pt-2 border-t">
                <span>Total</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
              <Button 
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  if (isComplete) {
    return (
      <>
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center"
            >
              <Check className="h-8 w-8 text-green-600" />
            </motion.div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2 pt-4">
            <p>Your order #{orderId} has been placed successfully.</p>
            <p className="text-muted-foreground">
              We'll send you a confirmation email shortly.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={handleViewOrders}>
              View My Orders
            </Button>
            <Button variant="outline" className="w-full" onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
        <ThankYouVoucher orderId={orderId} customerName={formData.name.split(' ')[0]} />
      </>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListCheck className="h-5 w-5" />
          Checkout
        </CardTitle>
        
        {/* Progress Indicator */}
        <div className="flex justify-between mt-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <div className="relative flex items-center justify-center">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center z-10 transition-colors ${
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`absolute h-[2px] w-full top-1/2 left-1/2 transition-colors ${
                    index < currentStep ? "bg-primary" : "bg-border"
                  }`} />
                )}
              </div>
              <span className="text-xs mt-2">{step.title}</span>
            </div>
          ))}
        </div>
      </CardHeader>
      
      <CardContent>
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderFormStep()}
        </motion.div>
      </CardContent>
    </Card>
  );
};
