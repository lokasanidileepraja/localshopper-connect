import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  User, MapPin, Phone, Mail, ChevronRight, Moon,
  Globe, Shield, HelpCircle, FileText, LogOut, Home,
  Briefcase, Bell, Edit3, Package
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const savedAddresses = [
  { label: "Home", address: "42, 12th Main, Indiranagar, Bangalore - 560038", icon: Home, active: true },
  { label: "Office", address: "WeWork Galaxy, Residency Rd, Bangalore - 560025", icon: Briefcase, active: false },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen pb-6">
      <Helmet><title>Profile - TechLocator</title></Helmet>

      {/* Profile Card */}
      <div className="px-4 pt-4 pb-2">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-4 rounded-2xl bg-card border border-border overflow-hidden"
        >
          {/* Edit button */}
          <button className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-secondary flex items-center justify-center">
            <Edit3 className="h-3.5 w-3.5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base font-bold text-foreground">Rahul Sharma</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Phone className="h-3 w-3" /> +91 98765 43210
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Mail className="h-3 w-3" /> rahul@example.com
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-2 mt-4">
            {[
              { label: "Orders", value: "3" },
              { label: "Wishlist", value: "7" },
              { label: "Reviews", value: "2" },
            ].map((stat) => (
              <div key={stat.label} className="flex-1 text-center py-2 rounded-xl bg-secondary">
                <p className="text-sm font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Saved Addresses */}
      <SectionCard title="Delivery Addresses">
        {savedAddresses.map((addr, i) => (
          <button
            key={addr.label}
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 w-full active:bg-secondary transition-colors",
              i > 0 && "border-t border-border"
            )}
          >
            <div className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center shrink-0",
              addr.active ? "bg-primary/10" : "bg-secondary"
            )}>
              <addr.icon className={cn("h-4 w-4", addr.active ? "text-primary" : "text-foreground")} />
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-foreground">{addr.label}</p>
                {addr.active && (
                  <span className="text-[9px] font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">Default</span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">{addr.address}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </button>
        ))}
        <button className="flex items-center gap-3 px-4 py-3.5 w-full border-t border-border active:bg-secondary transition-colors">
          <div className="w-9 h-9 rounded-xl border border-dashed border-primary/40 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-semibold text-primary">Add New Address</p>
        </button>
      </SectionCard>

      {/* Orders shortcut */}
      <SectionCard title="Activity">
        <MenuItem
          icon={Package}
          label="My Orders"
          sublabel="3 orders · 1 active"
          onClick={() => navigate("/orders")}
        />
        <MenuItem
          icon={Bell}
          label="Notifications"
          sublabel="Manage alerts"
          onClick={() => navigate("/notifications")}
          divided
        />
      </SectionCard>

      {/* Preferences */}
      <SectionCard title="Preferences">
        <div className="flex items-center justify-between px-4 py-3.5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center">
              <Moon className="h-4 w-4 text-foreground" />
            </div>
            <span className="text-xs font-semibold text-foreground">Dark Mode</span>
          </div>
          <ThemeToggle />
        </div>
        <MenuItem icon={Globe} label="Language" sublabel="English" onClick={() => {}} divided />
      </SectionCard>

      {/* Legal */}
      <SectionCard title="Legal">
        <MenuItem icon={FileText} label="Terms of Service" onClick={() => navigate("/terms")} />
        <MenuItem icon={Shield} label="Privacy Policy" onClick={() => navigate("/privacy")} divided />
        <MenuItem icon={HelpCircle} label="FAQ" onClick={() => navigate("/faq")} divided />
      </SectionCard>

      {/* Logout */}
      <div className="px-4 py-3">
        <button className="flex items-center gap-3 px-4 py-3.5 w-full rounded-2xl border border-destructive/20 bg-destructive/5 active:bg-destructive/10 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
            <LogOut className="h-4 w-4 text-destructive" />
          </div>
          <span className="text-xs font-bold text-destructive">Log Out</span>
        </button>
      </div>

      <p className="text-center text-[10px] text-muted-foreground pt-2 pb-6">TechLocator v1.0.0</p>
    </div>
  );
};

const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="px-4 mb-3">
    <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2 px-1">{title}</p>
    <div className="rounded-2xl bg-card border border-border overflow-hidden">{children}</div>
  </div>
);

const MenuItem = ({
  icon: Icon, label, sublabel, onClick, divided,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  onClick: () => void;
  divided?: boolean;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-3 px-4 py-3.5 w-full active:bg-secondary transition-colors",
      divided && "border-t border-border"
    )}
  >
    <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center shrink-0">
      <Icon className="h-4 w-4 text-foreground" />
    </div>
    <div className="flex-1 text-left">
      <p className="text-xs font-semibold text-foreground">{label}</p>
      {sublabel && <p className="text-[10px] text-muted-foreground mt-0.5">{sublabel}</p>}
    </div>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </button>
);

export default ProfilePage;
