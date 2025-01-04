import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Smartphone, Laptop, Headphones, Camera, Watch, Tv, Speaker, Gamepad } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const POPULAR_SEARCHES = [
  { name: "iPhone 15", icon: Smartphone },
  { name: "MacBook Air", icon: Laptop },
  { name: "AirPods Pro", icon: Headphones },
  { name: "Sony Camera", icon: Camera },
  { name: "Smart Watch", icon: Watch },
  { name: "4K TV", icon: Tv },
  { name: "Bluetooth Speaker", icon: Speaker },
  { name: "Gaming Console", icon: Gamepad }
];

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      if (!query.trim()) {
        toast({
          title: "Please enter a search term",
          description: "Enter a product or shop name to search",
        });
        return;
      }
      navigate("/shop/TechHub Electronics");
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 sm:py-8">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search products... (⌘K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery);
                }
              }}
            />
            <Button 
              onClick={() => handleSearch(searchQuery)}
              disabled={isLoading}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Search
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[600px] p-0">
          <Command>
            <CommandInput placeholder="Type to search..." />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Popular Searches">
              {POPULAR_SEARCHES.map(({ name, icon: Icon }) => (
                <CommandItem
                  key={name}
                  onSelect={() => {
                    setSearchQuery(name);
                    handleSearch(name);
                  }}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};