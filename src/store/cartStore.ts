
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/shop";

/** Represents a cart item in global store */
interface CartItem extends Product {
  shopName: string;
  currentPrice: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  cartTotal: number;
  addToCart: (product: Product, shopName: string) => void;
  removeFromCart: (productId: string) => void;
  updateItemPrice: (productId: string, newPrice: number) => void;
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
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) {
            console.log("Product already exists in cart");
            return state;
          }
          
          const updated = [
            ...state.items,
            { ...product, shopName, currentPrice: product.price },
          ];
          
          console.log("Updated cart:", updated);
          console.log("Updated cart length:", updated.length);
          
          return {
            items: updated,
            totalItems: updated.length,
            cartTotal: updated.reduce((sum, i) => sum + i.currentPrice, 0),
          };
        });
      },
      removeFromCart: (productId) => {
        console.log("Removing from cart:", productId);
        set((state) => {
          const updated = state.items.filter((item) => item.id !== productId);
          return {
            items: updated,
            totalItems: updated.length,
            cartTotal: updated.reduce((sum, i) => sum + i.currentPrice, 0),
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
            cartTotal: updated.reduce((sum, i) => sum + i.currentPrice, 0),
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
