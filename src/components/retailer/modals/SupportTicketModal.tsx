
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type SupportTicketModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const SupportTicketModal = ({ open, onOpenChange }: SupportTicketModalProps) => {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("technical");
  const [description, setDescription] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!subject.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit the form
    toast({
      title: "Ticket Submitted",
      description: "Your support ticket has been successfully created. We'll respond shortly.",
    });
    
    onOpenChange(false);
    
    // Reset form
    setSubject("");
    setCategory("technical");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Create Support Ticket
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <Input 
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Brief description of your issue"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical">Technical Issue</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">Description</label>
            <Textarea 
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide as much detail as possible..."
              rows={5}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="attachments" className="text-sm font-medium">Attachments (optional)</label>
            <div className="border border-dashed rounded-md p-4 text-center">
              <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">Drag and drop files here or click to browse</p>
              <input type="file" className="hidden" id="attachments" multiple />
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => document.getElementById("attachments")?.click()}
              >
                Browse Files
              </Button>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Submit Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
