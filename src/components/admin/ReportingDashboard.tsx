import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileChart, BarChart, Download, Calendar, FileText, Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function ReportingDashboard() {
  const { toast } = useToast();
  
  const handleExportReport = (reportType: string) => {
    toast({
      title: "Report Export Started",
      description: `Your ${reportType} report is being prepared for download.`
    });
  };
  
  // Mock scheduled reports
  const scheduledReports = [
    {
      id: "REP-001",
      name: "Weekly Sales Summary",
      frequency: "Weekly",
      lastRun: "2023-09-12 08:00",
      recipients: ["management@example.com"],
      status: "Active"
    },
    {
      id: "REP-002",
      name: "Monthly Financial Report",
      frequency: "Monthly",
      lastRun: "2023-09-01 08:00",
      recipients: ["finance@example.com", "ceo@example.com"],
      status: "Active"
    },
    {
      id: "REP-003",
      name: "Low Inventory Alert",
      frequency: "Daily",
      lastRun: "2023-09-15 08:00",
      recipients: ["inventory@example.com"],
      status: "Active"
    },
    {
      id: "REP-004",
      name: "Customer Satisfaction Survey",
      frequency: "Quarterly",
      lastRun: "2023-07-01 09:00",
      recipients: ["customer-success@example.com"],
      status: "Paused"
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Reporting Dashboard</h2>
          <p className="text-muted-foreground">Automated reporting and business intelligence</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Date Range
          </Button>
          <Button onClick={() => handleExportReport("Custom")}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Generate and download various reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sales">
              <TabsList className="mb-4">
                <TabsTrigger value="sales">Sales Reports</TabsTrigger>
                <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
                <TabsTrigger value="customers">Customer Reports</TabsTrigger>
                <TabsTrigger value="financial">Financial Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sales" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Sales by Category</CardTitle>
                      <CardDescription>Product category performance analysis</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
                        <BarChart className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => handleExportReport("Sales by Category")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Sales by Location</CardTitle>
                      <CardDescription>Geographical sales distribution</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
                        <BarChart className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleExportReport("Sales by Location")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Sales Trends</CardTitle>
                      <CardDescription>Weekly and monthly sales patterns</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
                        <BarChart className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleExportReport("Sales Trends")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Top Selling Products</CardTitle>
                      <CardDescription>Best performing products by volume</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="h-40 flex items-center justify-center bg-muted/50 rounded-md">
                        <BarChart className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleExportReport("Top Selling Products")}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Other tab contents would be similar but with different reports */}
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>Automatic report generation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scheduledReports.map((report) => (
                <div key={report.id} className="border rounded-md p-3 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-sm flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {report.name}
                      </h4>
                      <p className="text-muted-foreground text-xs mt-1">ID: {report.id}</p>
                    </div>
                    <Badge variant={report.status === "Active" ? "default" : "secondary"}>
                      {report.status}
                    </Badge>
                  </div>
                  
                  <div className="text-sm space-y-1">
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">Frequency: </span> 
                      <span className="ml-1">{report.frequency}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">Last run: </span> 
                      <span className="ml-1">{report.lastRun}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                      <span className="text-muted-foreground">Recipients: </span> 
                      <span className="ml-1 truncate" title={report.recipients.join(", ")}>
                        {report.recipients.join(", ")}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-1">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => {
                      toast({
                        title: "Report Settings",
                        description: `Editing schedule for ${report.name}`,
                      });
                    }}>
                      Edit
                    </Button>
                    <Button size="sm" className="w-full" onClick={() => {
                      toast({
                        title: "Report Generated",
                        description: `${report.name} has been generated immediately`,
                      });
                    }}>
                      Run Now
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button className="w-full" onClick={() => {
                toast({
                  title: "New Report Schedule",
                  description: "Creating a new scheduled report",
                });
              }}>
                Schedule New Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Customizable report formats</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Executive Summary</TableCell>
                <TableCell>High-level summary for management</TableCell>
                <TableCell>PDF, Excel</TableCell>
                <TableCell>System</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Edit Template",
                      description: "Editing Executive Summary template",
                    });
                  }}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Detailed Analytics</TableCell>
                <TableCell>In-depth analysis with charts</TableCell>
                <TableCell>PDF, PowerPoint</TableCell>
                <TableCell>Raj Malhotra</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Edit Template",
                      description: "Editing Detailed Analytics template",
                    });
                  }}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Financial Statement</TableCell>
                <TableCell>Complete financial reports</TableCell>
                <TableCell>Excel, CSV</TableCell>
                <TableCell>System</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => {
                    toast({
                      title: "Edit Template",
                      description: "Editing Financial Statement template",
                    });
                  }}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
