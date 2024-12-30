import { Shop } from "@/types/shop";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Smartphone, ArrowUpDown } from "lucide-react";

interface PriceComparisonProps {
  shops: Shop[];
  models: string[];
  selectedModel: string | null;
  onModelSelect: (model: string) => void;
}

export const PriceComparison = ({
  shops,
  models,
  selectedModel,
  onModelSelect,
}: PriceComparisonProps) => {
  if (!selectedModel) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {models.map((model) => (
          <Button
            key={model}
            variant="outline"
            onClick={() => onModelSelect(model)}
            className="group relative overflow-hidden bg-white hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
              <span>Compare {model}</span>
            </div>
          </Button>
        ))}
      </div>
    );
  }

  const priceComparison = shops
    .map((shop) => ({
      shopName: shop.name,
      product: shop.products.find(
        (p) => p.category === "mobile" && p.model === selectedModel
      ),
      distance: shop.distance,
      isOpen: shop.isOpen,
    }))
    .filter((item) => item.product)
    .sort((a, b) => (a.product!.price > b.product!.price ? 1 : -1));

  return (
    <div className="rounded-lg border bg-white shadow-sm">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Comparing prices for {selectedModel}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => onModelSelect("")}>
            Close
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Shop</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                Price
                <ArrowUpDown className="h-4 w-4 text-gray-500" />
              </div>
            </TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {priceComparison.map(({ shopName, product, distance, isOpen }) => (
            <TableRow key={shopName} className="group hover:bg-gray-50">
              <TableCell className="font-medium">{shopName}</TableCell>
              <TableCell className="font-semibold text-primary">
                ₹{product!.price.toLocaleString()}
              </TableCell>
              <TableCell>{distance}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    isOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isOpen ? "Open Now" : "Closed"}
                </span>
              </TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    product!.inStock
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {product!.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};