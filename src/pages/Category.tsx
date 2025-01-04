import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categoryData = {
  electronics: {
    title: "Electronics",
    description: "Discover the latest in electronic innovations",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    products: [
      {
        id: "e1",
        name: "Smart TV 55\"",
        price: 49999,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1593784991095-a205069470b6"
      },
      {
        id: "e2",
        name: "Wireless Earbuds",
        price: 9999,
        rating: 4.3,
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df"
      }
    ]
  },
  mobiles: {
    title: "Mobiles",
    description: "Stay connected with the latest smartphones",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    products: [
      {
        id: "m1",
        name: "iPhone 15 Pro",
        price: 129999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
      },
      {
        id: "m2",
        name: "Samsung Galaxy S23",
        price: 79999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
      }
    ]
  },
  laptops: {
    title: "Laptops",
    description: "Powerful computing for work and play",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    products: [
      {
        id: "l1",
        name: "MacBook Pro M2",
        price: 199999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
      },
      {
        id: "l2",
        name: "Dell XPS 15",
        price: 149999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
      }
    ]
  },
  accessories: {
    title: "Accessories",
    description: "Enhance your tech experience",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c",
    products: [
      {
        id: "a1",
        name: "Magic Keyboard",
        price: 29999,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c"
      },
      {
        id: "a2",
        name: "Apple Pencil",
        price: 11999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c"
      }
    ]
  },
  audio: {
    title: "Audio",
    description: "Immersive sound experiences",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
    products: [
      {
        id: "au1",
        name: "AirPods Pro",
        price: 24999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434"
      },
      {
        id: "au2",
        name: "Sony WH-1000XM4",
        price: 29999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b"
      }
    ]
  },
  gaming: {
    title: "Gaming",
    description: "Level up your gaming experience",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    products: [
      {
        id: "g1",
        name: "PS5 Console",
        price: 49999,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
      },
      {
        id: "g2",
        name: "Xbox Series X",
        price: 49999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
      }
    ]
  },
  wearables: {
    title: "Wearables",
    description: "Smart technology that moves with you",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9",
    products: [
      {
        id: "w1",
        name: "Apple Watch Series 9",
        price: 41999,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9"
      },
      {
        id: "w2",
        name: "Samsung Galaxy Watch 6",
        price: 34999,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9"
      }
    ]
  }
};

const Category = () => {
  const { categoryName } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const category = categoryName ? categoryData[categoryName.toLowerCase() as keyof typeof categoryData] : null;

  useEffect(() => {
    if (category) {
      toast({
        title: `Browsing ${category.title}`,
        description: "Loading products in this category...",
      });
    }
  }, [category, toast]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-64 mb-8 rounded-xl overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">{category.title}</h1>
              <p className="text-lg">{category.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="group overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute top-2 right-2">New</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold">
                        ₹{product.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <Button 
                      className="w-full group"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Category;