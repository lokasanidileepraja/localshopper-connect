import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, ArrowLeft, Star, ShoppingBag } from "lucide-react";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { motion } from "framer-motion";

const StoreDetails = () => {
  const { storeName } = useParams();
  const navigate = useNavigate();
  
  const shop = ELECTRONICS_SHOPS.find(
    (s) => s.name.toLowerCase() === decodeURIComponent(storeName || "").toLowerCase()
  );

  if (!shop) {
    return (
      <div className="container py-8">
        <h1>Store not found</h1>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Comparison
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="relative h-64 rounded-xl overflow-hidden">
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

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-4">{shop.name}</h1>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{shop.distance} from your location</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>9:00 AM - 9:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>{shop.rating} / 5.0</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Available Products</h2>
            <div className="space-y-4">
              {shop.products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">₹{product.price.toLocaleString()}</p>
                    <Badge variant={product.inStock ? "default" : "secondary"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Store Description</h2>
          <p className="text-gray-600">
            Welcome to {shop.name}, your premier destination for cutting-edge electronics and tech accessories. 
            We pride ourselves on offering a wide selection of the latest gadgets, expert customer service, 
            and competitive prices. Visit us today to experience technology at its finest.
          </p>
        </Card>
      </motion.div>
    </div>
  );
};

export default StoreDetails;