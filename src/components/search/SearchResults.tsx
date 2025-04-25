
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Clock, Smartphone, Laptop, Headphones, Camera, Watch, Tv, Speaker, Gamepad } from "lucide-react";
import { motion } from "framer-motion";

interface SearchResultsProps {
  recentSearches: string[];
  onSelectSearch: (search: string) => void;
}

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

export const SearchResults = ({ recentSearches, onSelectSearch }: SearchResultsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Command className="rounded-xl border border-white/20 dark:border-gray-700/30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-xl overflow-hidden">
        <CommandEmpty className="py-6 text-center text-sm text-gray-500">
          No results found.
        </CommandEmpty>
        
        {recentSearches.length > 0 && (
          <CommandGroup heading="Recent Searches" className="px-2">
            {recentSearches.map((search) => (
              <CommandItem
                key={search}
                onSelect={() => onSelectSearch(search)}
                className="rounded-lg flex items-center gap-2 cursor-pointer text-sm py-2 px-3 hover:bg-gray-100/70 dark:hover:bg-gray-700/70"
              >
                <Clock className="h-4 w-4 text-gray-500" />
                <span>{search}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
        
        <CommandGroup heading="Popular Searches" className="px-2">
          {POPULAR_SEARCHES.map(({ name, icon: Icon }) => (
            <CommandItem
              key={name}
              onSelect={() => onSelectSearch(name)}
              className="rounded-lg flex items-center gap-2 cursor-pointer text-sm py-2 px-3 hover:bg-gray-100/70 dark:hover:bg-gray-700/70"
            >
              <Icon className="h-4 w-4 text-gray-500" />
              <span>{name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </Command>
    </motion.div>
  );
};
