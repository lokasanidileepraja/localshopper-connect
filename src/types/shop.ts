
export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  image?: string;
  description?: string;
  model?: string;
  brand?: string;
  rating?: number;
  stock?: number;
  reviewCount?: number;
  originalPrice?: number;
  variants?: string[];
  variantsInfo?: {
    name: string;
    image: string;
  }[];
  emiOptions?: {
    duration: number;
    monthlyAmount: number;
  }[];
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  phone: string;
  products: Product[];
  coordinates?: [number, number];
  category?: string;
  image?: string;
  isVerified?: boolean;
  lastUpdated?: string;
}
