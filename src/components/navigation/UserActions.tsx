
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
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
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <TooltipWrapper content="Help & FAQ">
          <Link to="/qa">
            <Button 
              variant={isMobile ? "ghost" : "outline"}
              size={isMobile ? "icon" : "sm"}
              className="rounded-md hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              <HelpCircle className="h-5 w-5" />
              {!isMobile && <span className="ml-1">Help</span>}
            </Button>
          </Link>
        </TooltipWrapper>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="rounded-md text-foreground hover:bg-secondary transition-all duration-300"
            >
              <Users className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 mt-2 bg-popover text-popover-foreground border border-border shadow-lg animate-in fade-in-80 slide-in-from-top-2"
          >
            <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
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
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </div>
  );
};
