
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-md border-input bg-background"
          >
            {theme === 'dark' ? (
              <Moon className="h-[1.2rem] w-[1.2rem] text-foreground" />
            ) : theme === 'light' ? (
              <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
            ) : (
              <Sun className="h-[1.2rem] w-[1.2rem] text-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle theme</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
