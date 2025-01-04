import { Product } from "@/types/shop";

export const products: Record<string, Product[]> = {
  Electronics: [
    {
      id: "smart-tv-1",
      name: "65\" 4K Smart TV",
      price: 89999,
      description: "Ultra HD Smart TV with HDR",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1593784991095-a205069470b6",
      rating: 4.5,
      stock: 10,
      brand: "TechBrand",
      model: "Smart TV 65",
      inStock: true
    },
    {
      id: "tablet-1",
      name: "Pro Tablet 12.9",
      price: 79999,
      description: "Professional tablet for creators",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1561154464-82e9adf32764",
      rating: 4.7,
      stock: 15,
      brand: "TechBrand",
      model: "Pro Tablet",
      inStock: true
    }
  ],
  Mobiles: [
    {
      id: "smartphone-1",
      name: "TechPhone 15 Pro",
      price: 109999,
      description: "Latest flagship smartphone",
      category: "Mobiles",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      rating: 4.8,
      stock: 20,
      brand: "TechBrand",
      model: "TechPhone 15 Pro",
      inStock: true
    },
    {
      id: "smartphone-2",
      name: "TechPhone 15",
      price: 79999,
      description: "Feature-rich smartphone",
      category: "Mobiles",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd",
      rating: 4.6,
      stock: 25,
      brand: "TechBrand",
      model: "TechPhone 15",
      inStock: true
    }
  ],
  Laptops: [
    {
      id: "laptop-1",
      name: "UltraBook Pro",
      price: 129999,
      description: "Premium ultrabook for professionals",
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      rating: 4.9,
      stock: 8,
      brand: "TechBrand",
      model: "UltraBook Pro",
      inStock: true
    },
    {
      id: "laptop-2",
      name: "GameBook Elite",
      price: 149999,
      description: "High-performance gaming laptop",
      category: "Laptops",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      rating: 4.7,
      stock: 5,
      brand: "TechBrand",
      model: "GameBook Elite",
      inStock: true
    }
  ],
  Accessories: [
    {
      id: "accessory-1",
      name: "Wireless Mouse",
      price: 2999,
      description: "Ergonomic wireless mouse",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
      rating: 4.5,
      stock: 50,
      brand: "TechBrand",
      model: "Wireless Mouse",
      inStock: true
    },
    {
      id: "accessory-2",
      name: "Mechanical Keyboard",
      price: 8999,
      description: "RGB mechanical gaming keyboard",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae",
      rating: 4.6,
      stock: 30,
      brand: "TechBrand",
      model: "Mechanical Keyboard",
      inStock: true
    }
  ],
  Audio: [
    {
      id: "audio-1",
      name: "Pro Wireless Earbuds",
      price: 24999,
      description: "Premium wireless earbuds",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
      rating: 4.7,
      stock: 40,
      brand: "TechBrand",
      model: "Pro Wireless Earbuds",
      inStock: true
    },
    {
      id: "audio-2",
      name: "Over-Ear Headphones",
      price: 29999,
      description: "Noise-cancelling headphones",
      category: "Audio",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      rating: 4.8,
      stock: 25,
      brand: "TechBrand",
      model: "Over-Ear Headphones",
      inStock: true
    }
  ],
  Gaming: [
    {
      id: "gaming-1",
      name: "Pro Gaming Console",
      price: 49999,
      description: "Next-gen gaming console",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42",
      rating: 4.9,
      stock: 15,
      brand: "TechBrand",
      model: "Pro Gaming Console",
      inStock: true
    },
    {
      id: "gaming-2",
      name: "VR Headset",
      price: 39999,
      description: "Virtual reality gaming headset",
      category: "Gaming",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
      rating: 4.6,
      stock: 10,
      brand: "TechBrand",
      model: "VR Headset",
      inStock: true
    }
  ],
  Wearables: [
    {
      id: "wearable-1",
      name: "Smart Watch Pro",
      price: 34999,
      description: "Advanced fitness smartwatch",
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
      rating: 4.7,
      stock: 30,
      brand: "TechBrand",
      model: "Smart Watch Pro",
      inStock: true
    },
    {
      id: "wearable-2",
      name: "Fitness Band",
      price: 2999,
      description: "Activity tracking band",
      category: "Wearables",
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
      rating: 4.5,
      stock: 45,
      brand: "TechBrand",
      model: "Fitness Band",
      inStock: true
    }
  ]
};
