import React from "react";
import { createContext, useContext, useState } from "react";
import { Product } from "@/types/shop";

interface CartItem extends Product {
  shopName: string;
  currentPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, shopName: string) => void;
  removeFromCart: (productId: string) => void;
  updateItemPrice: (productId: string, newPrice: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, shopName: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, { ...product, shopName, currentPrice: product.price }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateItemPrice = (productId: string, newPrice: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, currentPrice: newPrice } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateItemPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};