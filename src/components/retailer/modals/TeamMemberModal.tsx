
import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type TeamMemberType = {
  id?: string;
  name?: string;
  role?: string;
  email?: string;
  access?: string;
};

interface TeamMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editMember?: TeamMemberType | null;
}

export const TeamMemberModal = ({ 
  open, 
  onOpenChange,
  editMember = null
}: TeamMemberModalProps) => {
  const isEditing = !!editMember;
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<TeamMemberType>({
    name: editMember?.name || "",
    role: editMember?.role || "",
    email: editMember?.email || "",
    access: editMember?.access || "limited"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.role) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form data
    if (isEditing) {
      toast({
        title: "Team Member Updated",
        description: `${formData.name}'s information has been updated successfully`
      });
    } else {
      toast({
        title: "Team Member Added",
        description: `${formData.name} has been added to your team`
      });
    }
    
    // Reset form and close modal
    setFormData({
      name: "",
      role: "",
      email: "",
      access: "limited"
    });
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Team Member" : "Add New Team Member"}</DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Update team member information and access permissions" 
              : "Add a new member to your store team and set their access level"}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. Manager, Inventory Executive"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="access">Access Level</Label>
            <select 
              id="access"
              name="access"
              value={formData.access}
              onChange={handleChange}
              className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md"
            >
              <option value="full">Full Access</option>
              <option value="moderate">Moderate Access</option>
              <option value="limited">Limited Access</option>
            </select>
          </div>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Member" : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
