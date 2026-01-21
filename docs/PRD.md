# TechLocator - Product Requirements Document (PRD)

## Executive Summary

**App Name:** TechLocator  
**Tagline:** "Find the best tech near you"  
**Purpose:** AI-powered electronics shopping companion that helps users discover, compare, and purchase electronics from local retailers with intelligent recommendations.

**Target Market:** India (Delhi NCR focused, expandable)  
**Primary Users:** Tech-savvy consumers, students, young professionals looking for electronics

---

## 1. Product Overview

### 1.1 Vision
Create the ultimate electronics shopping experience that bridges online convenience with local retail discovery, enabling users to find the best prices, verify availability, and make informed purchase decisions.

### 1.2 Core Value Propositions
1. **Price Comparison** - Compare prices across multiple local retailers
2. **Store Discovery** - Find nearby electronics stores with real-time availability
3. **Smart Recommendations** - AI-powered product suggestions
4. **Trust & Verification** - Verified retailers with authentic reviews
5. **Gamification** - Rewards and loyalty program

---

## 2. User Personas & Roles

### 2.1 User Roles
| Role | Description | Access Level |
|------|-------------|--------------|
| **Guest** | Unauthenticated visitor | Browse products, view stores, basic search |
| **User** | Registered customer | Full shopping features, wishlist, cart, orders |
| **Retailer** | Store owner/manager | Product management, inventory, orders, analytics |
| **Admin** | Platform administrator | Full system access, reports, user management |

### 2.2 User Model
```typescript
interface User {
  uid: string;
  name: string;
  email: string;
  avatarURL?: string;
  role: "guest" | "user" | "retailer" | "admin";
  points: number;
  wishlist: string[]; // product IDs
  alerts: string[]; // alert IDs
  preferences: {
    darkMode: boolean;
    notifications: boolean;
  };
}
```

---

## 3. Feature Specifications

### 3.1 Product Discovery

#### 3.1.1 Categories
- **Mobiles** - Smartphones from Apple, Samsung, OnePlus, etc.
- **Laptops** - MacBooks, gaming laptops, ultrabooks
- **Audio** - Earbuds, headphones, speakers
- **Wearables** - Smartwatches, fitness bands
- **Gaming** - Consoles, controllers, accessories
- **Accessories** - Cases, chargers, cables
- **Electronics** - General electronics

