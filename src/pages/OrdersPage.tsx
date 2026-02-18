import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, ArrowRight, Package, Truck, CheckCircle, Clock, AlertTriangle, ChevronRight, RotateCcw } from "lucide-react";
import { MOCK_ORDERS } from "@/data/marketplace";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

const STEPS = [
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "preparing", label: "Preparing", icon: Package },
  { key: "out_for_delivery", label: "On the way", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const PICKUP_STEPS = [
  { key: "confirmed", label: "Confirmed", icon: CheckCircle },
  { key: "preparing", label: "Preparing", icon: Package },
  { key: "ready_for_pickup", label: "Ready", icon: Package },
  { key: "delivered", label: "Picked up", icon: CheckCircle },
];

const OrdersPage = () => {
  const [tab, setTab] = useState<"active" | "past">("active");

  const activeOrders = MOCK_ORDERS.filter((o) => o.status !== "delivered");
  const pastOrders = MOCK_ORDERS.filter((o) => o.status === "delivered");

  const getStepIndex = (status: string, fulfillment: string) => {
    const steps = fulfillment === "pickup" ? PICKUP_STEPS : STEPS;
    const idx = steps.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div className="bg-background min-h-screen">
      <Helmet><title>Orders - TechLocator</title></Helmet>

      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <h1 className="text-lg font-bold text-foreground">My Orders</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-4 mb-3">
        {(["active", "past"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-full text-xs font-medium transition-colors",
              tab === t ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
            )}
          >
            {t === "active" ? `Active (${activeOrders.length})` : `Past (${pastOrders.length})`}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="px-4 space-y-3 pb-4">
        {(tab === "active" ? activeOrders : pastOrders).map((order) => {
          const steps = order.fulfillment === "pickup" ? PICKUP_STEPS : STEPS;
          const currentStep = getStepIndex(order.status, order.fulfillment);
          const item = order.items[0];
          const isDelivered = order.status === "delivered";
          const hoursAgo = order.deliveredAt
            ? (Date.now() - new Date(order.deliveredAt).getTime()) / (1000 * 60 * 60)
            : 999;
          const canReport = isDelivered && hoursAgo <= 48;

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-card border border-border overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground">{order.id}</p>
                  <p className="text-xs font-semibold text-foreground">{order.storeName}</p>
                </div>
                <Badge
                  className={cn(
                    "text-[9px] border-0",
                    isDelivered ? "bg-green-100 text-green-700" : "bg-primary/10 text-primary"
                  )}
                >
                  {order.status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                </Badge>
              </div>

              {/* Item Preview */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-foreground line-clamp-1">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {item.variant} · Qty: {item.quantity}
                  </p>
                  <p className="text-xs font-bold text-foreground">₹{order.total.toLocaleString("en-IN")}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>

              {/* Live Stepper (active orders) */}
              {!isDelivered && (
                <div className="px-4 pb-3">
                  <div className="flex items-center justify-between">
                    {steps.map((step, i) => {
                      const StepIcon = step.icon;
                      const isComplete = i <= currentStep;
                      const isCurrent = i === currentStep;
                      return (
                        <div key={step.key} className="flex flex-col items-center flex-1 relative">
                          {i > 0 && (
                            <div
                              className={cn(
                                "absolute top-3 right-1/2 w-full h-0.5 -z-10",
                                i <= currentStep ? "bg-primary" : "bg-border"
                              )}
                            />
                          )}
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center",
                              isComplete ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                              isCurrent && "ring-2 ring-primary/30"
                            )}
                          >
                            <StepIcon className="h-3 w-3" />
                          </div>
                          <span className={cn(
                            "text-[9px] mt-1 font-medium text-center",
                            isComplete ? "text-primary" : "text-muted-foreground"
                          )}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-t border-border">
                {!isDelivered && (
                  <Button variant="outline" size="sm" className="rounded-full text-[11px] h-8 gap-1.5 flex-1">
                    <Phone className="h-3 w-3" />
                    Call Store
                  </Button>
                )}
                {isDelivered && (
                  <Button variant="outline" size="sm" className="rounded-full text-[11px] h-8 gap-1.5 flex-1">
                    <RotateCcw className="h-3 w-3" />
                    Reorder
                  </Button>
                )}
                {canReport && (
                  <Button variant="destructive" size="sm" className="rounded-full text-[11px] h-8 gap-1.5">
                    <AlertTriangle className="h-3 w-3" />
                    Report Issue
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}

        {(tab === "active" ? activeOrders : pastOrders).length === 0 && (
          <div className="text-center py-12">
            <Package className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">No {tab} orders</p>
            <p className="text-xs text-muted-foreground mt-1">
              {tab === "active" ? "Your active orders will appear here" : "Your past orders will appear here"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
