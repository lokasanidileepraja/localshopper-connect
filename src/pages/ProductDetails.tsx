
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { StarIcon, Plus, Minus, Heart, ShoppingCart, Share2, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { products } from "@/data/products";
import { Product } from "@/types/shop";
import { ELECTRONICS_SHOPS } from "@/data/shops";

const DUMMY_REVIEWS = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    title: "Excellent product, worth every penny!",
    comment: "I've been using this for a month now and I'm extremely satisfied with the performance. Battery life is excellent and the build quality is premium.",
    date: "May 15, 2023",
    verified: true,
  },
  {
    id: 2,
    author: "Samantha K.",
    rating: 4,
    title: "Great value for money",
    comment: "Almost perfect. The only minor issue is that it heats up a bit during intensive usage, but otherwise it's a fantastic device.",
    date: "April 23, 2023",
    verified: true,
  },
  {
    id: 3,
    author: "Michael R.",
    rating: 3,
    title: "Good but could be better",
    comment: "The product works as advertised but the user interface could be more intuitive. It took me some time to get used to the controls.",
    date: "June 2, 2023",
    verified: false,
  }
];

const ProductImages = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="aspect-square overflow-hidden rounded-lg bg-muted"
      >
        <img 
          src={selectedImage} 
          alt="Product" 
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, i) => (
          <div 
            key={i}
            className={`cursor-pointer border-2 rounded-md overflow-hidden ${selectedImage === image ? 'border-primary' : 'border-transparent'}`}
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image} 
              alt={`Product thumbnail ${i+1}`} 
              className="h-20 w-20 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ReviewStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon 
          key={i}
          className={`h-5 w-5 ${i < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [alternativeImages, setAlternativeImages] = useState<string[]>([]);
  const { toast } = useToast();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  
  const allProducts = Object.values(products).flat();
  const product = allProducts.find(p => p.id === productId);
  
  useEffect(() => {
    if (product) {
      // Generate alternate images (in a real app, these would come from the API)
      const baseImage = product.image;
      // Create alternative angles by using similar images
      const alternatives = [
        baseImage,
        `${baseImage}?angle=side`,
        `${baseImage}?angle=back`,
        `${baseImage}?angle=top`,
      ];
      setAlternativeImages(alternatives);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({...product, quantity}, "TechHub Electronics");
    toast({
      title: "Added to Cart",
      description: `${product.name} (Qty: ${quantity}) has been added to your cart`,
    });
  };

  const handleBuyNow = () => {
    addToCart({...product, quantity}, "TechHub Electronics");
    navigate('/cart');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${isFavorite ? 'removed from' : 'added to'} your wishlist`,
    });
  };

  // Find best price across shops
  const shopInstances = ELECTRONICS_SHOPS.filter(shop => 
    shop.products.some(p => p.name === product.name)
  );

  // Get lowest price
  const bestPrice = shopInstances.reduce((min, shop) => {
    const shopProduct = shop.products.find(p => p.name === product.name);
    return shopProduct && shopProduct.price < min ? shopProduct.price : min;
  }, product.price);

  const discountPercentage = Math.round(((product.price - bestPrice) / product.price) * 100);

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <Breadcrumbs />
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Product Images */}
        <div className="md:col-span-1">
          <ProductImages images={alternativeImages} />
        </div>
        
        {/* Product Info */}
        <div className="md:col-span-1 lg:col-span-2">
          <div className="space-y-4">
            <div>
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  <ReviewStars rating={product.rating} />
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({product.rating.toFixed(1)})
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {DUMMY_REVIEWS.length} reviews
                </span>
                <span className="text-sm text-muted-foreground">
                  Brand: <span className="font-medium">{product.brand}</span>
                </span>
              </div>
            </div>
            
            <Separator />
            
            {/* Price section */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-primary">
                  ₹{bestPrice.toLocaleString()}
                </span>
                {discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ₹{product.price.toLocaleString()}
                    </span>
                    <Badge className="bg-green-500 hover:bg-green-600">
                      {discountPercentage}% off
                    </Badge>
                  </>
                )}
              </div>
              <p className="text-sm text-green-600 mt-1">
                {product.inStock ? 'In Stock' : 'Out of Stock'}
                {product.inStock && product.stock < 10 && ` - Only ${product.stock} left!`}
              </p>
            </div>
            
            {/* Description */}
            <p className="text-gray-700">{product.description}</p>
            
            {/* Quantity selector */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleQuantityChange('decrease')}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleQuantityChange('increase')}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                className="flex-1 min-w-[120px]"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button 
                className="flex-1 min-w-[120px]"
                variant="secondary"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFavorite}
                className={isFavorite ? 'text-red-500' : ''}
              >
                <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Delivery Info */}
            <div className="bg-secondary/30 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Delivery Information</h3>
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-green-500" />
                <p>Free delivery available</p>
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <Check className="h-4 w-4 text-green-500" />
                <p>10-day replacement policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs section */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b mb-0 rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({DUMMY_REVIEWS.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="pt-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">About this item</h3>
              <p className="mb-4">{product.description}</p>
              <p>The {product.name} by {product.brand} represents the pinnacle of modern technology, combining sleek design with powerful performance. Engineered to meet the demands of today's fast-paced digital world, this device delivers exceptional results whether you're working, creating, or entertaining.</p>
              <p className="mt-4">Key highlights:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Premium build quality with attention to detail</li>
                <li>Enhanced performance for demanding applications</li>
                <li>Energy-efficient design for extended usage</li>
                <li>Seamless integration with your digital ecosystem</li>
                <li>Backed by {product.brand}'s industry-leading warranty and support</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">General</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium">{product.brand}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Model</span>
                      <span className="font-medium">{product.model}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Category</span>
                      <span className="font-medium capitalize">{product.category}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Physical Specifications</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-medium">15 x 7.5 x 0.8 cm</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium">180g</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Color</span>
                      <span className="font-medium">Space Gray</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Technical Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Processor</span>
                      <span className="font-medium">A15 Bionic</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Memory</span>
                      <span className="font-medium">8GB</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Storage</span>
                      <span className="font-medium">256GB</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Warranty & Support</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Warranty</span>
                      <span className="font-medium">1 Year Manufacturer Warranty</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b">
                      <span className="text-muted-foreground">Support</span>
                      <span className="font-medium">24/7 Customer Service</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{product.rating.toFixed(1)}</div>
                  <ReviewStars rating={product.rating} />
                  <div className="text-sm text-muted-foreground mt-1">{DUMMY_REVIEWS.length} reviews</div>
                </div>
                
                <div className="flex-1 max-w-md">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = DUMMY_REVIEWS.filter(r => Math.round(r.rating) === star).length;
                    const percentage = (count / DUMMY_REVIEWS.length) * 100;
                    
                    return (
                      <div key={star} className="flex items-center gap-2">
                        <span className="text-sm">{star} star</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{percentage.toFixed(0)}%</span>
                      </div>
                    );
                  })}
                </div>
                
                <div>
                  <Button>Write a Review</Button>
                </div>
              </div>
              
              <Separator />
              
              {/* Review List */}
              <div className="space-y-6">
                {DUMMY_REVIEWS.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-semibold">{review.title}</h4>
                        <div className="flex items-center gap-2">
                          <ReviewStars rating={review.rating} />
                          <span className="text-sm text-muted-foreground">by {review.author}</span>
                          {review.verified && (
                            <Badge variant="outline" className="text-green-600">Verified Purchase</Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                    <div className="flex gap-2 pt-1">
                      <Button variant="ghost" size="sm">Helpful</Button>
                      <Button variant="ghost" size="sm">Report</Button>
                    </div>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
              
              <div className="text-center pt-4">
                <Button variant="outline">Load More Reviews</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
