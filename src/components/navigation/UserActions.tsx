
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  HelpCircle,
  Store,
  Users,
  Shield
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
    <div className="flex items-center gap-2">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <TooltipWrapper content="Retailer Dashboard">
          <Link to="/retailer">
            <Button 
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm hover:bg-primary/20 hover:text-primary transition-all duration-300"
            >
              <Store className="h-[18px] w-[18px]" />
            </Button>
          </Link>
        </TooltipWrapper>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <TooltipWrapper content="Admin Dashboard">
          <Link to="/admin">
            <Button 
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm hover:bg-primary/20 hover:text-primary transition-all duration-300"
            >
              <Shield className="h-[18px] w-[18px]" />
            </Button>
          </Link>
        </TooltipWrapper>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <TooltipWrapper content="Help & FAQ">
          <Link to="/qa">
            <Button 
              variant="ghost"
              size="icon"
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm hover:bg-primary/20 hover:text-primary transition-all duration-300"
            >
              <HelpCircle className="h-[18px] w-[18px]" />
            </Button>
          </Link>
        </TooltipWrapper>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm hover:bg-primary/20 hover:text-primary transition-all duration-300"
            >
              <Users className="h-[18px] w-[18px]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-56 mt-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/20 dark:border-gray-700/30 shadow-lg rounded-xl animate-in fade-in-80 slide-in-from-top-2"
          >
            <DropdownMenuLabel className="font-medium text-sm">Quick Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200/50 dark:bg-gray-700/50" />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild className="focus:bg-gray-100/50 dark:focus:bg-gray-700/50 rounded-lg my-0.5 cursor-pointer transition-colors">
                <Link to="/qa" className="w-full cursor-pointer flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2 opacity-70" />
                  <span>Help & FAQ</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="focus:bg-gray-100/50 dark:focus:bg-gray-700/50 rounded-lg my-0.5 cursor-pointer transition-colors">
                <Link to="/onboarding" className="w-full cursor-pointer flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>App Tour</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </div>
  );
};
