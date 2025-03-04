
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Send, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SupportChatModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const SupportChatModal = ({ open, onOpenChange }: SupportChatModalProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  
  // Sample chat messages
  const [messages, setMessages] = useState([
    { id: 1, sender: "system", text: "Welcome to NearMart Support. How can we help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const newMessage = { 
      id: messages.length + 1, 
      sender: "user", 
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage = { 
        id: messages.length + 2, 
        sender: "system", 
        text: "Thank you for your message. Our support team will get back to you shortly. Is there anything else we can help you with?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[500px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Support Chat
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-md">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-secondary"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <MessageSquare className="h-4 w-4" />
                  )}
                  <span className="text-xs font-medium">
                    {msg.sender === "user" ? "You" : "Support Agent"}
                  </span>
                  <span className="text-xs ml-auto opacity-70">{msg.time}</span>
                </div>
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            type="submit" 
            size="icon"
            onClick={handleSendMessage}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
