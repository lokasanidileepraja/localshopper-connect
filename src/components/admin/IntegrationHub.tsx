
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link, CheckCircle, AlertCircle, Settings, ExternalLink, Mail, DollarSign, MessageSquare } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

export function IntegrationHub() {
  const { toast } = useToast();
  
  const handleToggleIntegration = (name: string, active: boolean) => {
    toast({
      title: active ? "Integration Enabled" : "Integration Disabled",
      description: `${name} integration has been ${active ? "enabled" : "disabled"}.`,
    });
  };
  
  const handleConfigureIntegration = (name: string) => {
    toast({
      title: "Configure Integration",
      description: `Opening configuration settings for ${name} integration.`,
    });
  };
  
  // Mock integrations data
  const integrations = [
    {
      id: "INT-001",
      name: "Salesforce CRM",
      category: "CRM",
      status: "Connected",
      lastSync: "5 minutes ago",
      icon: <MessageSquare className="h-5 w-5 text-blue-500" />
    },
    {
      id: "INT-002",
      name: "Mailchimp",
      category: "Email Marketing",
      status: "Connected",
      lastSync: "1 hour ago",
      icon: <Mail className="h-5 w-5 text-yellow-500" />
    },
    {
      id: "INT-003",
      name: "Stripe",
      category: "Payment Gateway",
      status: "Connected",
      lastSync: "2 minutes ago",
      icon: <DollarSign className="h-5 w-5 text-purple-500" />
    },
    {
      id: "INT-004",
      name: "Zendesk",
      category: "Support",
      status: "Disconnected",
      lastSync: "Never",
      icon: <MessageSquare className="h-5 w-5 text-green-500" />
    }
  ];
  
  // Mock APIs data
  const apis = [
    {
      id: "API-001",
      name: "Orders API",
      endpoint: "/api/v1/orders",
      status: "Active",
      requests: "24.5K / day",
      latency: "45ms"
    },
    {
      id: "API-002",
      name: "Products API",
      endpoint: "/api/v1/products",
      status: "Active",
      requests: "105K / day",
      latency: "38ms"
    },
    {
      id: "API-003",
      name: "Users API",
      endpoint: "/api/v1/users",
      status: "Active",
      requests: "67.2K / day",
      latency: "41ms"
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Integration Hub</h2>
          <p className="text-muted-foreground">Connect and manage external services and APIs</p>
        </div>
        <Button onClick={() => {
          toast({
            title: "New Integration",
            description: "Adding a new third-party integration",
          });
        }}>
          <Link className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Connected Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">External integrations</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">API Uptime</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-green-500">99.98%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily API Requests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">253K</div>
            <p className="text-xs text-green-500">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Integration Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-green-500">0</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Third-Party Integrations</CardTitle>
          <CardDescription>Manage connections to external services and platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Integration</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {integrations.map((integration) => (
                <TableRow key={integration.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {integration.icon}
                      <span className="font-medium">{integration.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{integration.category}</TableCell>
                  <TableCell>
                    {integration.status === "Connected" ? (
                      <Badge className="bg-green-500 flex items-center w-fit gap-1">
                        <CheckCircle className="h-3 w-3" /> Connected
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center w-fit gap-1">
                        <AlertCircle className="h-3 w-3" /> Disconnected
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{integration.lastSync}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Switch 
                        checked={integration.status === "Connected"} 
                        onCheckedChange={(checked) => handleToggleIntegration(integration.name, checked)} 
                      />
                      <Button variant="outline" size="sm" onClick={() => handleConfigureIntegration(integration.name)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Management</CardTitle>
            <CardDescription>Monitor and manage your API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>API Name</TableHead>
                  <TableHead>Endpoint</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Request Volume</TableHead>
                  <TableHead>Avg. Latency</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apis.map((api) => (
                  <TableRow key={api.id}>
                    <TableCell className="font-medium">{api.name}</TableCell>
                    <TableCell>
                      <code className="bg-muted px-1.5 py-0.5 rounded text-sm">{api.endpoint}</code>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-500">Active</Badge>
                    </TableCell>
                    <TableCell>{api.requests}</TableCell>
                    <TableCell>{api.latency}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "API Documentation",
                            description: `Opening docs for ${api.name}`,
                          });
                        }}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "API Settings",
                            description: `Opening settings for ${api.name}`,
                          });
                        }}>
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Integrations</CardTitle>
            <CardDescription>Discover new services to connect with</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto py-4 px-4 flex items-start justify-start">
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center mb-2">
                    <div className="bg-blue-100 p-2 rounded-full mr-2">
                      <Mail className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="font-medium">HubSpot</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Connect your marketing and sales data</p>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto py-4 px-4 flex items-start justify-start">
                <div className="flex flex-col items-start text-left">
                  <div className="flex items-center mb-2">
                    <div className="bg-green-100 p-2 rounded-full mr-2">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="font-medium">Intercom</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Customer messaging platform</p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Webhooks</CardTitle>
            <CardDescription>Event-driven integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">Order Created</h3>
                  <p className="text-xs text-muted-foreground">Triggers when a new order is placed</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">Payment Received</h3>
                  <p className="text-xs text-muted-foreground">Triggers when payment is completed</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">User Registered</h3>
                  <p className="text-xs text-muted-foreground">Triggers when a new user signs up</p>
                </div>
                <Button variant="outline" size="sm">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
