import { Input } from "@/components/ui/input";
import { useRef, useEffect } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  isMobile: boolean;
}

export const SearchInput = ({ value, onChange, onEnter, isMobile }: SearchInputProps) => {
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
    <Input
      ref={inputRef}
      type="text"
      placeholder={isMobile ? "Search products..." : "Search products... (⌘K)"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onEnter();
        }
      }}
    />
  );
};