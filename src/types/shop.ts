export interface Product {
  id: string;
  name: string;
  category: "mobile" | "laptop" | "accessory";
  price: number;
  brand: string;
  model: string;
  inStock: boolean;
  image?: string;
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