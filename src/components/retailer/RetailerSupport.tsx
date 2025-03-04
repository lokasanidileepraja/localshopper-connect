
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  Phone, 
  HelpCircle, 
  FileText,
  Send,
  Video,
  ChevronRight,
  Mail,
  UserCog,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

export const RetailerSupport = () => {
  const { toast } = useToast();
  const [chatOpen, setChatOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  
  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to our support team.",
    });
    setChatMessage("");
  };

  const handleSubmitTicket = () => {
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Ticket Submitted",
      description: "Your support ticket has been submitted successfully. Ticket ID: SUP-" + Math.floor(10000 + Math.random() * 90000),
    });
    
    setTicketSubject("");
    setTicketDescription("");
    setTicketOpen(false);
  };

  const openHelpCenter = () => {
    toast({
      title: "Help Center",
      description: "Opening the retailer help center...",
    });
  };

  const openVideoTutorials = () => {
    setVideoDialogOpen(true);
  };

  const startSupportCall = () => {
    setCallDialogOpen(true);
  };

  const contactAccountManager = () => {
    toast({
      title: "Account Manager",
      description: "Contacting your dedicated account manager...",
    });
  };

  // Sample support tickets
  const tickets = [
    { 
      id: "SUP-12345", 
      subject: "Payment processing issue", 
      status: "open", 
      date: "2023-09-15", 
      lastUpdated: "1 day ago"
    },
    { 
      id: "SUP-12344", 
      subject: "Inventory sync problem", 
      status: "in-progress", 
      date: "2023-09-12", 
      lastUpdated: "3 hours ago"
    },
    { 
      id: "SUP-12343", 
      subject: "Customer order cancellation", 
      status: "resolved", 
      date: "2023-09-08", 
      lastUpdated: "2 days ago"
    }
  ];

  // Sample chat history
  const chatHistory = [
    { id: "1", sender: "support", message: "Hello! How can I assist you today?", time: "10:30 AM" },
    { id: "2", sender: "retailer", message: "I'm having trouble with inventory syncing", time: "10:31 AM" },
    { id: "3", sender: "support", message: "I understand. Let me check your account settings. One moment please.", time: "10:32 AM" },
    { id: "4", sender: "support", message: "Could you please try refreshing your inventory page and then click the 'Sync' button?", time: "10:34 AM" }
  ];

  // Video tutorials list
  const videoTutorials = [
    { id: "1", title: "Getting Started with NearMart Retailer Dashboard", duration: "5:32" },
    { id: "2", title: "Managing Your Product Inventory", duration: "8:15" },
    { id: "3", title: "Processing and Fulfilling Orders", duration: "6:43" },
    { id: "4", title: "Setting Up Promotions and Discounts", duration: "7:21" },
    { id: "5", title: "Understanding Analytics and Reports", duration: "9:05" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Open Tickets</p>
              <p className="text-xl font-bold">2</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <Phone className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Support Calls</p>
              <p className="text-xl font-bold">24/7</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-purple-100 p-3 rounded-full">
              <HelpCircle className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Help Articles</p>
              <p className="text-xl font-bold">120+</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Support Options</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2" 
                onClick={() => setChatOpen(true)}
              >
                <MessageSquare className="h-8 w-8 text-primary" />
                <span>Live Chat</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                onClick={startSupportCall}
              >
                <Phone className="h-8 w-8 text-green-600" />
                <span>Call Support</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                onClick={openHelpCenter}
              >
                <HelpCircle className="h-8 w-8 text-blue-600" />
                <span>Help Center</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                onClick={openVideoTutorials}
              >
                <Video className="h-8 w-8 text-purple-600" />
                <span>Video Tutorials</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                onClick={() => setTicketOpen(true)}
              >
                <FileText className="h-8 w-8 text-orange-600" />
                <span>Create Ticket</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto py-6 flex flex-col items-center justify-center gap-2"
                onClick={contactAccountManager}
              >
                <UserCog className="h-8 w-8 text-indigo-600" />
                <span>Account Manager</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-3">
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-primary" />
                  Retailer Guidelines
                </span>
                <ExternalLink className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <Video className="h-4 w-4 mr-2 text-primary" />
                  Onboarding Videos
                </span>
                <ExternalLink className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  Contact Us
                </span>
                <ExternalLink className="h-4 w-4" />
              </Button>
              
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 text-primary" />
                  FAQs
                </span>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-4">Recent Support Interactions</h3>
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex items-start justify-between border-b pb-3">
                <div>
                  <div className="flex items-center">
                    <span className="font-medium">{ticket.id}</span>
                    <Badge 
                      variant={
                        ticket.status === "open" ? "secondary" : 
                        ticket.status === "in-progress" ? "default" : 
                        "outline"
                      } 
                      className="ml-2 capitalize"
                    >
                      {ticket.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{ticket.subject}</p>
                  <p className="text-xs text-gray-500 mt-1">Last updated: {ticket.lastUpdated}</p>
                </div>
                <Button size="sm" variant="outline">
                  View Details
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Live Chat Dialog */}
      <Dialog open={chatOpen} onOpenChange={setChatOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Support Chat</DialogTitle>
            <DialogDescription>
              Chat with our support team for immediate assistance
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="border rounded-md h-[300px] overflow-y-auto p-4 space-y-3">
              {chatHistory.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "support" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.sender === "support" 
                        ? "bg-gray-100 text-gray-800" 
                        : "bg-primary text-white"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <div 
                      className={`text-xs mt-1 ${
                        msg.sender === "support" ? "text-gray-500" : "text-primary-foreground/70"
                      }`}
                    >
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Input 
                placeholder="Type your message..." 
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Ticket Dialog */}
      <Dialog open={ticketOpen} onOpenChange={setTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Support Ticket</DialogTitle>
            <DialogDescription>
              Describe your issue and our team will respond as soon as possible
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="subject" className="text-sm font-medium block mb-1">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Brief description of the issue"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="text-sm font-medium block mb-1">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Please provide detailed information about your issue"
                rows={5}
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setTicketOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitTicket}>
              Submit Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Support Call Dialog */}
      <Dialog open={callDialogOpen} onOpenChange={setCallDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Call Support</DialogTitle>
            <DialogDescription>
              Choose how you'd like to connect with our support team
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <Button onClick={() => {
              toast({
                title: "Support Call",
                description: "Initiating support call...",
              });
              setCallDialogOpen(false);
            }} className="h-auto py-4 flex flex-col items-center gap-2">
              <Phone className="h-6 w-6" />
              <span>Call Now</span>
              <span className="text-xs text-muted-foreground">Immediate Support</span>
            </Button>
            
            <Button variant="outline" onClick={() => {
              toast({
                title: "Call Scheduled",
                description: "A callback has been scheduled. Our team will call you shortly.",
              });
              setCallDialogOpen(false);
            }} className="h-auto py-4 flex flex-col items-center gap-2">
              <Phone className="h-6 w-6" />
              <span>Request Callback</span>
              <span className="text-xs text-muted-foreground">Within 30 minutes</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Tutorials Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Video Tutorials</DialogTitle>
            <DialogDescription>
              Learn how to use all features of the retailer dashboard
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {videoTutorials.map((video) => (
              <Button
                key={video.id}
                variant="ghost"
                className="w-full justify-between h-auto py-3"
                onClick={() => {
                  toast({
                    title: "Playing Video Tutorial",
                    description: `Playing "${video.title}"`,
                  });
                }}
              >
                <div className="flex items-center">
                  <Video className="h-5 w-5 mr-3 text-primary" />
                  <div className="text-left">
                    <p>{video.title}</p>
                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
