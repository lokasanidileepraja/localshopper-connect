# TechLocator - Technical Stack & Architecture

## Quick Start for Lovable Recreation

### Step 1: Dependencies to Install

Copy these commands in order:

```bash
# Core UI
npx shadcn-ui@latest init

# Add all shadcn components used
npx shadcn-ui@latest add accordion alert alert-dialog aspect-ratio avatar badge breadcrumb button calendar card carousel chart checkbox collapsible command context-menu dialog drawer dropdown-menu form hover-card input input-otp label menubar navigation-menu pagination popover progress radio-group resizable scroll-area select separator sheet sidebar skeleton slider sonner switch table tabs textarea toast toggle toggle-group tooltip
```

### Step 2: Additional Dependencies

```json
{
  "dependencies": {
    "@hookform/resolvers": "^3.9.0",
    "@tanstack/react-query": "^5.56.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.3.0",
    "framer-motion": "^11.15.0",
    "lucide-react": "^0.462.0",
    "mapbox-gl": "^3.9.2",
    "react-helmet-async": "^2.0.5",
    "react-hook-form": "^7.53.0",
    "react-infinite-scroll-component": "^6.1.0",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.23.8",
    "zustand": "^5.0.2"
  }
}
```

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    React + TypeScript                     │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     │    │
│  │  │  Pages  │  │Components│  │  Hooks  │  │  Store  │     │    │
│  │  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘     │    │
│  │       │            │            │            │           │    │
│  │       └────────────┴────────────┴────────────┘           │    │
│  │                         │                                 │    │
│  │  ┌──────────────────────┴──────────────────────┐         │    │
│  │  │              React Router v6                 │         │    │
│  │  └──────────────────────────────────────────────┘         │    │
│  └─────────────────────────────────────────────────────────┘    │
│                              │                                   │
│  ┌───────────────────────────┼───────────────────────────┐      │
│  │                    STATE LAYER                         │      │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐   │      │
│  │  │ Zustand │  │ Context │  │ Query   │  │LocalStore│   │      │
│  │  │ Stores  │  │ Auth    │  │ Cache   │  │         │   │      │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘   │      │
│  └───────────────────────────────────────────────────────┘      │
│                              │                                   │
│  ┌───────────────────────────┼───────────────────────────┐      │
│  │                    UI LAYER                            │      │
│  │  ┌─────────────────────────────────────────────────┐   │      │
│  │  │               shadcn/ui + Radix                  │   │      │
│  │  └─────────────────────────────────────────────────┘   │      │
│  │  ┌─────────────────────────────────────────────────┐   │      │
│  │  │          Tailwind CSS + Custom Tokens           │   │      │
│  │  └─────────────────────────────────────────────────┘   │      │
│  │  ┌─────────────────────────────────────────────────┐   │      │
│  │  │               Framer Motion                      │   │      │
│  │  └─────────────────────────────────────────────────┘   │      │
│  └───────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                             │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐             │
│  │ Mapbox  │  │Analytics│  │ Future: │  │ Future: │             │
│  │  Maps   │  │         │  │Supabase │  │ Stripe  │             │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Folder Structure (Copy This)

```
src/
├── components/
│   ├── ui/                    # shadcn components (auto-generated)
│   ├── layout/
│   │   └── MainLayout.tsx
│   ├── navigation/
│   │   ├── CategoryNav.tsx
│   │   ├── MobileBottomNav.tsx
│   │   ├── SearchBar.tsx
│   │   └── UserActions.tsx
│   ├── common/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── TooltipWrapper.tsx
│   ├── product/
│   │   ├── ProductDetails.tsx
│   │   ├── FlashDealTimer.tsx
│   │   ├── LowStockAlert.tsx
│   │   └── ReserveButton.tsx
│   ├── cart/
│   │   ├── CartContent.tsx
│   │   ├── CartHeader.tsx
│   │   ├── CartLayout.tsx
│   │   ├── CartList.tsx
│   │   └── CartSummary.tsx
│   ├── price-compare/
│   │   ├── ComparisonTableView.tsx
│   │   ├── EnhancedMapView.tsx
│   │   ├── PriceHistoryView.tsx
│   │   └── RealTimePriceUpdates.tsx
│   ├── search/
│   │   ├── AutocompleteSearch.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── SearchInput.tsx
│   │   └── SearchResults.tsx
│   ├── store/
│   │   ├── NearbyStoreFinder.tsx
│   │   ├── StoreInfo.tsx
│   │   ├── StoreLocator.tsx
│   │   └── StoreMap.tsx
│   ├── auth/
│   │   ├── AuthForm.tsx
│   │   └── ProtectedRoute.tsx
│   ├── profile/
│   │   ├── AddressManager.tsx
│   │   ├── OrderHistory.tsx
│   │   ├── PaymentMethods.tsx
│   │   └── UserProfile.tsx
│   ├── retailer/
│   │   ├── RetailerDashboard.tsx
│   │   ├── ProductManagement.tsx
│   │   ├── InventoryTracking.tsx
│   │   └── OrderManagement.tsx
│   └── gamification/
│       ├── BadgesGrid.tsx
│       ├── PointsDisplay.tsx
│       └── UserPoints.tsx
├── contexts/
│   ├── AuthContext.tsx
│   ├── FeatureFlagContext.tsx
│   └── ThemeContext.tsx
├── hooks/
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   ├── useApi.ts
│   ├── useCategoryFilter.tsx
│   ├── useLocalStorage.ts
│   ├── useProducts.ts
│   └── useSearch.tsx
├── store/
│   ├── cartStore.ts
│   ├── pointsStore.ts
│   ├── searchStore.ts
│   └── userPreferences.ts
├── types/
│   ├── models.ts
│   ├── shop.ts
│   ├── categories.ts
│   └── search.ts
├── data/
│   ├── shops.ts
│   ├── categories.ts
│   └── products/
│       ├── index.ts
│       ├── mobiles.ts
│       ├── laptops.ts
│       ├── audio.ts
│       └── ...
├── lib/
│   ├── utils.ts
│   ├── analytics.ts
│   └── formatters.ts
├── pages/
│   ├── Index.tsx
│   ├── Welcome.tsx
│   ├── Category.tsx
│   ├── ProductDetails.tsx
│   ├── Cart.tsx
│   ├── Checkout.tsx
│   ├── Profile.tsx
│   ├── auth/
│   ├── retailer/
│   └── admin/
├── App.tsx
├── main.tsx
└── index.css
```

