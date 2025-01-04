export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
  brand: string;
  model: string;
  inStock: boolean;
}

export interface Shop {
  name: string;
  category: string;
  rating: number;
  distance: string;
  image: string;
  isOpen: boolean;
  products: Product[];
}