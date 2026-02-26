import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Plus, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAddressStore, type Address } from "@/store/addressStore";
import { useLocationStore } from "@/data/marketplace";
import { useToast } from "@/hooks/use-toast";
import { AddressCard } from "@/components/address/AddressCard";
import { AddressForm } from "@/components/address/AddressForm";

type View = "list" | "add" | "edit";

const ManageAddresses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addresses, addAddress, updateAddress, deleteAddress, setDefault } = useAddressStore();
  const locationStore = useLocationStore();
  const [view, setView] = useState<View>("list");
  const [editingAddr, setEditingAddr] = useState<Address | null>(null);
  const [search, setSearch] = useState("");

  const filtered = search
    ? addresses.filter(
        (a) =>
          a.area.toLowerCase().includes(search.toLowerCase()) ||
          a.city.toLowerCase().includes(search.toLowerCase()) ||
          a.type.toLowerCase().includes(search.toLowerCase())
      )
    : addresses;

  const handleSave = (data: Omit<Address, "id">) => {
    if (editingAddr) {
      updateAddress(editingAddr.id, data);
      toast({ title: "Address updated successfully!" });
    } else {
      addAddress(data);
      toast({ title: "Address added successfully!" });
    }
    // Sync location store with default
    const def = addresses.find((a) => a.isDefault) || addresses[0];
    if (def) locationStore.set(def.type, `${def.area}, ${def.city}`);
    setView("list");
    setEditingAddr(null);
  };

  const handleDelete = (id: string) => {
    deleteAddress(id);
    toast({ title: "Address deleted successfully!" });
  };

  const handleSetDefault = (id: string) => {
    setDefault(id);
    const addr = addresses.find((a) => a.id === id);
    if (addr) locationStore.set(addr.type, `${addr.area}, ${addr.city}`);
    toast({ title: "Default address updated!" });
  };

  if (view === "add" || view === "edit") {
    return (
      <AddressForm
        initialData={editingAddr || undefined}
        onSave={handleSave}
        onCancel={() => { setView("list"); setEditingAddr(null); }}
      />
    );
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      <Helmet><title>Manage Addresses - TechLocator</title></Helmet>

      {/* Header */}
      <div className="sticky top-0 z-30 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4 gap-3">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>
          <h1 className="text-base font-semibold text-foreground flex-1">My Addresses</h1>
          <button
            onClick={() => { setEditingAddr(null); setView("add"); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>

      {/* Search */}
      {addresses.length > 2 && (
        <div className="px-4 pt-3">
          <div className="flex items-center gap-2.5 h-10 px-3 rounded-xl bg-secondary border border-border">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search addresses..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
            />
          </div>
        </div>
      )}

      {/* Address List */}
      <div className="px-4 pt-4 space-y-3">
        <AnimatePresence>
          {filtered.map((addr) => (
            <motion.div
              key={addr.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -50 }}
              layout
            >
              <AddressCard
                address={addr}
                onEdit={() => { setEditingAddr(addr); setView("edit"); }}
                onDelete={() => handleDelete(addr.id)}
                onSetDefault={() => handleSetDefault(addr.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-foreground">No addresses found</p>
            <p className="text-xs text-muted-foreground mt-1">Add a delivery address to get started</p>
            <button
              onClick={() => { setEditingAddr(null); setView("add"); }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
            >
              Add Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageAddresses;
