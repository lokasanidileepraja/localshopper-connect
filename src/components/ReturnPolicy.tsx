import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowLeftRight, Calendar, Shield } from "lucide-react";

export const ReturnPolicy = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="returns">
        <AccordionTrigger className="text-lg font-semibold">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5" />
            Returns & Exchanges
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 p-4">
            <div className="flex items-start gap-4">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium">30-Day Return Window</h4>
                <p className="text-sm text-gray-600">
                  Return or exchange within 30 days of delivery
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Shield className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium">Warranty Coverage</h4>
                <p className="text-sm text-gray-600">
                  1-year warranty for manufacturing defects
                </p>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};