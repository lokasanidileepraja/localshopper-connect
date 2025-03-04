
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Mail, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type TeamMemberModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMember?: {
    id: string;
    name: string;
    role: string;
    email: string;
    access: string;
  };
};

export const TeamMemberModal = ({ open, onOpenChange, editMember }: TeamMemberModalProps) => {
  const { toast } = useToast();
  const [name, setName] = useState(editMember?.name || "");
  const [email, setEmail] = useState(editMember?.email || "");
  const [role, setRole] = useState(editMember?.role || "Staff");
  const [access, setAccess] = useState(editMember?.access || "limited");
  
  const isEditMode = !!editMember;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name.trim() || !email.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit the form
    toast({
      title: isEditMode ? "Team Member Updated" : "Team Member Added",
      description: isEditMode
        ? `${name}'s information has been updated successfully.`
        : `${name} has been added to your team.`,
    });
    
    onOpenChange(false);
    
    // Reset form if not editing
    if (!isEditMode) {
      setName("");
      setEmail("");
      setRole("Staff");
      setAccess("limited");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            {isEditMode ? "Edit Team Member" : "Add New Team Member"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">Full Name</label>
            <Input 
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter team member's full name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">Email Address</label>
            <Input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">Role</label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Owner">Owner</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Inventory Executive">Inventory Executive</SelectItem>
                <SelectItem value="Sales Executive">Sales Executive</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="access" className="text-sm font-medium">Access Level</label>
            <Select value={access} onValueChange={setAccess}>
              <SelectTrigger>
                <SelectValue placeholder="Select access level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Access</SelectItem>
                <SelectItem value="moderate">Moderate Access</SelectItem>
                <SelectItem value="limited">Limited Access</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Add Team Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