#### 3.1.2 Product Data Model
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
  category: string;
  image?: string;
  description?: string;
  model?: string;
  brand?: string;
  rating?: number;
  stock?: number;
  reviewCount?: number;
  originalPrice?: number;
  variants?: string[];
  variantsInfo?: {
    name: string;
    image: string;
  }[];
  emiOptions?: {
    duration: number;
    monthlyAmount: number;
  }[];
}
```

#### 3.1.3 Search Features
- **Autocomplete search** with suggestions
- **Voice search** capability
- **Filters**: Category, Brand, Price Range, Rating, In-Stock
- **Sort**: Price (Low-High, High-Low), Rating, Popularity
- **Recent searches** history
- **Trending searches** display

### 3.2 Store Discovery

#### 3.2.1 Store Data Model
```typescript
interface Shop {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  isOpen: boolean;
  phone: string;
  products: Product[];
  coordinates?: [number, number];
  category?: string;
  image?: string;
  isVerified?: boolean;
  lastUpdated?: string;
}
```

#### 3.2.2 Store Features
- **Nearby stores** with distance calculation
- **Map view** with Mapbox integration
- **Store details** with photos, hours, contact
- **Store reviews** and ratings
- **Real-time availability** checking
- **Verified badge** for trusted retailers

### 3.3 Price Comparison

#### 3.3.1 Comparison Features
- **Multi-store comparison** table
- **Price history** charts
- **Bulk purchase** pricing
- **Price alerts** for target prices
- **Real-time price updates**
- **Enhanced map view** showing prices at each location

#### 3.3.2 Price Alert Model
```typescript
interface PriceAlert {
  id: string;
  userId: string;
  productId: string;
  targetPrice: number;
  active: boolean;
  createdAt: string;
}
```

### 3.4 Shopping Cart & Checkout

#### 3.4.1 Cart Features
- **Persistent cart** (localStorage with Zustand)
- **Quantity management**
- **Price updates** tracking
- **Multi-step checkout**
- **EMI options** display
- **Saved cart reminder**

#### 3.4.2 Cart Store
```typescript
interface CartItem extends Product {
  shopName: string;
  currentPrice: number;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  totalItems: number;
  cartTotal: number;
  addToCart: (product, shopName) => void;
  removeFromCart: (productId) => void;
  updateItemPrice: (productId, newPrice) => void;
  updateItemQuantity: (productId, quantity) => void;
  clearCart: () => void;
}
```

### 3.5 User Account Features

#### 3.5.1 Profile Management
- **User profile** with avatar
- **Address manager** (multiple addresses)
- **Payment methods** storage
- **Order history**
- **Notification preferences**

#### 3.5.2 Wishlist
- **Add/remove products**
- **Wishlist value meter**
- **Price drop notifications**
- **Share wishlist**

#### 3.5.3 Gamification
- **Points system** for actions
- **Badges** for achievements
- **Leaderboard** community ranking
- **Referral program**
- **Rewards redemption**

### 3.6 Retailer Dashboard

#### 3.6.1 Retailer Features
- **Product management** (CRUD)
- **Inventory tracking**
- **Order management**
- **Customer interactions**
- **Promotions management**
- **Sales analytics**
- **WhatsApp integration** for stock updates

#### 3.6.2 Dashboard Metrics
- Total sales
- Active orders
- Low stock alerts
- Customer reviews
- Revenue charts

### 3.7 Admin Dashboard

#### 3.7.1 Admin Features
- **User feedback** monitoring
- **Catalog health** checking
- **Store performance** metrics
- **Reports generation**
- **Platform analytics**

---

## 4. Technical Architecture

### 4.1 Tech Stack
| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS + shadcn/ui |
| **State Management** | Zustand (cart, search, preferences) |
| **Routing** | React Router v6 |
| **Forms** | React Hook Form + Zod |
| **Animations** | Framer Motion |
| **Maps** | Mapbox GL |
| **Charts** | Recharts |
| **Data Fetching** | TanStack Query |
| **SEO** | React Helmet Async |

### 4.2 Project Structure
```
src/
├── components/
│   ├── alerts/          # Price alert components
│   ├── auth/            # Authentication components
│   ├── cart/            # Shopping cart components
│   ├── categories/      # Category display components
│   ├── chat/            # Retailer chat components
│   ├── checkout/        # Checkout flow components
│   ├── common/          # Shared components
│   ├── expert/          # Expert services components
│   ├── gamification/    # Points, badges, rewards
│   ├── layout/          # Layout components
│   ├── navigation/      # Nav components
│   ├── onboarding/      # Onboarding flow
│   ├── orders/          # Order components
│   ├── personalization/ # Personalized UX
│   ├── price/           # Price display components
│   ├── price-compare/   # Price comparison features
│   ├── product/         # Product display components
│   ├── profile/         # Profile management
│   ├── reciprocity/     # Coupons, vouchers
│   ├── reservation/     # Product reservation
│   ├── retailer/        # Retailer dashboard
│   ├── reviews/         # Review components
│   ├── search/          # Search components
│   ├── social/          # Social proof elements
│   ├── store/           # Store components
│   ├── tech/            # Tech news
│   └── ui/              # shadcn/ui components
├── contexts/
│   ├── AuthContext.tsx
│   ├── FeatureFlagContext.tsx
│   └── ThemeContext.tsx
├── data/
│   ├── categories.ts
│   ├── products/        # Product data by category
│   └── shops.ts
├── hooks/
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   ├── useApi.ts
│   ├── useCategoryFilter.tsx
│   ├── useKeyboardNav.tsx
│   ├── useLocalStorage.ts
│   ├── useProducts.ts
│   └── useSearch.tsx
├── lib/
│   ├── analytics.ts
│   ├── formatters.ts
│   ├── storage.ts
│   └── utils.ts
├── pages/
│   ├── admin/           # Admin pages
│   ├── auth/            # Auth pages
│   ├── community/       # Community pages
│   └── retailer/        # Retailer pages
├── services/
│   └── api.ts
├── store/
│   ├── cartStore.ts
│   ├── featureFlagStore.ts
│   ├── pointsStore.ts
│   ├── searchStore.ts
│   └── userPreferences.ts
├── types/
│   ├── categories.ts
│   ├── models.ts
│   ├── search.ts
│   └── shop.ts
└── utils/
    ├── mapUtils.ts
    └── priceUtils.ts
