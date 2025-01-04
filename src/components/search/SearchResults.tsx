import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Clock, Smartphone, Laptop, Headphones, Camera, Watch, Tv, Speaker, Gamepad } from "lucide-react";

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
    <Command>
      <CommandEmpty>No results found.</CommandEmpty>
      {recentSearches.length > 0 && (
        <CommandGroup heading="Recent Searches">
          {recentSearches.map((search) => (
            <CommandItem
              key={search}
              onSelect={() => onSelectSearch(search)}
            >
              <Clock className="mr-2 h-4 w-4" />
              {search}
            </CommandItem>
          ))}
        </CommandGroup>
      )}
      <CommandGroup heading="Popular Searches">
        {POPULAR_SEARCHES.map(({ name, icon: Icon }) => (
          <CommandItem
            key={name}
            onSelect={() => onSelectSearch(name)}
            className="flex items-center gap-2"
          >
            <Icon className="h-4 w-4" />
            {name}
          </CommandItem>
        ))}
      </CommandGroup>
    </Command>
  );
};