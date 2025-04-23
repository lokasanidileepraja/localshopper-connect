
import { Input } from "@/components/ui/input";
import { useRef, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  isMobile: boolean;
  className?: string;
}

export const SearchInput = ({ value, onChange, onEnter, isMobile, className }: SearchInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        type="text"
        placeholder={isMobile ? "Search products..." : "Search products... (⌘K)"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-10 ${className}`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter();
          }
        }}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
      </div>
      {!isMobile && !value && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
      )}
    </div>
  );
};