```

### 4.3 State Management

#### Zustand Stores
1. **cartStore** - Shopping cart state with persistence
2. **searchStore** - Search history and filters
3. **pointsStore** - Gamification points
4. **userPreferences** - User settings
5. **featureFlagStore** - Feature toggles

### 4.4 Contexts
1. **AuthContext** - Authentication state and methods
2. **ThemeContext** - Dark/light mode
3. **FeatureFlagContext** - A/B testing and feature flags

---

## 5. Page/Screen Inventory

### 5.1 Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Welcome | Landing page with CTAs |
| `/home` | Index | Main homepage with hero, categories, featured |
| `/categories` | AllCategories | Category grid |
| `/category/:name` | Category | Products in category |
| `/brands` | AllBrands | Brand listing |
| `/brands/:name` | Brand | Products by brand |
| `/product/:id` | ProductDetails | Product detail page |
| `/product/:id/reviews` | ProductReviews | Product reviews |
| `/search` | SearchResults | Search results |
| `/price-compare` | PriceCompare | Price comparison tool |
| `/stores` | Stores | Store listing |
| `/store/:name` | StoreDetails | Store detail page |
| `/store/:name/reviews` | StoreReviews | Store reviews |
| `/nearby-stores` | NearbyStores | Map-based store finder |
| `/faq` | FAQ | Frequently asked questions |
| `/contact` | Contact | Contact form |
| `/terms` | Terms | Terms of service |
| `/privacy` | Privacy | Privacy policy |
| `/community/leaderboard` | Leaderboard | Points leaderboard |

### 5.2 Authentication Pages
| Route | Page | Description |
|-------|------|-------------|
| `/login` | Login | User login |
| `/register` | Register | User registration |
| `/onboarding` | Onboarding | New user onboarding flow |

### 5.3 Protected User Pages
| Route | Page | Description |
|-------|------|-------------|
| `/cart` | Cart | Shopping cart |
| `/checkout` | Checkout | Multi-step checkout |
| `/wishlist` | Wishlist | User wishlist |
| `/compare` | Compare | Product comparison |
| `/orders` | Orders | Order history |
| `/orders/:id` | OrderDetails | Order detail |
| `/profile` | Profile | User profile (4 tabs) |
| `/notifications` | Notifications | User notifications |
| `/alerts` | Alerts | Price alerts |
| `/rewards` | Rewards | Rewards center |
| `/referral` | Referral | Referral program |
| `/location-settings` | LocationSettings | Location preferences |

### 5.4 Retailer Pages
| Route | Page | Description |
|-------|------|-------------|
| `/retailer/register` | RetailerRegister | Retailer signup |
| `/retailer` | RetailerDashboard | Main dashboard |
| `/retailer/products` | RetailerProducts | Product management |
| `/retailer/inventory` | RetailerInventory | Stock management |
| `/retailer/orders` | RetailerOrders | Order processing |
| `/retailer/customers` | RetailerCustomers | Customer management |
| `/retailer/promotions` | RetailerPromotions | Promotions |
| `/retailer/reports` | RetailerAnalytics | Analytics |
| `/retailer/settings` | RetailerSettings | Store settings |

### 5.5 Admin Pages
| Route | Page | Description |
|-------|------|-------------|
| `/admin` | AdminDashboard | Admin overview |
| `/admin/user-feedback` | AdminUserFeedback | User feedback |
| `/admin/catalog-health` | AdminCatalogHealth | Catalog monitoring |
| `/admin/store-performance` | AdminStorePerformance | Store metrics |
| `/reports` | Reports | System reports |

---

## 6. Design System

### 6.1 Design Philosophy
**"Digital Luxury with Intelligent Simplicity"**
- Premium, Apple/Samsung inspired aesthetic
- Glassmorphism and depth effects
- Ultra-wide spacing
- Micro-interactions with Framer Motion

### 6.2 Color Tokens (HSL)
```css
/* Light Mode */
--background: 0 0% 100%;
--foreground: 222 14% 14%;
--primary: 222 47% 40%;
--secondary: 220 14% 95%;
--accent: 216 12% 84%;
--muted: 220 14% 96%;
--destructive: 0 84% 60%;

