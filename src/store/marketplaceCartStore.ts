import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/data/marketplace";

interface CartStore {
  items: CartItem[];
  storeId: string | null;
  storeName: string | null;
  fulfillment: "delivery" | "pickup";
  totalItems: number;
  cartTotal: number;
  deliveryFee: number;
  addToCart: (item: CartItem) => "added" | "conflict";
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  setFulfillment: (type: "delivery" | "pickup") => void;
  clearCart: () => void;
  // Force add: clears cart and adds from new store
  forceAddToCart: (item: CartItem) => void;
}

const recalc = (items: CartItem[]) => ({
  totalItems: items.reduce((s, i) => s + i.quantity, 0),
  cartTotal: items.reduce((s, i) => s + i.price * i.quantity, 0),
});

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      storeId: null,
      storeName: null,
      fulfillment: "delivery",
      totalItems: 0,
      cartTotal: 0,
      deliveryFee: 0,

      addToCart: (item) => {
        const state = get();
        // Enforce single-store rule
        if (state.storeId && state.storeId !== item.storeId) {
          return "conflict";
        }

        const existing = state.items.findIndex((i) => i.productId === item.productId && i.variant === item.variant);
        let updated: CartItem[];

        if (existing >= 0) {
          updated = state.items.map((i, idx) =>
            idx === existing ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          updated = [...state.items, item];
        }

        set({
          items: updated,
          storeId: item.storeId,
          storeName: item.storeName,
          ...recalc(updated),
        });
        return "added";
      },

      forceAddToCart: (item) => {
        set({
          items: [item],
          storeId: item.storeId,
          storeName: item.storeName,
          ...recalc([item]),
        });
      },

      removeFromCart: (productId) => {
        const updated = get().items.filter((i) => i.productId !== productId);
        if (updated.length === 0) {
          set({ items: [], storeId: null, storeName: null, totalItems: 0, cartTotal: 0 });
        } else {
          set({ items: updated, ...recalc(updated) });
        }
      },

      updateQuantity: (productId, qty) => {
        if (qty < 1) return;
        const updated = get().items.map((i) =>
          i.productId === productId ? { ...i, quantity: qty } : i
        );
        set({ items: updated, ...recalc(updated) });
      },

      setFulfillment: (type) => set({ fulfillment: type }),

      clearCart: () =>
        set({ items: [], storeId: null, storeName: null, totalItems: 0, cartTotal: 0, deliveryFee: 0 }),
    }),
    { name: "marketplace-cart" }
  )
);
