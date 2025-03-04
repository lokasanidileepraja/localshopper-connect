
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Copy,
  Image,
  Tag,
  Package,
  Filter,
  ArrowUpDown,
  Upload
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const ProductManagement = () => {
  const { toast } = useToast();
  const [view, setView] = useState<"grid" | "list">("grid");
  
  // Sample product data
  const products = [
    { 
      id: "1", 
      name: "Samsung Galaxy S23", 
      price: 74999, 
      category: "mobiles", 
      stock: 12, 
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c"
    },
    { 
      id: "2", 
      name: "Apple Macbook Air M2", 
      price: 114999, 
      category: "laptops", 
      stock: 5, 
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    { 
      id: "3", 
      name: "Sony WH-1000XM5", 
      price: 26999, 
      category: "audio", 
      stock: 8, 
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb"
    },
    {
      id: "4",
      name: "Apple iPhone 15 Pro",
      price: 129999,
      category: "mobiles",
      stock: 3,
      image: "https://images.unsplash.com/photo-1696446701796-da61225697cc"
    }
  ];

  const handleAddProduct = () => {
    toast({
      title: "Add Product",
      description: "This would open a product creation form in a real app",
    });
  };

  const handleEditProduct = (id: string) => {
    toast({
      title: "Edit Product",
      description: `Editing product with ID: ${id}`,
    });
  };

  const handleDeleteProduct = (id: string) => {
    toast({
      title: "Delete Product",
      description: `Deleting product with ID: ${id}`,
      variant: "destructive",
    });
  };

  const handleDuplicateProduct = (id: string) => {
    toast({
      title: "Duplicate Product",
      description: `Duplicating product with ID: ${id}`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-auto flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search products..." className="pl-10" />
        </div>
        <div className="flex gap-2 items-center w-full sm:w-auto justify-end">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-1" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <ArrowUpDown className="h-4 w-4 mr-1" />
            Sort
          </Button>
          <Button size="sm" onClick={handleAddProduct}>
            <Plus className="h-4 w-4 mr-1" />
            Add Product
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">{products.length} products</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setView("grid")}>
            Grid
          </Button>
          <Button variant="outline" size="sm" onClick={() => setView("list")}>
            List
          </Button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-40 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => handleEditProduct(product.id)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardContent className="p-3">
                <h3 className="font-medium truncate">{product.name}</h3>
                <div className="flex justify-between items-center mt-1">
                  <p className="font-bold text-primary">₹{product.price.toLocaleString()}</p>
                  <Badge variant={product.stock > 5 ? "default" : "destructive"}>
                    {product.stock} in stock
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1 capitalize">{product.category}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="flex items-center justify-center h-full min-h-[200px] border-dashed">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Button 
                variant="ghost" 
                className="rounded-full h-16 w-16 mb-2" 
                onClick={handleAddProduct}
              >
                <Plus className="h-6 w-6" />
              </Button>
              <p className="text-sm font-medium">Add Product</p>
              <p className="text-xs text-gray-500">Upload details and images</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="border rounded-md">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className={`flex items-center p-4 ${index !== products.length - 1 ? 'border-b' : ''}`}
            >
              <div className="w-12 h-12 rounded overflow-hidden mr-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{product.name}</p>
                <p className="text-xs text-gray-500 capitalize">{product.category}</p>
              </div>
              <div className="flex items-center gap-4 mx-4">
                <div className="text-right">
                  <p className="font-bold text-primary">₹{product.price.toLocaleString()}</p>
                  <Badge variant={product.stock > 5 ? "default" : "destructive"} className="mt-1">
                    {product.stock} in stock
                  </Badge>
                </div>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => handleEditProduct(product.id)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDuplicateProduct(product.id)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDeleteProduct(product.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-3">Quick Product Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="justify-start">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Upload
            </Button>
            <Button variant="outline" className="justify-start">
              <Image className="h-4 w-4 mr-2" />
              Manage Images
            </Button>
            <Button variant="outline" className="justify-start">
              <Tag className="h-4 w-4 mr-2" />
              Categories
            </Button>
            <Button variant="outline" className="justify-start">
              <Package className="h-4 w-4 mr-2" />
              Inventory
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
