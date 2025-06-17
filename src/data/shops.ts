
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

export const ELECTRONICS_SHOPS: Shop[] = [
  {
    id: "1",
    name: "Tech Store Delhi",
    address: "Connaught Place, New Delhi",
    distance: "0.5 km",
    rating: 4.5,
    isOpen: true,
    phone: "+91 9876543210",
    products: [
      {
        id: "p1",
        name: "iPhone 15 Pro",
        price: 134900,
        inStock: true,
        category: "mobile",
        image: "/placeholder.svg"
      },
      {
        id: "p2",
        name: "Samsung Galaxy S24",
        price: 89999,
        inStock: false,
        category: "mobile"
      }
    ]
  },
  {
    id: "2",
    name: "Mobile Hub",
    address: "Karol Bagh, New Delhi",
    distance: "1.2 km",
    rating: 4.2,
    isOpen: true,
    phone: "+91 9876543211",
    products: [
      {
        id: "p3",
        name: "iPhone 15 Pro",
        price: 132900,
        inStock: true,
        category: "mobile"
      },
      {
        id: "p4",
        name: "MacBook Pro",
        price: 199000,
        inStock: true,
        category: "laptop"
      }
    ]
  },
  {
    id: "3",
    name: "Electronics Plus",
    address: "Lajpat Nagar, New Delhi",
    distance: "2.1 km",
    rating: 4.0,
    isOpen: false,
    phone: "+91 9876543212",
    products: [
      {
        id: "p5",
        name: "AirPods Pro",
        price: 24900,
        inStock: true,
        category: "audio"
      }
    ]
  },
  {
    id: "4",
    name: "Gadget World",
    address: "Janpath, New Delhi",
    distance: "0.8 km",
    rating: 4.7,
    isOpen: true,
    phone: "+91 9876543213",
    products: [
      {
        id: "p6",
        name: "iPhone 15 Pro",
        price: 135900,
        inStock: true,
        category: "mobile"
      },
      {
        id: "p7",
        name: "iPad Pro",
        price: 119900,
        inStock: true,
        category: "tablet"
      }
    ]
  }
];
