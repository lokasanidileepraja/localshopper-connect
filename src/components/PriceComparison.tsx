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
import { Smartphone } from "lucide-react";

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
      <div className="flex flex-wrap gap-2">
        {models.map((model) => (
          <Button
            key={model}
            variant="outline"
            onClick={() => onModelSelect(model)}
            className="gap-2"
          >
            <Smartphone className="h-4 w-4" />
            Compare {model} prices
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
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Shop</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {priceComparison.map(({ shopName, product, distance, isOpen }) => (
            <TableRow key={shopName}>
              <TableCell className="font-medium">{shopName}</TableCell>
              <TableCell>₹{product!.price.toLocaleString()}</TableCell>
              <TableCell>{distance}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                    isOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {isOpen ? "Open" : "Closed"}
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
      <div className="flex justify-end p-4">
        <Button variant="ghost" onClick={() => onModelSelect(selectedModel)}>
          Close Comparison
        </Button>
      </div>
    </div>
  );
};