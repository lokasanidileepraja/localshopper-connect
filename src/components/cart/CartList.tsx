
import { CartItem } from "@/components/CartItem";
import { Product, Shop } from "@/types/shop";
import { useCart } from "@/contexts/CartContext";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface CartListProps {
  items: (Product & { shopName: string; currentPrice?: number })[];
  shops: Shop[];
  onRemove: (id: string) => void;
}

export const CartList = ({ items, shops, onRemove }: CartListProps) => {
  const { items: cartItems } = useCart();
  const navigate = useNavigate();
  
  if (cartItems.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 px-6 bg-secondary/30 rounded-xl"
      >
        <div className="mx-auto w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-6">
          <ShoppingCart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Explore products and add items to your cart</p>
        <Button 
          onClick={() => navigate('/')}
          className="rounded-full"
        >
          Start Shopping
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      {cartItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <CartItem
            item={item}
            shops={shops}
            onRemove={onRemove}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};
