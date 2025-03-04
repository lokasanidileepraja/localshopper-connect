import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, PhoneCall, HelpCircle, Video, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const RetailerSupport = () => {
  const { toast } = useToast();

  const handleSupportAction = (action: string) => {
    switch(action) {
      case "Start Chat":
        toast({
          title: "Starting chat",
          description: "Connecting you with our support team...",
        });
        break;
      case "Call Now":
        toast({
          title: "Support Call",
          description: "Calling support line: +1-800-NEARMART",
        });
        break;
      case "View Articles":
        toast({
          title: "Help Center",
          description: "Opening knowledge base articles...",
        });
        break;
      case "Watch Videos":
        toast({
          title: "Video Tutorials",
          description: "Loading video tutorials library...",
        });
        break;
      case "Create Ticket":
        toast({
          title: "Support Ticket",
          description: "Opening ticket creation form...",
        });
        break;
    }
  };

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

  return (
    <div className="space-y-6">
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
                    onClick={() => toast({
                      title: "View Interaction",
                      description: `Viewing details for ${interaction.type.toLowerCase()}: ${interaction.title}`
                    })}
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
    </div>
  );
};
