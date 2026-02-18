import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  User, MapPin, Phone, Mail, ChevronRight, Moon, Sun, Globe, 
  Shield, HelpCircle, FileText, LogOut, Home, Briefcase, Bell
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";

const savedAddresses = [
  { label: "Home", address: "42, 12th Main, Indiranagar, Bangalore - 560038", icon: Home },
  { label: "Office", address: "WeWork Galaxy, Residency Rd, Bangalore - 560025", icon: Briefcase },
];

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background min-h-screen pb-20">
      <Helmet><title>Profile - TechLocator</title></Helmet>

      {/* Profile Card */}
      <div className="px-4 pt-4 pb-3">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 p-4 rounded-2xl bg-card border border-border"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-foreground">Rahul Sharma</h2>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Phone className="h-3 w-3" /> +91 98765 43210
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Mail className="h-3 w-3" /> rahul@example.com
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </motion.div>
      </div>

      {/* Saved Addresses */}
      <Section title="Saved Addresses">
        {savedAddresses.map((addr) => (
          <button
            key={addr.label}
            className="flex items-center gap-3 px-4 py-3 w-full active:bg-secondary transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
              <addr.icon className="h-4 w-4 text-foreground" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-semibold text-foreground">{addr.label}</p>
              <p className="text-[10px] text-muted-foreground line-clamp-1">{addr.address}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </button>
        ))}
        <button className="flex items-center gap-3 px-4 py-3 w-full active:bg-secondary">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <p className="text-xs font-medium text-primary">Add New Address</p>
        </button>
      </Section>

      {/* Support & Resolution */}
      <Section title="Support & Resolution">
        <MenuItem icon={Shield} label="Support History" sublabel="View past issue reports" onClick={() => {}} />
        <MenuItem icon={Bell} label="Notifications" sublabel="Manage alert preferences" onClick={() => navigate("/notifications")} />
      </Section>

      {/* Preferences */}
      <Section title="Preferences">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <Moon className="h-4 w-4 text-foreground" />
            </div>
            <span className="text-xs font-medium text-foreground">Dark Mode</span>
          </div>
          <ThemeToggle />
        </div>
        <MenuItem icon={Globe} label="Language" sublabel="English" onClick={() => {}} />
      </Section>

      {/* Legal */}
      <Section title="Legal">
        <MenuItem icon={FileText} label="Terms of Service" onClick={() => navigate("/terms")} />
        <MenuItem icon={Shield} label="Privacy Policy" onClick={() => navigate("/privacy")} />
        <MenuItem icon={HelpCircle} label="FAQ" onClick={() => navigate("/faq")} />
      </Section>

      {/* Logout */}
      <div className="px-4 py-3">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl bg-destructive/10 active:bg-destructive/20 transition-colors">
          <LogOut className="h-4 w-4 text-destructive" />
          <span className="text-xs font-medium text-destructive">Log Out</span>
        </button>
      </div>

      <p className="text-center text-[10px] text-muted-foreground py-4">TechLocator v1.0.0</p>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-4">
    <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-4 mb-1">{title}</p>
    <div className="bg-card border-y border-border divide-y divide-border">{children}</div>
  </div>
);

const MenuItem = ({ icon: Icon, label, sublabel, onClick }: {
  icon: React.ElementType; label: string; sublabel?: string; onClick: () => void;
}) => (
  <button onClick={onClick} className="flex items-center gap-3 px-4 py-3 w-full active:bg-secondary transition-colors">
    <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
      <Icon className="h-4 w-4 text-foreground" />
    </div>
    <div className="flex-1 text-left">
      <p className="text-xs font-medium text-foreground">{label}</p>
      {sublabel && <p className="text-[10px] text-muted-foreground">{sublabel}</p>}
    </div>
    <ChevronRight className="h-4 w-4 text-muted-foreground" />
  </button>
);

export default ProfilePage;
