import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Phone, Package, Truck, CheckCircle, AlertTriangle, ChevronRight, RotateCcw, Clock, Store } from "lucide-react";
import { MOCK_ORDERS } from "@/data/marketplace";
import { cn } from "@/lib/utils";
import { useState } from "react";

const STEPS = [
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "out_for_delivery", label: "On the way" },
  { key: "delivered", label: "Delivered" },
];

const PICKUP_STEPS = [
  { key: "confirmed", label: "Confirmed" },
  { key: "preparing", label: "Preparing" },
  { key: "ready_for_pickup", label: "Ready" },
  { key: "delivered", label: "Picked up" },
];

const STATUS_COLOR: Record<string, string> = {
  confirmed: "bg-blue-500/10 text-blue-600",
  preparing: "bg-orange-500/10 text-orange-600",
  out_for_delivery: "bg-purple-500/10 text-purple-600",
  ready_for_pickup: "bg-green-500/10 text-green-600",
  delivered: "bg-green-500/10 text-green-700",
};

const STATUS_LABEL: Record<string, string> = {
  confirmed: "Confirmed",
  preparing: "Preparing",
  out_for_delivery: "On the way",
  ready_for_pickup: "Ready for pickup",
  delivered: "Delivered",
};

const OrdersPage = () => {
  const [tab, setTab] = useState<"active" | "past">("active");

  const activeOrders = MOCK_ORDERS.filter((o) => o.status !== "delivered");
  const pastOrders = MOCK_ORDERS.filter((o) => o.status === "delivered");

  const getStepIndex = (status: string, fulfillment: string) => {
    const steps = fulfillment === "pickup" ? PICKUP_STEPS : STEPS;
    const idx = steps.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  const displayOrders = tab === "active" ? activeOrders : pastOrders;

  return (
    <div className="bg-background min-h-screen">
      <Helmet><title>Orders - TechLocator</title></Helmet>

      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <h1 className="text-lg font-bold text-foreground">My Orders</h1>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex gap-1 p-1 rounded-2xl bg-secondary">
          {(["active", "past"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-2 rounded-xl text-xs font-semibold transition-all",
                tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground"
              )}
            >
              {t === "active" ? `Active (${activeOrders.length})` : `Past (${pastOrders.length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      <div className="px-4 space-y-3 pb-6">
        {displayOrders.map((order, i) => {
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
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl bg-card border border-border overflow-hidden"
            >
              {/* Order header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                    <Store className="h-3.5 w-3.5 text-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{order.storeName}</p>
                    <p className="text-[10px] text-muted-foreground">{order.id}</p>
                  </div>
                </div>
                <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full", STATUS_COLOR[order.status] || "bg-secondary text-muted-foreground")}>
                  {STATUS_LABEL[order.status] || order.status}
                </span>
              </div>

              {/* Item */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-14 h-14 rounded-xl bg-muted overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-foreground line-clamp-1">{item.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.variant} · Qty {item.quantity}</p>
                  <p className="text-sm font-bold text-foreground mt-1">₹{order.total.toLocaleString("en-IN")}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </div>

              {/* Stepper (active only) */}
              {!isDelivered && (
                <div className="px-4 pb-3">
                  <div className="relative flex items-center justify-between">
                    {/* Track line */}
                    <div className="absolute left-3 right-3 top-3 h-0.5 bg-border" />
                    <div
                      className="absolute left-3 top-3 h-0.5 bg-primary transition-all duration-500"
                      style={{ width: `${(currentStep / (steps.length - 1)) * (100 - 10)}%` }}
                    />
                    {steps.map((step, idx) => {
                      const done = idx <= currentStep;
                      const current = idx === currentStep;
                      return (
                        <div key={step.key} className="flex flex-col items-center gap-1.5 relative z-10">
                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center transition-all",
                              done ? "bg-primary" : "bg-border",
                              current && "ring-2 ring-primary/30 ring-offset-1 ring-offset-card"
                            )}
                          >
                            {done ? (
                              <CheckCircle className="h-3.5 w-3.5 text-primary-foreground" />
                            ) : (
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
                            )}
                          </div>
                          <span className={cn(
                            "text-[9px] font-medium text-center max-w-[52px] leading-tight",
                            done ? "text-primary" : "text-muted-foreground"
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
              <div className="flex gap-2 px-4 py-3 border-t border-border">
                {!isDelivered && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border border-border bg-card text-[11px] font-semibold text-foreground active:bg-secondary transition-colors">
                    <Phone className="h-3.5 w-3.5" />
                    Call Store
                  </button>
                )}
                {isDelivered && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl border border-border bg-card text-[11px] font-semibold text-foreground active:bg-secondary transition-colors">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reorder
                  </button>
                )}
                {canReport && (
                  <button className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-xl bg-destructive/10 border border-destructive/30 text-[11px] font-semibold text-destructive active:bg-destructive/20 transition-colors">
                    <AlertTriangle className="h-3.5 w-3.5" />
                    Report Issue
                  </button>
                )}
                {isDelivered && canReport && (
                  <p className="sr-only">48-hr support window active</p>
                )}
              </div>

              {/* 48h window notice */}
              {isDelivered && canReport && (
                <div className="flex items-center gap-2 px-4 pb-3">
                  <Clock className="h-3 w-3 text-amber-500 shrink-0" />
                  <p className="text-[10px] text-amber-600 font-medium">
                    48-hr support window active · Report issues now
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}

        {displayOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-3xl bg-secondary flex items-center justify-center mb-4">
              <Package className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-bold text-foreground mb-1">No {tab} orders</p>
            <p className="text-xs text-muted-foreground">
              {tab === "active" ? "Your active orders will appear here" : "Completed orders will appear here"}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