/* Dark Mode */
--background: 222 15% 13%;
--foreground: 210 20% 98%;
--primary: 210 80% 60%;
--secondary: 222 16% 22%;
```

### 6.3 Premium Gradients
```css
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-accent: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

### 6.4 Glassmorphism
```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
}
```

### 6.5 Typography
- **Font Family**: Inter (100-900 weights)
- **Headlines**: -0.02em letter-spacing
- **Body**: -0.01em letter-spacing, 1.5 line-height
- **Feature settings**: "ss01", "ss02" for stylistic alternates

### 6.6 Animations (Framer Motion)
```tsx
// Fade up entrance
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}

// Scale entrance
initial={{ scale: 0.8, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.6, delay: 0.2 }}

// Staggered children
staggerChildren: 0.1
```

### 6.7 Interaction Patterns
- **hover-lift**: translateY(-12px) + scale(1.02) + shadow
- **hover-glow**: box-shadow with primary color
- **magnetic-hover**: scale(1.05) on hover
- **Smooth scroll**: scroll-behavior: smooth

---

## 7. Component Library

### 7.1 shadcn/ui Components Used
- Accordion, Alert, AlertDialog
- Avatar, Badge, Breadcrumb
- Button, Calendar, Card, Carousel
- Chart, Checkbox, Collapsible
- Command, ContextMenu, Dialog
- Drawer, DropdownMenu, Form
- HoverCard, Input, Label
- Menubar, NavigationMenu
- Pagination, Popover, Progress
- RadioGroup, ScrollArea, Select
- Separator, Sheet, Sidebar
- Skeleton, Slider, Switch
- Table, Tabs, Textarea
- Toast, Toggle, Tooltip

### 7.2 Custom Components
- **Hero** - Premium hero section
- **Categories** - Category grid/carousel
- **FeaturedProducts** - Product showcase
- **ShopCard** - Store card component
- **ProductDetails** - Product page
- **PriceComparison** - Comparison table
- **MultiStepCheckout** - Checkout wizard
- **UserPoints** - Gamification display
- **RetailerDashboard** - Store management

---

## 8. User Flows

### 8.1 Product Discovery Flow
```
Welcome → Browse Categories → View Product → Compare Prices → Add to Cart → Checkout
```

### 8.2 Store Discovery Flow
```
Home → Nearby Stores → Map View → Select Store → View Products → Reserve/Purchase
```

### 8.3 Price Alert Flow
```
Product Page → Set Price Alert → Enter Target Price → Confirm → Notification on Price Drop
```

### 8.4 Retailer Onboarding
```
Retailer Register → Business Details → Store Setup → Product Upload → Go Live
```

---

## 9. API Endpoints (To Implement)

### 9.1 Products
- `GET /api/products` - List products
- `GET /api/products/:id` - Get product
- `GET /api/products/search` - Search products
- `GET /api/products/category/:category` - By category

### 9.2 Stores
- `GET /api/stores` - List stores
- `GET /api/stores/nearby` - Nearby stores
- `GET /api/stores/:id` - Store details
- `GET /api/stores/:id/products` - Store products

### 9.3 Users
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `GET /api/users/me` - Current user
- `PUT /api/users/me` - Update profile

