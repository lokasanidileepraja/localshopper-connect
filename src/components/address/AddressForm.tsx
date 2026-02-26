import { useState } from "react";
import { motion } from "framer-motion";
import { X, Home, Briefcase, MapPin, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import type { Address } from "@/store/addressStore";

interface AddressFormProps {
  initialData?: Address;
  onSave: (data: Omit<Address, "id">) => void;
  onCancel: () => void;
}

const TYPE_OPTIONS = [
  { value: "home" as const, label: "Home", icon: Home },
  { value: "work" as const, label: "Work", icon: Briefcase },
  { value: "other" as const, label: "Other", icon: MapPin },
];

export const AddressForm = ({ initialData, onSave, onCancel }: AddressFormProps) => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: initialData?.name || "",
    phone: initialData?.phone || "",
    houseNo: initialData?.houseNo || "",
    area: initialData?.area || "",
    landmark: initialData?.landmark || "",
    city: initialData?.city || "Bangalore",
    pincode: initialData?.pincode || "",
    type: initialData?.type || ("home" as const),
    isDefault: initialData?.isDefault || false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Phone number must be 10 digits";
    if (!form.houseNo.trim()) e.houseNo = "House/flat number is required";
    if (!form.area.trim()) e.area = "Area/street is required";
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Pincode must be 6 digits";
    if (!form.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
  };

  const set = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => { const n = { ...e }; delete n[key]; return n; });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-background min-h-screen"
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3.5 flex items-center gap-3">
        <button onClick={onCancel} className="p-1 -ml-1">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <h2 className="text-base font-semibold text-foreground">
          {initialData ? "Edit Address" : "Add New Address"}
        </h2>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Address Type */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">Address Type</label>
          <div className="flex gap-2.5">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setForm((f) => ({ ...f, type: opt.value }))}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all text-sm font-medium",
                  form.type === opt.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground"
                )}
              >
                <opt.icon className="h-4 w-4" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <Field label="Full Name" value={form.name} error={errors.name}
          onChange={(v) => set("name", v)} placeholder="Rahul Sharma" />
        <Field label="Phone Number" value={form.phone} error={errors.phone}
          onChange={(v) => set("phone", v.replace(/\D/g, "").slice(0, 10))} placeholder="9876543210" type="tel" />
        <Field label="House / Flat No." value={form.houseNo} error={errors.houseNo}
          onChange={(v) => set("houseNo", v)} placeholder="42, 12th Main" />
        <Field label="Area / Street" value={form.area} error={errors.area}
          onChange={(v) => set("area", v)} placeholder="Indiranagar" />
        <Field label="Landmark (Optional)" value={form.landmark}
          onChange={(v) => set("landmark", v)} placeholder="Near BDA Complex" />
        
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" value={form.city} error={errors.city}
            onChange={(v) => set("city", v)} placeholder="Bangalore" />
          <Field label="Pincode" value={form.pincode} error={errors.pincode}
            onChange={(v) => set("pincode", v.replace(/\D/g, "").slice(0, 6))} placeholder="560038" type="tel" />
        </div>

        {/* Default toggle */}
        <button
          onClick={() => setForm((f) => ({ ...f, isDefault: !f.isDefault }))}
          className="flex items-center gap-3 w-full py-3"
        >
          <div className={cn(
            "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
            form.isDefault ? "border-primary bg-primary" : "border-border"
          )}>
            {form.isDefault && <span className="text-primary-foreground text-xs font-bold">✓</span>}
          </div>
          <span className="text-sm text-foreground font-medium">Set as default address</span>
        </button>
      </div>

      {/* Save button */}
      <div className="px-5 pb-8 pt-2">
        <button
          onClick={handleSubmit}
          className="w-full h-12 rounded-xl bg-primary text-primary-foreground text-sm font-semibold active:scale-[0.98] transition-transform"
        >
          {initialData ? "Update Address" : "Save Address"}
        </button>
      </div>
    </motion.div>
  );
};

/* ── Reusable field ── */
const Field = ({
  label, value, error, onChange, placeholder, type = "text",
}: {
  label: string; value: string; error?: string;
  onChange: (v: string) => void; placeholder: string; type?: string;
}) => (
  <div>
    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "w-full h-11 px-4 rounded-xl border bg-card text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all",
        error ? "border-destructive focus:ring-2 focus:ring-destructive/30" : "border-border focus:ring-2 focus:ring-primary/30 focus:border-primary"
      )}
    />
    {error && <p className="text-xs text-destructive mt-1">{error}</p>}
  </div>
);
