
import { LucideIcon } from 'lucide-react';

export interface Category {
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
  slug?: string; // Optional slug for routing
  imageUrl?: string; // Optional image URL for better visual representation
  parentCategory?: string; // Optional parent category for hierarchical structures
  featured?: boolean; // Optional flag for featured categories
  position?: number; // Optional position for sorting
  metadata?: Record<string, any>; // Optional metadata for extensibility
}

export interface CategoryCardProps {
  category: Category;
  onSelect: (name: string) => void;
  isSelected: boolean;
  index: number;
}

// Category display types for different layouts
export type CategoryDisplayType = 'grid' | 'list' | 'compact';

// Simple category selector return type
export interface CategorySelectionResult {
  name: string;
  slug?: string;
}

// Helper types for optimized category handling
export interface CategoryFilterOptions {
  featured?: boolean;
  parent?: string;
  searchTerm?: string;
}

export type CategorySortOrder = 'alphabetical' | 'featured' | 'custom';
