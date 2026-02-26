import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Address {
  id: string;
  name: string;
  phone: string;
  houseNo: string;
  area: string;
  landmark: string;
  city: string;
  pincode: string;
  type: "home" | "work" | "other";
  isDefault: boolean;
}

interface AddressState {
  addresses: Address[];
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefault: (id: string) => void;
  getDefault: () => Address | undefined;
}

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      addresses: [
        {
          id: "addr-1",
          name: "Rahul Sharma",
          phone: "9876543210",
          houseNo: "42, 12th Main",
          area: "Indiranagar",
          landmark: "Near BDA Complex",
          city: "Bangalore",
          pincode: "560038",
          type: "home",
          isDefault: true,
        },
        {
          id: "addr-2",
          name: "Rahul Sharma",
          phone: "9876543210",
          houseNo: "WeWork Galaxy",
          area: "Residency Rd",
          landmark: "Near UB City",
          city: "Bangalore",
          pincode: "560025",
          type: "work",
          isDefault: false,
        },
      ],
      addAddress: (address) =>
        set((state) => {
          const id = `addr-${Date.now()}`;
          const newAddr = { ...address, id };
          if (newAddr.isDefault) {
            return {
              addresses: [
                ...state.addresses.map((a) => ({ ...a, isDefault: false })),
                newAddr,
              ],
            };
          }
          if (state.addresses.length === 0) newAddr.isDefault = true;
          return { addresses: [...state.addresses, newAddr] };
        }),
      updateAddress: (id, updates) =>
        set((state) => ({
          addresses: state.addresses.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),
      deleteAddress: (id) =>
        set((state) => {
          const remaining = state.addresses.filter((a) => a.id !== id);
          if (remaining.length > 0 && !remaining.some((a) => a.isDefault)) {
            remaining[0].isDefault = true;
          }
          return { addresses: remaining };
        }),
      setDefault: (id) =>
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),
      getDefault: () => {
        const state = get();
        return state.addresses.find((a) => a.isDefault) || state.addresses[0];
      },
    }),
    { name: "user-addresses" }
  )
);
