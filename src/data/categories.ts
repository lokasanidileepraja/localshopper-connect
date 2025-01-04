import { Smartphone, Laptop, Headphones, Camera, Watch, Tv, Speaker, Gamepad } from "lucide-react";
import { Category } from "@/types/categories";

export const categories: Category[] = [
  { name: "Phones", icon: Smartphone, color: "bg-blue-100", description: "Latest smartphones and accessories" },
  { name: "Laptops", icon: Laptop, color: "bg-green-100", description: "Powerful laptops for work and play" },
  { name: "Audio", icon: Headphones, color: "bg-yellow-100", description: "High-quality audio equipment" },
  { name: "Cameras", icon: Camera, color: "bg-red-100", description: "Professional cameras and gear" },
  { name: "Wearables", icon: Watch, color: "bg-purple-100", description: "Smart watches and fitness trackers" },
  { name: "TVs", icon: Tv, color: "bg-pink-100", description: "4K and 8K Smart TVs" },
  { name: "Speakers", icon: Speaker, color: "bg-indigo-100", description: "Premium sound systems" },
  { name: "Gaming", icon: Gamepad, color: "bg-orange-100", description: "Gaming consoles and accessories" }
];