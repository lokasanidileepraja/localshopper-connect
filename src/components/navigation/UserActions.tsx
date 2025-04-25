
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  User, 
  HelpCircle,
  Store,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { TooltipWrapper } from "@/components/common/TooltipWrapper";

export const UserActions = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <TooltipWrapper content="Retailer dashboard">
        <Link to="/retailer">
          <Button 
            variant={isMobile ? "ghost" : "outline"}
            size={isMobile ? "icon" : "sm"}
            className={`relative ${isMobile ? 'rounded-md' : 'rounded-md'} hover:bg-primary hover:text-primary-foreground`}
            aria-label="Retailer dashboard"
          >
            <Store className="h-5 w-5" />
            {!isMobile && <span className="ml-1">Retailer</span>}
          </Button>
        </Link>
      </TooltipWrapper>

      <DropdownMenu>
        <TooltipWrapper content="Account menu">
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-md text-foreground hover:bg-secondary"
              aria-label="Account menu"
            >
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipWrapper>
        <DropdownMenuContent align="end" className="w-56 mt-2 bg-popover text-popover-foreground border border-border shadow-lg">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/qa" className="w-full cursor-pointer">
              <HelpCircle className="h-4 w-4 mr-2" />
              Help & FAQ
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/onboarding" className="w-full cursor-pointer">
              <Users className="h-4 w-4 mr-2" />
              App Tour
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
