
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Search, UserCog, Shield, Eye, EyeOff, CheckCircle, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UserManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock users data
  const users = [
    { 
      id: "USR-1001", 
      name: "Raj Malhotra", 
      email: "raj@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2023-09-15 14:25",
      permissions: ["Full access"]
    },
    { 
      id: "USR-1002", 
      name: "Priya Singh", 
      email: "priya@example.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2023-09-15 10:12",
      permissions: ["Orders", "Products", "Customers"]
    },
    { 
      id: "USR-1003", 
      name: "Ajay Kumar", 
      email: "ajay@example.com",
      role: "Support",
      status: "Active",
      lastLogin: "2023-09-14 16:45",
      permissions: ["Customers", "Orders"]
    },
    { 
      id: "USR-1004", 
      name: "Neha Sharma", 
      email: "neha@example.com",
      role: "Inventory",
      status: "Active",
      lastLogin: "2023-09-14 09:30",
      permissions: ["Products", "Inventory"]
    },
    { 
      id: "USR-1005", 
      name: "Vikram Reddy", 
      email: "vikram@example.com",
      role: "Analytics",
      status: "Inactive",
      lastLogin: "2023-09-01 11:20",
      permissions: ["Analytics", "Reports"]
    }
  ];
  
  const getRoleBadge = (role: string) => {
    switch(role) {
      case "Admin":
        return <Badge className="bg-purple-500"><Shield className="mr-1 h-3 w-3" /> Admin</Badge>;
      case "Manager":
        return <Badge className="bg-blue-500"><UserCog className="mr-1 h-3 w-3" /> Manager</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Active":
        return <Badge className="bg-green-500"><CheckCircle className="mr-1 h-3 w-3" /> Active</Badge>;
      case "Inactive":
        return <Badge variant="secondary"><EyeOff className="mr-1 h-3 w-3" /> Inactive</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const filteredUsers = searchTerm ? 
    users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    ) : users;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">User & Roles Management</h2>
          <p className="text-muted-foreground">Configure custom user permissions and access controls</p>
        </div>
        <Button onClick={() => {
          toast({
            title: "Add User",
            description: "New user account creation wizard launched."
          });
        }}>
          Add User
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total User Accounts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">1,483</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-green-500">12</div>
            <p className="text-xs text-muted-foreground">Currently logged in</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Permission Groups</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Custom role configurations</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Control user access and permissions</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search by name, email or role..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.map((perm, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "Edit User",
                            description: `Editing user ${user.name}`,
                          });
                        }}>
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                          toast({
                            title: "View User",
                            description: `Viewing activity for ${user.name}`,
                          });
                        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No users match your search
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Role Permissions Matrix
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">Role permissions configuration matrix would appear here</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              User Activity Logs
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center bg-muted/50 rounded-md">
            <div className="text-muted-foreground">User activity and audit logs would appear here</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
