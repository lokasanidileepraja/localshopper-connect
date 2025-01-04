import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ELECTRONICS_SHOPS } from "@/data/shops";

export const ComparisonTable = () => {
  const products = ELECTRONICS_SHOPS.map(shop => ({
    storeName: shop.name,
    ...shop.products[0],
    distance: shop.distance,
    isOpen: shop.isOpen
  }));

  return (
    <div className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Price Comparison Table</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Store</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Distance</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.storeName}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>₹{product.price.toLocaleString()}</TableCell>
              <TableCell>{product.distance}</TableCell>
              <TableCell>{product.isOpen ? "Open" : "Closed"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};