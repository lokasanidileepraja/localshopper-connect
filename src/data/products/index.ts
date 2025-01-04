import { Product } from "@/types/shop";
import { electronics } from "./electronics";
import { mobiles } from "./mobiles";
import { laptops } from "./laptops";
import { accessories } from "./accessories";
import { audio } from "./audio";
import { gaming } from "./gaming";
import { wearables } from "./wearables";

export const products: Record<string, Product[]> = {
  electronics,
  mobiles,
  laptops,
  accessories,
  audio,
  gaming,
  wearables,
};

export default products;