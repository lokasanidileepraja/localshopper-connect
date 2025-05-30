
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
  quantity?: number;  // Added quantity as optional property
  emiOptions?: EmiOption[];  // Added EMI options
  // Add missing properties causing TypeScript errors
  variants?: string[];
  variantsInfo?: VariantInfo[];
  reviewCount?: number;
  originalPrice?: number;
}

export interface VariantInfo {
  name: string;
  image: string;
}

export interface EmiOption {
  provider: string;
  tenures: Tenure[];
}

export interface Tenure {
  months: number;
  interestRate: number;
  monthlyAmount: number;
}

export interface Shop {
  id: string;
  name: string;
  category: string;
  rating: number;
  distance: string;
  image: string;
  isOpen: boolean;
  address: string;
  phone: string;
  products: Product[];
  isVerified?: boolean;   // Added verification badge
  lastUpdated?: string;   // Added last updated timestamp
  deliveryOptions?: DeliveryOption[]; // Added delivery options
  price?: number; // Added price for store comparison feature
  inStock?: boolean; // Added inStock property for product availability in the shop
}

export interface DeliveryOption {
  provider: string;
  estimatedTime: string;
  fee: number;
}
