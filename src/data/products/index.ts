import { Product } from "@/types/shop";
import { electronics } from "./electronics";
import { mobiles } from "./mobiles";

export const products: Record<string, Product[]> = {
  electronics,
  mobiles,
};

export default products;