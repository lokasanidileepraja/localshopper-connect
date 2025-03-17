
import { useParams } from "react-router-dom";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { StoreInfo } from "@/components/store/StoreInfo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const StoreDetails = () => {
  const { storeName } = useParams();
  
  const shop = ELECTRONICS_SHOPS.find(
    (s) => s.name.toLowerCase() === decodeURIComponent(storeName || "").toLowerCase()
  );

  if (!shop) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Store not found</h1>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-8 md:grid-cols-2"
      >
        {/* Store Information */}
        <StoreInfo
          id={shop.id} // Added id property
          name={shop.name}
          address="123 Tech Street, Digital City" // Dummy address
          phone="+1 (555) 123-4567" // Dummy phone
          hours="9:00 AM - 9:00 PM" // Dummy hours
          rating={shop.rating}
          isOpen={shop.isOpen}
        />

        {/* Store Image */}
        <Card>
          <div className="relative h-[300px] overflow-hidden rounded-t-lg">
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <Badge
              className="absolute top-4 right-4"
              variant={shop.isOpen ? "default" : "secondary"}
            >
              {shop.isOpen ? "Open Now" : "Closed"}
            </Badge>
          </div>
        </Card>
      </motion.div>

      {/* Available Gadgets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Available Gadgets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shop.products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group"
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48">
                    <img
                      src={product.image || "https://via.placeholder.com/400x300"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <Badge
                      className="absolute top-2 right-2"
                      variant={product.inStock ? "default" : "secondary"}
                    >
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {product.model}
                    </p>
                    <p className="font-bold text-primary">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoreDetails;
