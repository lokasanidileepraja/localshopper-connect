import { Home, Briefcase, MapPin, MoreVertical, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Address } from "@/store/addressStore";

const TYPE_ICONS = {
  home: Home,
  work: Briefcase,
  other: MapPin,
};

interface AddressCardProps {
  address: Address;
  compact?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSetDefault?: () => void;
}

export const AddressCard = ({
  address, compact, selected, onSelect, onEdit, onDelete, onSetDefault,
}: AddressCardProps) => {
  const Icon = TYPE_ICONS[address.type] || MapPin;
  const fullAddress = [address.houseNo, address.area, address.landmark, address.city, address.pincode]
    .filter(Boolean)
    .join(", ");

  if (compact) {
    return (
      <button
        onClick={onSelect}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all text-left active:scale-[0.98]",
          selected
            ? "border-primary bg-primary/5"
            : "border-border bg-card"
        )}
      >
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
          selected ? "bg-primary/10" : "bg-secondary"
        )}>
          <Icon className={cn("h-4.5 w-4.5", selected ? "text-primary" : "text-muted-foreground")} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground capitalize">{address.type}</p>
            {address.isDefault && (
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{fullAddress}</p>
        </div>
        {selected && (
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Check className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
        )}
      </button>
    );
  }

  return (
    <div className="p-4 rounded-xl border border-border bg-card">
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
          address.isDefault ? "bg-primary/10" : "bg-secondary"
        )}>
          <Icon className={cn("h-4.5 w-4.5", address.isDefault ? "text-primary" : "text-muted-foreground")} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-foreground capitalize">{address.type}</p>
            {address.isDefault && (
              <span className="text-[10px] font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-foreground mt-1">{address.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{fullAddress}</p>
          <p className="text-xs text-muted-foreground mt-1">📞 +91 {address.phone}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
        {onEdit && (
          <button onClick={onEdit} className="flex-1 py-2 rounded-lg text-xs font-semibold text-primary bg-primary/5 active:bg-primary/10 transition-colors">
            Edit
          </button>
        )}
        {!address.isDefault && onSetDefault && (
          <button onClick={onSetDefault} className="flex-1 py-2 rounded-lg text-xs font-semibold text-foreground bg-secondary active:bg-secondary/80 transition-colors">
            Set as Default
          </button>
        )}
        {onDelete && (
          <button onClick={onDelete} className="flex-1 py-2 rounded-lg text-xs font-semibold text-destructive bg-destructive/5 active:bg-destructive/10 transition-colors">
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
