import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { ELECTRONICS_SHOPS } from "@/data/shops";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PriceHistoryViewProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
}

export const PriceHistoryView = ({ searchQuery, filters }: PriceHistoryViewProps) => {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [priceHistory, setPriceHistory] = useState([]);
  
  // Get products that match the search query
  const allProducts = ELECTRONICS_SHOPS.flatMap(shop => 
    shop.products.map(product => ({
      ...product,
      shopName: shop.name
    }))
  ).filter(product => 
    !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get unique product names
  const uniqueProducts = [...new Map(allProducts.map(item => [item.name, item])).values()];
  
  useEffect(() => {
    if (uniqueProducts.length > 0 && !selectedProduct) {
      setSelectedProduct(uniqueProducts[0].name);
    }
  }, [uniqueProducts, selectedProduct]);
  
  useEffect(() => {
    if (selectedProduct) {
      // Generate mock price history data for the selected product
      const product = allProducts.find(p => p.name === selectedProduct);
      if (product) {
        const basePrice = product.price;
        const mockData = [
          { date: "Jan", price: Math.round(basePrice * 1.05) },
          { date: "Feb", price: Math.round(basePrice * 1.03) },
          { date: "Mar", price: Math.round(basePrice * 1.02) },
          { date: "Apr", price: Math.round(basePrice * 1.00) },
          { date: "May", price: Math.round(basePrice * 0.98) },
          { date: "Jun", price: basePrice },
        ];
        
        // Generate shop specific data
        const shopData = ELECTRONICS_SHOPS.map(shop => {
          const shopProduct = shop.products.find(p => p.name === selectedProduct);
          if (!shopProduct) return null;
          
          // Generate random variation but keep the same trend
          return {
            id: shop.id,
            name: shop.name,
            data: mockData.map(point => ({
              date: point.date,
              price: Math.round(shopProduct.price * (point.price / basePrice))
            }))
          };
        }).filter(Boolean);
        
        setPriceHistory(shopData);
      }
    }
  }, [selectedProduct, allProducts]);

  if (allProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-select">Select Product</Label>
            <Select 
              value={selectedProduct} 
              onValueChange={setSelectedProduct}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {uniqueProducts.map(product => (
                  <SelectItem key={product.id} value={product.name}>
                    {product.name} - From ₹{Math.min(...allProducts
                      .filter(p => p.name === product.name)
                      .map(p => p.price)).toLocaleString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  allowDuplicatedCategory={false} 
                  type="category"
                  domain={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString()}`, "Price"]}
                  labelFormatter={() => selectedProduct}
                />
                <Legend />
                {priceHistory.map((shop, index) => (
                  <Line
                    key={shop.id}
                    data={shop.data}
                    type="monotone"
                    dataKey="price"
                    name={shop.name}
                    stroke={`hsl(${index * 40}, 70%, 50%)`}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {priceHistory.length > 0 && (
            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-2">Current Prices</h4>
              <div className="space-y-2">
                {priceHistory.map(shop => {
                  const currentPrice = shop.data[shop.data.length - 1].price;
                  const lowestPrice = Math.min(...priceHistory.map(s => s.data[s.data.length - 1].price));
                  return (
                    <div key={shop.id} className="flex justify-between items-center">
                      <span>{shop.name}</span>
                      <span className={`font-bold ${currentPrice === lowestPrice ? 'text-green-600' : 'text-primary'}`}>
                        ₹{currentPrice.toLocaleString()}
                        {currentPrice === lowestPrice && " (Best Price)"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