### 9.4 Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - User orders
- `GET /api/orders/:id` - Order details

### 9.5 Alerts
- `POST /api/alerts` - Create alert
- `GET /api/alerts` - User alerts
- `DELETE /api/alerts/:id` - Remove alert

---

## 10. Analytics Events

### 10.1 Tracked Events
- `page_view` - Page views
- `add_to_cart` - Cart additions
- `set_price_alert` - Alert creation
- `add_to_wishlist` - Wishlist additions
- `checkout` - Purchase completion
- `user_action` - General user actions

### 10.2 Event Properties
```typescript
trackAddToCart(productId, productName, price, shopName)
trackSetPriceAlert(productId, productName, targetPrice)
trackAddToWishlist(productId, productName)
trackCheckout(orderId, total, items)
```

---

## 11. Dependencies

### 11.1 Core
- react, react-dom (18.3.1)
- react-router-dom (6.26.2)
- typescript

### 11.2 UI
- tailwindcss, tailwind-merge
- tailwindcss-animate
- class-variance-authority
- lucide-react (icons)
- framer-motion (animations)
- shadcn/ui components (@radix-ui/*)

### 11.3 State & Data
- zustand (state management)
- @tanstack/react-query (data fetching)
- zod (validation)
- react-hook-form (forms)

### 11.4 Features
- mapbox-gl (maps)
- recharts (charts)
- date-fns (dates)
- react-helmet-async (SEO)
- sonner (toasts)

---

## 12. Future Roadmap

### Phase 1 (Current)
- ✅ Product discovery
- ✅ Store finder
- ✅ Price comparison
- ✅ Shopping cart
- ✅ Basic auth simulation

### Phase 2
- [ ] Real backend integration (Supabase/Lovable Cloud)
- [ ] Real-time inventory
- [ ] Payment processing
- [ ] Push notifications

### Phase 3
- [ ] AI recommendations
- [ ] AR product preview
- [ ] Voice search
- [ ] Multi-language support

### Phase 4
- [ ] Mobile app (React Native)
- [ ] Seller app
- [ ] B2B marketplace

---

## 13. Recreating in Lovable

### 13.1 Setup Steps
1. Create new Lovable project
2. Install dependencies (see Section 11)
3. Copy type definitions from `/types`
4. Set up Zustand stores from `/store`
5. Import shadcn/ui components
6. Copy design tokens to `index.css`
7. Build pages incrementally

### 13.2 Priority Order
1. Design system (colors, typography, animations)
2. Navigation and layout
3. Homepage with hero
4. Category and product pages
5. Search functionality
6. Cart and checkout
7. User authentication
8. Retailer dashboard
9. Admin dashboard

---

## 14. Figma Screen Guide

### 14.1 Screens to Design
1. **Welcome/Landing** - Hero, stats, feature cards
2. **Home** - Navigation, hero, categories, featured products
3. **Category Page** - Grid of products with filters
4. **Product Detail** - Images, specs, price comparison, add to cart
5. **Search Results** - Results grid with filters sidebar
6. **Store Finder** - Map view with store cards
7. **Store Detail** - Store info, products, reviews
8. **Cart** - Cart items, summary, checkout CTA
9. **Checkout** - Multi-step form (address, payment, confirm)
10. **Profile** - Tabs (profile, orders, addresses, payments)
11. **Wishlist** - Product grid with price tracking
12. **Price Comparison** - Table view, map view, history charts
13. **Notifications** - List of alerts and updates
14. **Retailer Dashboard** - Metrics, charts, quick actions
15. **Admin Dashboard** - Platform analytics, user feedback

### 14.2 Component Library for Figma
- Button variants (primary, secondary, outline, ghost)
- Card variants (product, store, feature)
- Input fields (text, search, select)
- Navigation (desktop, mobile bottom nav)
- Badges (verified, sale, out of stock)
- Modal/Dialog templates
- Toast notifications
- Loading states (skeleton, spinner)

---

*Document Version: 1.0*  
*Last Updated: January 2025*  
*Generated for TechLocator App Recreation*
