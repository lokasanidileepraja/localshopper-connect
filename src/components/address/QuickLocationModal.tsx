import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ChevronRight, Plus } from "lucide-react";
import { useAddressStore } from "@/store/addressStore";
import { useLocationStore } from "@/data/marketplace";
import { AddressCard } from "./AddressCard";

interface QuickLocationModalProps {
  open: boolean;
  onClose: () => void;
  onManage: () => void;
}

export const QuickLocationModal = ({ open, onClose, onManage }: QuickLocationModalProps) => {
  const { addresses, setDefault } = useAddressStore();
  const locationStore = useLocationStore();
  const defaultAddr = useAddressStore((s) => s.getDefault());

  const handleSelect = (addr: typeof addresses[0]) => {
    setDefault(addr.id);
    locationStore.set(addr.type, `${addr.area}, ${addr.city}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed bottom-0 left-0 right-0 z-[61] bg-background rounded-t-3xl max-h-[70vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3">
              <div>
                <h3 className="text-base font-bold text-foreground">Deliver to</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Select a delivery address</p>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>

            {/* Address list */}
            <div className="px-5 pb-4 space-y-2.5 overflow-y-auto max-h-[45vh]">
              {addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  address={addr}
                  compact
                  selected={addr.isDefault}
                  onSelect={() => handleSelect(addr)}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="px-5 pb-6 pt-2 space-y-2 border-t border-border">
              <button
                onClick={onManage}
                className="w-full flex items-center justify-between py-3.5 px-4 rounded-xl border border-dashed border-primary/40 active:bg-primary/5 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Plus className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">Add New Address</span>
                </div>
                <ChevronRight className="h-4 w-4 text-primary" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
