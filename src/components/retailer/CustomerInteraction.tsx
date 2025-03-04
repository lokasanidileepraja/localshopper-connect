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
  Bot
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CustomerInteraction = () => {
  const { toast } = useToast();
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  
  // Sample customer chat data
  const chatList = [
    { 
      id: "1", 
      name: "Rahul Sharma", 
      lastMessage: "Is the iPhone 15 back in stock?", 
      time: "10:30 AM",
      unread: 2
    },
    { 
      id: "2", 
      name: "Priya Singh", 
      lastMessage: "When will my order be delivered?", 
      time: "Yesterday",
      unread: 0
    },
    { 
      id: "3", 
      name: "Ajay Patel", 
      lastMessage: "Thank you for the quick response!", 
      time: "Yesterday",
      unread: 0
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
                    <div>
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
