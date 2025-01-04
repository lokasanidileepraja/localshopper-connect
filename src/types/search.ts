import { LucideIcon } from "lucide-react";

export interface SearchResult {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
}

export interface PopularSearch {
  name: string;
  icon: LucideIcon;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: Error | null;
}