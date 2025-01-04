import { Category } from "@/types/categories";
import { Smartphone, Laptop, Headphones, Tv, Gamepad, Watch, Cable, Speaker } from "lucide-react";

export const categories: Category[] = [
  {
    name: "Electronics",
    icon: Tv,
    color: "bg-blue-50",
    description: "Latest electronics and gadgets"
  },
  {
    name: "Mobiles",
    icon: Smartphone,
    color: "bg-green-50",
    description: "Smartphones and tablets"
  },
  {
    name: "Laptops",
    icon: Laptop,
    color: "bg-purple-50",
    description: "Laptops and computers"
  },
  {
    name: "Accessories",
    icon: Cable,
    color: "bg-yellow-50",
    description: "Phone and computer accessories"
  },
  {
    name: "Audio",
    icon: Speaker,
    color: "bg-red-50",
    description: "Speakers and audio devices"
  },
  {
    name: "Gaming",
    icon: Gamepad,
    color: "bg-indigo-50",
    description: "Gaming consoles and accessories"
  },
  {
    name: "Wearables",
    icon: Watch,
    color: "bg-pink-50",
    description: "Smartwatches and fitness trackers"
  }
];