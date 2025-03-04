
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  UserPlus, 
  Shield, 
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TeamMemberModal } from "./modals/TeamMemberModal";

export const UserAccessControl = () => {
  const { toast } = useToast();
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [editMemberOpen, setEditMemberOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState<any>(null);
  
  const handleAddUser = () => {
    setAddMemberOpen(true);
  };

  const handleConfigureAccess = (member: any) => {
    setCurrentMember(member);
    setEditMemberOpen(true);
  };

  const handleCustomizeAccess = () => {
    toast({
      title: "Customize Access",
      description: "Opening access level customization settings...",
    });
  };

  // Sample team members data
  const teamMembers = [
    { 
      id: "1", 
      name: "Rahul Sharma", 
      role: "Owner", 
      email: "rahul@example.com",
      access: "full"
    },
    { 
      id: "2", 
      name: "Priya Singh", 
      role: "Manager", 
      email: "priya@example.com",
      access: "moderate"
    },
    { 
      id: "3", 
      name: "Ajay Patel", 
      role: "Inventory Executive", 
      email: "ajay@example.com",
      access: "limited"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Team Management</h2>
        <Button onClick={handleAddUser}>
          <UserPlus className="h-4 w-4 mr-1" />
          Add Team Member
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-medium">User Access Management</h3>
          </div>
          
          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-3 border-b bg-gray-50 font-medium">
              <div className="col-span-3">Name</div>
              <div className="col-span-3">Role</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Access Level</div>
              <div className="col-span-1 text-right">Actions</div>
            </div>
            
            {teamMembers.map((member, index) => (
              <div 
                key={member.id}
                className={`grid grid-cols-12 gap-4 p-3 items-center ${
                  index !== teamMembers.length - 1 ? 'border-b' : ''
                }`}
              >
                <div className="col-span-3 font-medium">{member.name}</div>
                <div className="col-span-3">{member.role}</div>
                <div className="col-span-3 text-gray-600">{member.email}</div>
                <div className="col-span-2">
                  <Badge 
                    variant={
                      member.access === "full" ? "default" : 
                      member.access === "moderate" ? "secondary" : "outline"
                    }
                    className="capitalize"
                  >
                    {member.access}
                  </Badge>
                </div>
                <div className="col-span-1 text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleConfigureAccess(member)}>
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium mb-4">Access Levels & Permissions</h3>
          
          <div className="space-y-4">
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Full Access</h4>
                <Badge>Owner</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Complete control over all settings, finances, team management, and store data
              </p>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Moderate Access</h4>
                <Badge variant="secondary">Manager</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Can manage products, orders, and customers, but cannot access financial data or change major settings
              </p>
            </div>
            
            <div className="border rounded-md p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Limited Access</h4>
                <Badge variant="outline">Staff</Badge>
              </div>
              <p className="text-sm text-gray-600">
                Restricted to specific tasks like updating inventory or processing orders
              </p>
            </div>
          </div>
          
          <Button className="mt-4" variant="outline" onClick={handleCustomizeAccess}>
            <Settings className="h-4 w-4 mr-1" />
            Customize Access Levels
          </Button>
        </CardContent>
      </Card>

      <TeamMemberModal 
        open={addMemberOpen} 
        onOpenChange={setAddMemberOpen} 
      />
      
      <TeamMemberModal 
        open={editMemberOpen} 
        onOpenChange={setEditMemberOpen}
        editMember={currentMember}
      />
    </div>
  );
};
