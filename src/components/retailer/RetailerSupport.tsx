
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, PhoneCall, HelpCircle, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SupportChatModal } from "./modals/SupportChatModal";
import { SupportTicketModal } from "./modals/SupportTicketModal";

export const RetailerSupport = () => {
  const { toast } = useToast();
  const [chatModalOpen, setChatModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [helpCenterOpen, setHelpCenterOpen] = useState(false);
  const [videosOpen, setVideosOpen] = useState(false);

  const handleSupportAction = (action: string) => {
    switch(action) {
      case "Start Chat":
        setChatModalOpen(true);
        break;
      case "Call Now":
        toast({
          title: "Support Call",
          description: "Calling support line: +1-800-NEARMART",
        });
        // In a real app, this would trigger a call functionality
        window.open("tel:+18006327628");
        break;
      case "View Articles":
        setHelpCenterOpen(true);
        toast({
          title: "Help Center",
          description: "Opening knowledge base articles...",
        });
        break;
      case "Watch Videos":
        setVideosOpen(true);
        toast({
          title: "Video Tutorials",
          description: "Loading video tutorials library...",
        });
        break;
      case "Create Ticket":
        setTicketModalOpen(true);
        break;
    }
  };

  // Sample support options and interactions
  const supportOptions = [
    {
      title: "Chat with Support",
      description: "Get quick answers to your questions through our chat support",
      icon: MessageSquare,
      action: "Start Chat"
    },
    {
      title: "Call Support",
      description: "Talk to our support team directly via phone",
      icon: PhoneCall,
      action: "Call Now"
    },
    {
      title: "Help Center",
      description: "Browse our knowledge base for tutorials and FAQs",
      icon: HelpCircle,
      action: "View Articles"
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step video guides for common tasks",
      icon: Video,
      action: "Watch Videos"
    },
    {
      title: "Submit Ticket",
      description: "Create a support ticket for complex issues",
      icon: FileText,
      action: "Create Ticket"
    }
  ];

  // Placeholder content for when help center or videos are open
  const renderHelpCenter = () => (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Help Center</h2>
        <div className="space-y-4">
          {[
            { title: "Getting Started Guide", description: "Learn the basics of using NearMart for your retail business" },
            { title: "Inventory Management", description: "Tips and tricks for managing your product inventory efficiently" },
            { title: "Payment Processing", description: "Understanding the payment options and reconciliation process" },
            { title: "Order Fulfillment", description: "Best practices for handling customer orders in a timely manner" },
            { title: "Account Settings", description: "How to configure your retailer account settings and preferences" }
          ].map((article, index) => (
            <div key={index} className="border p-4 rounded-md hover:bg-gray-50 cursor-pointer">
              <h3 className="font-medium">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.description}</p>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setHelpCenterOpen(false)}
          className="mt-4 text-primary font-medium"
        >
          Back to Support
        </button>
      </CardContent>
    </Card>
  );

  const renderVideoTutorials = () => (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Quick Start Guide", duration: "5:32", thumbnail: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=300" },
            { title: "Setting Up Your Store", duration: "8:45", thumbnail: "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=300" },
            { title: "Managing Inventory", duration: "7:20", thumbnail: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=300" },
            { title: "Processing Orders", duration: "6:15", thumbnail: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300" }
          ].map((video, index) => (
            <div key={index} className="border rounded-md overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 relative">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[16px] border-l-primary ml-1"></div>
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium">{video.title}</h3>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={() => setVideosOpen(false)}
          className="mt-4 text-primary font-medium"
        >
          Back to Support
        </button>
      </CardContent>
    </Card>
  );

  // Main content display logic
  return (
    <div className="space-y-6">
      {helpCenterOpen ? (
        renderHelpCenter()
      ) : videosOpen ? (
        renderVideoTutorials()
      ) : (
        <>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">How can we help you?</h2>
              <p className="text-gray-500 mb-6">
                Choose from the options below to get the support you need for your retail business.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {supportOptions.map((option) => (
                  <Card key={option.title} className="border hover:shadow-md transition-shadow">
                    <CardContent className="p-5 flex flex-col items-center text-center">
                      <div className="bg-primary/10 p-3 rounded-full mb-4">
                        <option.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-2">{option.title}</h3>
                      <p className="text-sm text-gray-500 mb-4">{option.description}</p>
                      <button 
                        onClick={() => handleSupportAction(option.action)}
                        className="mt-auto bg-primary/10 hover:bg-primary/20 text-primary font-medium px-4 py-2 rounded-md transition-colors"
                      >
                        {option.action}
                      </button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Support Interactions</h2>
              <div className="space-y-4">
                {[
                  { id: 1, type: "Ticket", title: "Payment processing error", status: "Open", date: "2 days ago" },
                  { id: 2, type: "Chat", title: "How to create a promotion", status: "Resolved", date: "1 week ago" },
                  { id: 3, type: "Call", title: "Inventory sync issue", status: "In Progress", date: "3 days ago" }
                ].map((interaction) => (
                  <div key={interaction.id} className="flex items-center justify-between border-b pb-3">
                    <div>
                      <div className="flex items-center">
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded mr-2">
                          {interaction.type}
                        </span>
                        <p className="font-medium">{interaction.title}</p>
                      </div>
                      <p className="text-sm text-gray-500">{interaction.date}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-1 rounded text-xs mr-2 ${
                        interaction.status === "Open" 
                          ? "bg-yellow-100 text-yellow-800" 
                          : interaction.status === "Resolved" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-blue-100 text-blue-800"
                      }`}>
                        {interaction.status}
                      </span>
                      <button 
                        onClick={() => {
                          if (interaction.type === "Ticket") {
                            setTicketModalOpen(true);
                          } else if (interaction.type === "Chat") {
                            setChatModalOpen(true);
                          } else {
                            toast({
                              title: "View Interaction",
                              description: `Viewing details for ${interaction.type.toLowerCase()}: ${interaction.title}`
                            });
                          }
                        }}
                        className="text-primary text-sm"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <SupportChatModal open={chatModalOpen} onOpenChange={setChatModalOpen} />
      <SupportTicketModal open={ticketModalOpen} onOpenChange={setTicketModalOpen} />
    </div>
  );
};
