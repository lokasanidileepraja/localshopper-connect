import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RetailerChatProps {
  retailerName: string;
  retailerId: string;
}

export const RetailerChat = ({ retailerName, retailerId }: RetailerChatProps) => {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${retailerName}`,
      duration: 3000,
    });
    
    setMessage("");
  };

  const handleCall = () => {
    toast({
      title: "Initiating Call",
      description: `Connecting you with ${retailerName}...`,
      duration: 3000,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <span>Chat with {retailerName}</span>
          </div>
          <Button variant="outline" size="icon" onClick={handleCall}>
            <Phone className="h-5 w-5" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="min-h-[200px] bg-gray-50 rounded-lg p-4">
            <p className="text-center text-gray-500">Start a conversation with {retailerName}</p>
          </div>
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage();
                }
              }}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};