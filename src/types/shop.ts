
export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  image?: string;
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
}
