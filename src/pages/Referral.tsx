
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Share, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";

export default function Referral() {
  const { toast } = useToast();
  const [referralCode] = useLocalStorage<string>("referral-code", "TL" + Math.random().toString(36).substring(2, 8).toUpperCase());
  const [emailInput, setEmailInput] = useState("");
  const [isInviting, setIsInviting] = useState(false);
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://techlocator.app/join?ref=${referralCode}`);
    toast({
      title: "Copied to clipboard!",
      description: "Share this link with your friends to earn rewards",
    });
  };
  
  const shareReferral = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Join TechLocator',
          text: 'Find the best electronics deals near you!',
          url: `https://techlocator.app/join?ref=${referralCode}`,
        });
      } else {
        copyToClipboard();
      }
    } catch (err) {
      copyToClipboard();
    }
  };
  
  const inviteFriend = () => {
    if (!emailInput.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    setIsInviting(true);
    // Simulate sending email
    setTimeout(() => {
      setIsInviting(false);
      setEmailInput("");
      toast({
        title: "Invitation sent!",
        description: `We've sent an invite to ${emailInput}`,
      });
    }, 1500);
  };
  
  // Mocked stats data
  const referralData = {
    invitesSent: 3,
    signups: 1,
    pointsEarned: 50,
    nextReward: 100
  };
  
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Invite Friends & Earn Rewards</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Link</CardTitle>
            <CardDescription>Share this link to earn points for each friend who joins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex rounded-md shadow-sm mb-4">
              <Input 
                className="rounded-r-none"
                readOnly 
                value={`techlocator.app/join?ref=${referralCode}`} 
              />
              <Button 
                onClick={copyToClipboard}
                className="rounded-l-none"
                variant="secondary"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={copyToClipboard}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button 
                className="w-full" 
                onClick={shareReferral}
              >
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Invite via Email</CardTitle>
            <CardDescription>Send a direct invitation to your friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="friend@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <Button 
                onClick={inviteFriend} 
                disabled={isInviting || !emailInput}
              >
                {isInviting ? "Sending..." : "Invite"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Your Referral Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{referralData.invitesSent}</p>
                  <p className="text-sm text-muted-foreground">Invites Sent</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{referralData.signups}</p>
                  <p className="text-sm text-muted-foreground">Sign-ups</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{referralData.pointsEarned}</p>
                  <p className="text-sm text-muted-foreground">Points Earned</p>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{referralData.nextReward}</p>
                  <p className="text-sm text-muted-foreground">Next Reward At</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <p className="text-sm text-muted-foreground">
                You'll earn 50 points for each friend who signs up, and they'll get 25 bonus points!
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
