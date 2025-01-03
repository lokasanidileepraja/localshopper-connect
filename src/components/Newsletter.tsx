import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Mail } from "lucide-react";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <section className="bg-primary-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter for the latest tech deals and updates.
          </p>
          <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
};