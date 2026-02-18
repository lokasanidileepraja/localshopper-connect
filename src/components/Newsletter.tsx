import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Bell, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NewsletterProps {
  onSubmit: (email: string) => void;
}

export const Newsletter = ({ onSubmit }: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    onSubmit(email);
    toast({ title: "Subscribed!", description: "You'll get the best deals." });
    setTimeout(() => { setIsSubmitted(false); setEmail(""); }, 2000);
  };

  return (
    <section className="px-4 py-5">
      <div className="rounded-2xl bg-primary/5 border border-primary/10 p-5">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center py-4">
              <CheckCircle className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium text-foreground">You're in! 🎉</p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center gap-2 mb-2">
                <Bell className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Deal Alerts</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-3">Get notified about price drops & flash sales</p>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 h-9 text-sm rounded-xl"
                />
                <Button type="submit" size="sm" className="rounded-xl h-9 px-4 text-xs">
                  Subscribe
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
