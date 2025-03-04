import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  CreditCard, 
  Download, 
  DollarSign,
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  ArrowUpDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const PaymentManagement = () => {
  const { toast } = useToast();
  
  const handleDownloadStatement = () => {
    toast({
      title: "Download Statement",
      description: "Your statement is being generated and will download shortly.",
    });
  };

  const handleSetupPaymentMethod = () => {
    toast({
      title: "Add Payment Method",
      description: "Opening payment method setup wizard...",
    });
  };

  const handleConfigurePayment = (type: string) => {
    toast({
      title: "Configure Payment",
      description: `Configuring ${type} payment settings...`,
    });
  };

  const handleScheduleChange = () => {
    toast({
      title: "Payout Schedule",
      description: "Opening payout schedule settings...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold">Payments & Financials</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-1" />
            This Month
          </Button>
          <Button size="sm" onClick={handleDownloadStatement}>
            <Download className="h-4 w-4 mr-1" />
            Statement
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Available Balance</p>
              <p className="text-xl font-bold">₹42,580</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-xl font-bold">₹1.24L</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Payout</p>
              <p className="text-xl font-bold">₹18,320</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="mr-4 bg-purple-100 p-3 rounded-full">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Monthly Growth</p>
              <p className="text-xl font-bold">+12.5%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="bank-details">Bank Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Recent Transactions</h3>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Sort
                </Button>
              </div>
              
              <div className="border rounded-md">
                <div className="grid grid-cols-5 gap-4 p-3 border-b bg-gray-50 font-medium text-sm">
                  <div>Transaction ID</div>
                  <div>Date</div>
                  <div>Description</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                
                {[
                  { id: "TXN78945", date: "2023-09-14", desc: "Order #10045", amount: 4999, status: "completed" },
                  { id: "TXN78944", date: "2023-09-14", desc: "Order #10044", amount: 89999, status: "pending" },
                  { id: "TXN78943", date: "2023-09-13", desc: "Order #10043", amount: 12499, status: "completed" },
                  { id: "TXN78942", date: "2023-09-12", desc: "Order #10042", amount: 6249, status: "completed" },
                  { id: "TXN78941", date: "2023-09-11", desc: "Payout", amount: -35000, status: "completed" }
                ].map((tx, index, arr) => (
                  <div 
                    key={tx.id}
                    className={`grid grid-cols-5 gap-4 p-3 items-center ${
                      index !== arr.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <div className="font-medium">{tx.id}</div>
                    <div>{new Date(tx.date).toLocaleDateString()}</div>
                    <div>{tx.desc}</div>
                    <div className={tx.amount < 0 ? 'text-red-500' : 'text-green-500'}>
                      {tx.amount < 0 ? '-' : '+'}₹{Math.abs(tx.amount).toLocaleString()}
                    </div>
                    <div>
                      <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="capitalize">
                        {tx.status === "completed" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <Clock className="h-3 w-3 mr-1" />
                        )}
                        {tx.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-4">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  View All Transactions
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment-methods" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-4">Supported Payment Methods</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-center">
                    <div className="mr-3 bg-green-100 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Online Payments</h4>
                      <p className="text-sm text-gray-600">Accept UPI, cards, and wallets</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <Badge variant="outline" className="justify-center">UPI</Badge>
                    <Badge variant="outline" className="justify-center">Cards</Badge>
                    <Badge variant="outline" className="justify-center">NetBanking</Badge>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleConfigurePayment("online")}>
                      Configure
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-center">
                    <div className="mr-3 bg-blue-100 p-2 rounded-full">
                      <DollarSign className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Cash on Delivery</h4>
                      <p className="text-sm text-gray-600">Accept cash payments on delivery</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <Badge className="w-full justify-center py-1">Enabled</Badge>
                  </div>
                  <div className="mt-3">
                    <Button size="sm" variant="outline" className="w-full" onClick={() => handleConfigurePayment("cod")}>
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button className="w-full" onClick={handleSetupPaymentMethod}>
                  Add Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bank-details" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Bank Account Details</h3>
                <Button variant="outline" size="sm">
                  Edit Details
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="border rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Account Holder</p>
                      <p className="font-medium">Rahul Electronics</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bank Name</p>
                      <p className="font-medium">HDFC Bank</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Number</p>
                      <p className="font-medium">XXXX XXXX 1234</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">IFSC Code</p>
                      <p className="font-medium">HDFC0001234</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="font-medium mb-2">Payout Schedule</h3>
                <div className="border rounded-md p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Current Schedule</p>
                    <Badge>Weekly</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Payouts are processed every Monday for the previous week</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={handleScheduleChange}>
                    Change Schedule
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
