
import { useParams } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const SupportTicket = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [reply, setReply] = useState("");

  // Mock ticket data - would come from API in real app
  const ticket = {
    id: id,
    subject: "Issue with product delivery",
    status: "Open",
    createdAt: "2023-04-20T10:30:00Z",
    messages: [
      {
        id: 1,
        sender: "You",
        message: "I haven't received my order yet. It's been 5 days since the estimated delivery date.",
        timestamp: "2023-04-20T10:30:00Z"
      },
      {
        id: 2,
        sender: "Support Agent",
        message: "I'm sorry to hear about the delay. Let me check the status of your order and get back to you.",
        timestamp: "2023-04-20T11:15:00Z"
      }
    ]
  };

  const handleSendReply = () => {
    if (!reply.trim()) return;
    
    // In a real app, this would send the reply to an API
    toast({
      title: "Reply sent",
      description: "Your message has been sent to our support team."
    });
    
    setReply("");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Support Ticket #{id}</h1>
        <div className="flex items-center mb-8">
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mr-4">
            {ticket.status}
          </span>
          <span className="text-muted-foreground">
            Opened on {new Date(ticket.createdAt).toLocaleDateString()}
          </span>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{ticket.subject}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ticket.messages.map((message) => (
                <div 
                  key={message.id}
                  className={`p-4 rounded-lg ${
                    message.sender === "You" 
                      ? "bg-primary/10 ml-12" 
                      : "bg-secondary mr-12"
                  }`}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{message.sender}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(message.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p>{message.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Reply to this ticket</h2>
          <Textarea 
            placeholder="Type your message here..." 
            className="min-h-32"
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleSendReply}>Send Reply</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTicket;
