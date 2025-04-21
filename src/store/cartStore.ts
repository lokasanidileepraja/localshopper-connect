
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
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (exists) return state;
          const updated = [
            ...state.items,
            { ...product, shopName, currentPrice: product.price },
          ];
          return {
            items: updated,
            totalItems: updated.length,
            cartTotal: updated.reduce((sum, i) => sum + i.currentPrice, 0),
          };
        });
      },
      removeFromCart: (productId) => {
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
    }
  )
);
