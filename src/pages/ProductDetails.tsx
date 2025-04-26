
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "@/data/products";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductSpecifications } from "@/components/ProductSpecifications";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductAlerts } from "@/components/ProductAlerts";
import { ProductRecommendations } from "@/components/ProductRecommendations";
import { ShoppingCart, Heart, Bell, Share2, Store, Star, ChevronRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { ShopComparison } from "@/components/ShopComparison";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { WishlistButton } from "@/components/WishlistButton";
import { ShippingInfo } from "@/components/ShippingInfo";
import { ReturnPolicy } from "@/components/ReturnPolicy";
import { ProductVideo } from "@/components/ProductVideo";
import { ReviewSummary } from "@/components/social/ReviewSummary";
import { VerifiedBadge } from "@/components/social/VerifiedBadge";
import { LowStockAlert } from "@/components/product/LowStockAlert";
import { FlashDealTimer } from "@/components/product/FlashDealTimer";
import { WishlistAlertPrompt } from "@/components/onboarding/WishlistAlertPrompt";
import { usePointsStore } from "@/store/pointsStore";
import { trackAddToCart, trackSetPriceAlert, trackAddToWishlist } from "@/lib/analytics";
import { Helmet } from "react-helmet-async";
import { Shop } from "@/types/shop";

interface ProductDetailsState {
  quantity: number;
  selectedVariant: string;
  isAlertSet: boolean;
  isExpanded: boolean;
  activeTab: string;
  selectedShop: string;
  showComparison: boolean;
}

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useCartStore();
  const { toast } = useToast();
  const { addPoints, incrementDealsSaved } = usePointsStore();
  
  const [state, setState] = useState<ProductDetailsState>({
    quantity: 1,
    selectedVariant: "",
    isAlertSet: false,
    isExpanded: false,
    activeTab: "overview",
    selectedShop: "Electronics Hub",
    showComparison: false,
  });
  
  // Find product by ID from all available products
  const allProducts = Object.values(products).flat();
  const product = allProducts.find(p => p.id === productId);
  
  // Calculate if this is a flash deal (for demo purposes - random products get flash deals)
  const isFlashDeal = product ? product.id.charCodeAt(0) % 3 === 0 : false;
  const flashDealEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
  const flashDealDiscount = 15; // 15% off
  
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setState(prev => ({
        ...prev,
        selectedVariant: product.variants[0]
      }));
    }
    
    window.scrollTo(0, 0);
  }, [product, productId]);
  
  if (!product) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p>The product you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, state.selectedShop);
    addPoints(5);
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    });
    
    trackAddToCart(product.id, product.name, product.price, state.selectedShop);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      setState(prev => ({ ...prev, quantity: newQuantity }));
    }
  };
  
  const handleSetPriceAlert = () => {
    setState(prev => ({ ...prev, isAlertSet: true }));
    addPoints(15);
    
    toast({
      title: "Price Alert Set",
      description: `We'll notify you when the price drops below ₹${product.price.toLocaleString()}`,
    });
    
    trackSetPriceAlert(product.id, product.name, product.price);
  };
  
  const handleAddToWishlist = () => {
    addPoints(10);
    trackAddToWishlist(product.id, product.name);
  };
  
  const toggleDescription = () => {
    setState(prev => ({ ...prev, isExpanded: !prev.isExpanded }));
  };
  
  const handleTabChange = (tab: string) => {
    setState(prev => ({ ...prev, activeTab: tab }));
  };
  
  const handleShopSelect = (shopName: string, price: number) => {
    setState(prev => ({ 
      ...prev, 
      selectedShop: shopName,
      showComparison: false
    }));
    
    // Calculate savings for gamification
    const savings = product.originalPrice ? product.originalPrice - price : 0;
    if (savings > 0) {
      incrementDealsSaved(savings);
    }
  };
  
  // Find other shops that sell this product model - properly typed as Shop[]
  const otherShops: Shop[] = product.model ? 
    [
      { 
        id: "shop-1", 
        name: "Tech Corner", 
        price: product.price * 1.05, 
        inStock: true,
        category: "Electronics",
        rating: 4.2,
        distance: "2.5km",
        image: "/placeholder.svg",
        isOpen: true,
        address: "123 Tech Street",
        phone: "123-456-7890",
        products: []
      },
      { 
        id: "shop-2", 
        name: "Digital Plaza", 
        price: product.price * 0.95, 
        inStock: true,
        category: "Electronics",
        rating: 4.0,
        distance: "3.2km",
        image: "/placeholder.svg",
        isOpen: true,
        address: "456 Digital Avenue",
        phone: "987-654-3210",
        products: []
      },
      { 
        id: "shop-3", 
        name: "Gadget World", 
        price: product.price * 1.02, 
        inStock: false,
        category: "Electronics",
        rating: 3.8,
        distance: "4.7km",
        image: "/placeholder.svg",
        isOpen: false,
        address: "789 Gadget Road",
        phone: "555-123-4567",
        products: []
      }
    ] : [];
  
  const selectedVariantInfo = product.variants && product.variantsInfo 
    ? product.variantsInfo.find(v => v.name === state.selectedVariant)
    : null;
    
  // Determine stock level for low stock alerts - random for demo
  const stockLevel = product.inStock ? Math.floor(Math.random() * 20) + 1 : 0;
  
  return (
    <div className="min-h-screen pb-16">
      <Helmet>
        <title>{product.name} | TechLocator</title>
        <meta name="description" content={product.description} />
      </Helmet>
      
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-6">
          <a href="/" className="hover:underline">Home</a>
          <ChevronRight className="h-4 w-4" />
          <a href="/categories" className="hover:underline">Categories</a>
          <ChevronRight className="h-4 w-4" />
          <a href={`/category/${product.category}`} className="hover:underline">{product.category}</a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </div>
        
        {isFlashDeal && (
          <div className="mb-4">
            <FlashDealTimer
              endTime={flashDealEndTime}
              productId={product.id}
              productName={product.name}
              discount={flashDealDiscount}
              originalPrice={product.price}
            />
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={selectedVariantInfo?.image || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              {product.variantsInfo && (
                <div className="flex gap-2 mt-4">
                  {product.variantsInfo.map(variant => (
                    <button
                      key={variant.name}
                      onClick={() => setState(prev => ({ ...prev, selectedVariant: variant.name }))}
                      className={`w-16 h-16 rounded border-2 overflow-hidden flex items-center justify-center ${
                        state.selectedVariant === variant.name 
                          ? 'border-primary' 
                          : 'border-transparent'
                      }`}
                    >
                      <img src={variant.image} alt={variant.name} className="max-w-full max-h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.brand && (
                  <Badge variant="outline">{product.brand}</Badge>
                )}
                <Badge variant="secondary">
                  {product.category}
                </Badge>
                {stockLevel <= 5 && product.inStock ? (
                  <LowStockAlert stock={stockLevel} />
                ) : product.inStock ? (
                  <Badge variant="default" className="bg-green-500">In Stock</Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
              
              {product.model && (
                <p className="text-sm text-muted-foreground mb-2">Model: {product.model}</p>
              )}
              
              <div className="flex items-center gap-2 mb-2">
                <ReviewSummary rating={product.rating || 4} reviewCount={product.reviewCount || 10} />
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <VerifiedBadge type="product" />
              </div>
              
              <div className="flex items-baseline gap-3 mb-4">
                {isFlashDeal ? (
                  <>
                    <span className="text-3xl font-bold text-red-600">
                      ₹{Math.round(product.price * (1 - flashDealDiscount / 100)).toLocaleString()}
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <Badge className="ml-2 bg-red-500" variant="default">
                      {flashDealDiscount}% off
                    </Badge>
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    
                    {product.originalPrice && (
                      <Badge className="ml-2 bg-green-500" variant="default">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </div>
            
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-3">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map(variant => (
                    <Button 
                      key={variant}
                      variant={state.selectedVariant === variant ? "default" : "outline"}
                      className={state.selectedVariant === variant ? "" : "bg-background hover:bg-accent"}
                      size="sm"
                      onClick={() => setState(prev => ({ ...prev, selectedVariant: variant }))}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div>
              <h3 className="text-sm font-medium mb-3">Available at</h3>
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">{state.selectedShop}</div>
                      <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <Store className="h-3.5 w-3.5" />
                        Authorized Retailer
                      </div>
                    </div>
                    {otherShops.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setState(prev => ({ ...prev, showComparison: !prev.showComparison }))}
                      >
                        Compare Prices
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {state.showComparison && (
                <div className="mb-6">
                  <ShopComparison 
                    currentShop={state.selectedShop}
                    price={product.price}
                    otherShops={otherShops}
                    productModel={product.model || ""}
                    onShopSelect={handleShopSelect}
                  />
                </div>
              )}
            </div>
            
            <div className="flex flex-col gap-4">
              <WishlistAlertPrompt
                productId={product.id}
                productName={product.name}
                currentPrice={product.price}
                onWishlistClick={handleAddToWishlist}
                onAlertClick={handleSetPriceAlert}
              />
              
              <Button 
                className="py-6"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
            
            <div>
              <div className="space-y-3 mt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <span className="text-sm">100% Original Product</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Secure Payment</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Tabs value={state.activeTab} onValueChange={handleTabChange} className="mt-12">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="pt-6">
            <div className={`prose max-w-none ${!state.isExpanded && "line-clamp-3"}`}>
              <p className="text-base">{product.description}</p>
            </div>
            {product.description && product.description.length > 150 && (
              <Button variant="link" onClick={toggleDescription} className="mt-2 p-0">
                {state.isExpanded ? "Show Less" : "Read More"}
              </Button>
            )}
            
            <div className="mt-8">
              <ProductRecommendations currentProductId={product.id} />
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="pt-6">
            <ProductSpecifications specifications={[
              { name: "Brand", value: product.brand || "N/A" },
              { name: "Model", value: product.model || "N/A" },
              { name: "Category", value: product.category || "N/A" },
            ]} />
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            <ProductReviews productId={product.id} />
          </TabsContent>
          
          <TabsContent value="shipping" className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <ShippingInfo 
                estimatedDelivery="3-5 business days" 
                shippingCost={0}
              />
              <ReturnPolicy />
            </div>
          </TabsContent>
          
          <TabsContent value="videos" className="pt-6">
            <ProductVideo 
              videoUrl="https://example.com/product-video.mp4"
              thumbnail="https://example.com/thumbnail.jpg"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
