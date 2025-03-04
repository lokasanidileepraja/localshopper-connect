
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, 
  MessageCircle, 
  Send, 
  Phone,
  User,
  Info,
  Settings,
  ChevronRight,
  Smartphone,
  Bot,
  Check,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export const CustomerInteraction = () => {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  const [customerDetailsOpen, setCustomerDetailsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [quickRepliesOpen, setQuickRepliesOpen] = useState(false);
  
  // Sample customer chat data
  const chatList = [
    { 
      id: "1", 
      name: "Rahul Sharma", 
      lastMessage: "Is the iPhone 15 back in stock?", 
      time: "10:30 AM",
      unread: 2,
      phone: "+91 9876543210",
      email: "rahul.sharma@example.com",
      orders: 5,
      totalSpent: "₹78,450",
      lastOrderDate: "15 Sep, 2023"
    },
    { 
      id: "2", 
      name: "Priya Singh", 
      lastMessage: "When will my order be delivered?", 
      time: "Yesterday",
      unread: 0,
      phone: "+91 9876543211",
      email: "priya.singh@example.com",
      orders: 3,
      totalSpent: "₹32,150",
      lastOrderDate: "10 Sep, 2023"
    },
    { 
      id: "3", 
      name: "Ajay Patel", 
      lastMessage: "Thank you for the quick response!", 
      time: "Yesterday",
      unread: 0,
      phone: "+91 9876543212",
      email: "ajay.patel@example.com",
      orders: 8,
      totalSpent: "₹1,28,750",
      lastOrderDate: "12 Sep, 2023"
    },
  ];

  // Sample messages for the selected chat
  const messages = [
    { id: "1", text: "Hello, I wanted to check if the iPhone 15 Pro is back in stock?", sender: "customer", time: "10:25 AM" },
    { id: "2", text: "Hi Rahul, we're expecting a shipment this week. Would you like me to notify you when it arrives?", sender: "store", time: "10:27 AM" },
    { id: "3", text: "Yes, please. That would be great!", sender: "customer", time: "10:28 AM" },
    { id: "4", text: "Sure, I've added a notification for you. Also, would you prefer the 128GB or 256GB model?", sender: "store", time: "10:29 AM" },
    { id: "5", text: "Is the iPhone 15 back in stock?", sender: "customer", time: "10:30 AM" },
  ];

  // Quick reply templates
  const quickReplies = [
    { id: "1", text: "Thank you for your message. How can I assist you today?" },
    { id: "2", text: "Your order has been processed and will be shipped within 24 hours." },
    { id: "3", text: "We're checking our inventory and will get back to you shortly." },
    { id: "4", text: "Would you like me to suggest some alternatives that are currently in stock?" },
    { id: "5", text: "Is there anything else you'd like to know about this product?" },
    { id: "6", text: "We apologize for the inconvenience. Let me help resolve this issue for you." }
  ];

  const selectedCustomer = chatList.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the customer.",
    });
    setMessageInput("");
  };

  const handleSetupWhatsApp = () => {
    toast({
      title: "WhatsApp Integration",
      description: "Setting up WhatsApp Business integration...",
    });
  };

  const handleSetupAutoReplies = () => {
    toast({
      title: "Auto-Replies",
      description: "Opening auto-reply configuration...",
    });
  };

  const handleConfigureNotifications = (type: string) => {
    toast({
      title: "Configure Notifications",
      description: `Opening ${type} notification settings...`,
    });
  };

  const handleCustomerCall = () => {
    toast({
      title: "Initiating Call",
      description: `Calling ${selectedCustomer?.name} at ${selectedCustomer?.phone}`,
    });
  };

  const useQuickReply = (text: string) => {
    setMessageInput(text);
    setQuickRepliesOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Chats</p>
              <p className="text-xl font-bold">12</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <User className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">New Customers</p>
              <p className="text-xl font-bold">7</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-yellow-100 p-3 rounded-full">
              <Info className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Response Time</p>
              <p className="text-xl font-bold">5 min</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chat">
        <TabsList>
          <TabsTrigger value="chat">
            <MessageCircle className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="mt-4">
          <div className="border rounded-md grid grid-cols-12 min-h-[500px]">
            {/* Chat list sidebar */}
            <div className="col-span-12 md:col-span-4 border-r">
              <div className="p-3 border-b">
                <Input placeholder="Search conversations..." />
              </div>
              <div className="overflow-y-auto max-h-[460px]">
                {chatList.map((chat) => (
                  <div 
                    key={chat.id}
                    className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                      selectedChat === chat.id ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="font-medium">{chat.name}</div>
                      <div className="text-xs text-gray-500">{chat.time}</div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1 truncate">{chat.lastMessage}</div>
                    {chat.unread > 0 && (
                      <Badge className="mt-1">{chat.unread} new</Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Chat content */}
            <div className="col-span-12 md:col-span-8 flex flex-col">
              {selectedChat ? (
                <>
                  <div className="p-3 border-b flex justify-between items-center">
                    <div>
                      <div className="font-medium">{selectedCustomer?.name}</div>
                      <div className="text-xs text-gray-500">Online</div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" onClick={handleCustomerCall}>
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setCustomerDetailsOpen(true)}>
                        <Info className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setQuickRepliesOpen(true)}>
                        <MessageSquare className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-3 overflow-y-auto space-y-3 max-h-[374px]">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex ${
                          message.sender === "store" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div 
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender === "store" 
                              ? "bg-primary text-white" 
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <p>{message.text}</p>
                          <div 
                            className={`text-xs mt-1 ${
                              message.sender === "store" ? "text-primary-foreground/70" : "text-gray-500"
                            }`}
                          >
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-3 border-t mt-auto">
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Type your message..." 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                      />
                      <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center p-6 text-center text-gray-500">
                  <div>
                    <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>Select a conversation to start chatting</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="settings" className="mt-4">
          <Card>
            <CardContent className="p-4 space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Communication Channels</h3>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 bg-green-100 p-2 rounded-full">
                        <Smartphone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">WhatsApp Integration</h4>
                        <p className="text-sm text-gray-600">Connect your store with WhatsApp for Business</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSetupWhatsApp}>
                      Setup
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-3 bg-blue-100 p-2 rounded-full">
                        <Bot className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Automated Responses</h4>
                        <p className="text-sm text-gray-600">Set up auto-replies for common questions</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSetupAutoReplies}>
                      Configure
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Notification Settings</h3>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">New Message Alerts</p>
                      <p className="text-sm text-gray-600">Get notified when you receive new messages</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => handleConfigureNotifications("message")}>Configure</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-600">Get daily summaries of customer interactions</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => handleConfigureNotifications("email")}>Configure</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-sm text-gray-600">Set your availability for customer inquiries</p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" onClick={() => handleConfigureNotifications("hours")}>Configure</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Quick Replies</h3>
                <Button onClick={() => setSettingsOpen(true)}>
                  Manage Quick Replies
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Customer Details Dialog */}
      {selectedCustomer && (
        <Dialog open={customerDetailsOpen} onOpenChange={setCustomerDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Customer Details</DialogTitle>
              <DialogDescription>
                View detailed information about this customer
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{selectedCustomer.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="font-medium">{selectedCustomer.orders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="font-medium">{selectedCustomer.totalSpent}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Order</p>
                  <p className="font-medium">{selectedCustomer.lastOrderDate}</p>
                </div>
              </div>
              
              <div className="pt-3 space-y-2">
                <p className="font-medium">Recent Orders</p>
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #10045</p>
                      <p className="text-sm text-gray-500">15 Sep, 2023</p>
                    </div>
                    <Badge>Delivered</Badge>
                  </div>
                </div>
                <div className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Order #10032</p>
                      <p className="text-sm text-gray-500">2 Sep, 2023</p>
                    </div>
                    <Badge>Delivered</Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setCustomerDetailsOpen(false)}>
                Close
              </Button>
              <Button onClick={() => {
                toast({
                  title: "View Profile",
                  description: `Opening full profile for ${selectedCustomer.name}`,
                });
                setCustomerDetailsOpen(false);
              }}>
                View Full Profile
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Quick Reply Settings Dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Reply Templates</DialogTitle>
            <DialogDescription>
              Manage your quick replies to common customer inquiries
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {quickReplies.map((reply) => (
              <div key={reply.id} className="flex items-start justify-between border-b pb-3">
                <p className="text-sm flex-1 pr-4">{reply.text}</p>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="sm">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Check className="h-4 w-4" />
                    </Button>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 border-t">
            <div className="space-y-2">
              <label htmlFor="newReply" className="text-sm font-medium">
                Add New Quick Reply
              </label>
              <Textarea
                id="newReply"
                placeholder="Enter a new quick reply template..."
                className="min-h-[80px]"
              />
            </div>
            <Button className="mt-2">
              Add Template
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Replies Dialog */}
      <Dialog open={quickRepliesOpen} onOpenChange={setQuickRepliesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Quick Replies</DialogTitle>
            <DialogDescription>
              Choose a pre-written response or customize it
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {quickReplies.map((reply) => (
              <Button
                key={reply.id}
                variant="outline"
                className="w-full justify-start h-auto py-3 px-4 text-left"
                onClick={() => useQuickReply(reply.text)}
              >
                {reply.text}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
