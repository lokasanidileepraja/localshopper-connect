
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/shop";

/** Represents a cart item in global store */
interface CartItem extends Product {
  shopName: string;
  currentPrice: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  cartTotal: number;
  addToCart: (product: Product, shopName: string) => void;
  removeFromCart: (productId: string) => void;
  updateItemPrice: (productId: string, newPrice: number) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      cartTotal: 0,
      addToCart: (product, shopName) => {
        console.log("Adding to cart in store:", product);
        set((state) => {
          // Check if product already exists in cart
          const existingItemIndex = state.items.findIndex((item) => item.id === product.id);
          
          let updated = [...state.items];
          
          if (existingItemIndex >= 0) {
            // Update quantity of existing item
            console.log("Product already exists in cart, updating quantity");
            updated[existingItemIndex] = {
              ...updated[existingItemIndex],
              quantity: (updated[existingItemIndex].quantity || 1) + 1
            };
          } else {
            // Add new item
            console.log("Adding new product to cart");
            updated.push({ 
              ...product, 
              shopName, 
              currentPrice: product.price,
              quantity: 1 
            });
          }
          
          console.log("Updated cart:", updated);
          console.log("Updated cart length:", updated.length);
          
          // Calculate total items (including quantities)
          const totalItems = updated.reduce((sum, item) => sum + (item.quantity || 1), 0);
          
          return {
            items: updated,
            totalItems,
            cartTotal: updated.reduce((sum, item) => sum + (item.currentPrice * (item.quantity || 1)), 0),
          };
        });
      },
      removeFromCart: (productId) => {
        console.log("Removing from cart:", productId);
        set((state) => {
          const updated = state.items.filter((item) => item.id !== productId);
          const totalItems = updated.reduce((sum, item) => sum + (item.quantity || 1), 0);
          
          return {
            items: updated,
            totalItems,
            cartTotal: updated.reduce((sum, item) => sum + (item.currentPrice * (item.quantity || 1)), 0),
          };
        });
      },
      updateItemPrice: (productId, newPrice) => {
        console.log("Updating price:", productId, newPrice);
        set((state) => {
          const updated = state.items.map((item) =>
            item.id === productId ? { ...item, currentPrice: newPrice } : item
          );
          return {
            items: updated,
            cartTotal: updated.reduce((sum, item) => sum + (item.currentPrice * (item.quantity || 1)), 0),
          };
        });
      },
      updateItemQuantity: (productId, quantity) => {
        console.log("Updating quantity:", productId, quantity);
        if (quantity < 1) return;
        
        set((state) => {
          const updated = state.items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          );
          
          const totalItems = updated.reduce((sum, item) => sum + (item.quantity || 1), 0);
          
          return {
            items: updated,
            totalItems,
            cartTotal: updated.reduce((sum, item) => sum + (item.currentPrice * (item.quantity || 1)), 0),
          };
        });
      },
      clearCart: () => set({ items: [], totalItems: 0, cartTotal: 0 }),
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: (state) => {
        console.log("Hydrating cart from storage:", state);
        return (rehydratedState, error) => {
          if (error) {
            console.error("Error rehydrating cart:", error);
          } else if (rehydratedState) {
            console.log("Cart rehydrated:", rehydratedState);
          }
        };
      }
    }
  )
);
