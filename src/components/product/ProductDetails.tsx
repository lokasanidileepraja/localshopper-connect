import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductDetailsProps {
  name: string;
  specs: {
    key: string;
    value: string;
    tooltip?: string;
  }[];
  rating: number;
  reviews: number;
}

export const ProductDetails = ({ name, specs, rating, reviews }: ProductDetailsProps) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{name}</span>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg">{rating}</span>
            <span className="text-sm text-gray-500">({reviews} reviews)</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {specs.map((spec, index) => (
            <TooltipProvider key={spec.key}>
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">{spec.key}:</span>
                  <span>{spec.value}</span>
                </div>
                {spec.tooltip && (
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{spec.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </motion.div>
            </TooltipProvider>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};