---

## Key Implementation Patterns

### 1. Zustand Store Pattern

```typescript
// store/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, shopName: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, shopName) => {
        set((state) => ({
          items: [...state.items, { ...product, shopName, quantity: 1 }]
        }));
      },
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId)
        }));
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: "cart-storage" }
  )
);
```

### 2. Auth Context Pattern

```typescript
// contexts/AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = async (email: string, password: string) => { /* ... */ };
  const logout = async () => { /* ... */ };
  const hasRole = (role: string) => { /* ... */ };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be within AuthProvider");
  return context;
};
```

### 3. Protected Route Pattern

```typescript
// components/auth/ProtectedRoute.tsx
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, hasRole } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" />;
  }
  
  return children;
};
```

### 4. Custom Hook Pattern

```typescript
// hooks/useSearch.tsx
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { addRecentSearch } = useSearchStore();
  
  const handleSearch = useCallback(async (query: string) => {
    setIsLoading(true);
    // Search logic
    addRecentSearch(query);
    setIsLoading(false);
  }, []);
  
  return { searchQuery, setSearchQuery, isLoading, handleSearch };
};
```

### 5. Animation Pattern (Framer Motion)

```typescript
import { motion } from "framer-motion";

// Page wrapper
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {children}
</motion.div>

// Staggered list
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.ul variants={container} initial="hidden" animate="show">
  {items.map((i) => (
    <motion.li key={i.id} variants={item}>{i.name}</motion.li>
  ))}
</motion.ul>
```

---

## Design System Setup

### tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### index.css (Core Tokens)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 14% 14%;
    --primary: 222 47% 40%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 14% 95%;
    --secondary-foreground: 222 14% 14%;
    --muted: 220 14% 96%;
    --muted-foreground: 220 8% 46%;
    --accent: 216 12% 84%;
    --accent-foreground: 222 14% 14%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 220 13% 91%;
    --input: 220 13% 91%;
    --ring: 222 14% 40%;
    --card: 0 0% 100%;
    --card-foreground: 222 14% 14%;
    
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    
    --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --glass-bg: rgba(255, 255, 255, 0.08);
    --glass-border: rgba(255, 255, 255, 0.12);
  }
  
  .dark {
    --background: 222 15% 13%;
    --foreground: 210 20% 98%;
    --primary: 210 80% 60%;
    /* ... dark mode tokens */
  }
}

@layer utilities {
  .glass-card {
    background: var(--glass-bg);
    backdrop-filter: blur(24px) saturate(200%);
    border: 1px solid var(--glass-border);
  }
  
  .hover-lift {
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  
  .hover-lift:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 32px 64px rgba(0, 0, 0, 0.15);
  }
}
```

---

## Recreation Checklist

### Phase 1: Foundation
- [ ] Create new Lovable project
- [ ] Set up Tailwind with custom config
- [ ] Add CSS tokens to index.css
- [ ] Install shadcn/ui components
- [ ] Add remaining dependencies

### Phase 2: Core Components
- [ ] Create type definitions
- [ ] Set up Zustand stores
- [ ] Create AuthContext
- [ ] Build MainLayout
- [ ] Create Navigation component

### Phase 3: Pages
- [ ] Welcome/Landing page
- [ ] Homepage with Hero
- [ ] Category listing
- [ ] Product detail page
- [ ] Cart and Checkout
- [ ] User profile

### Phase 4: Features
- [ ] Search functionality
- [ ] Price comparison
- [ ] Store finder with maps
- [ ] Wishlist
- [ ] Price alerts

### Phase 5: Advanced
- [ ] Retailer dashboard
- [ ] Admin dashboard
- [ ] Analytics integration
- [ ] Backend integration (Lovable Cloud)

---

*Technical Documentation Version: 1.0*
