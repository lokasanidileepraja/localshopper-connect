
import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
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
  totalItems: number; // Add a property to track total items
  cartTotal: number;  // Add a property to track cart total
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [cartTotal, setCartTotal] = useState<number>(0);

  // Update total items and cart total whenever items change
  useEffect(() => {
    setTotalItems(items.length);
    setCartTotal(items.reduce((sum, item) => sum + item.currentPrice, 0));
  }, [items]);

  const addToCart = (product: Product, shopName: string) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems;
      }
      return [...prevItems, { 
        ...product, 
        shopName, 
        currentPrice: product.price 
      }];
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
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateItemPrice,
      totalItems,
      cartTotal
    }}>
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
