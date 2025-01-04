import { LucideIcon } from 'lucide-react';

export interface Category {
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export interface CategoryCardProps {
  category: Category;
  onSelect: (name: string) => void;
  isSelected: boolean;
  index: number;
}