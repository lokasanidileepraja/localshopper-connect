
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComparisonTableView } from "@/components/price-compare/ComparisonTableView";
import { MapView } from "@/components/price-compare/MapView";
import { PriceAlertView } from "@/components/price-compare/PriceAlertView";
import { PriceHistoryView } from "@/components/price-compare/PriceHistoryView";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share, Download } from "lucide-react";
import { TooltipWrapper } from "@/components/common/TooltipWrapper";
import { useToast } from "@/hooks/use-toast";

interface PriceCompareTabsProps {
  searchQuery: string;
  filters: {
    priceRange: [number, number];
    storeTypes: string[];
    proximity: number;
    inStock: boolean;
  };
  onBack?: () => void;
}

export const EnhancedPriceComparisonTabs = ({ 
  searchQuery, 
  filters,
  onBack 
}: PriceCompareTabsProps) => {
  const [activeTab, setActiveTab] = useState("table");
  const { toast } = useToast();

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `Price Comparison for ${searchQuery || "Products"}`,
        text: `Check out price comparison for ${searchQuery || "these products"} across different stores`,
        url: window.location.href,
      }).catch(() => {
        // Fallback if share API fails
        copyCurrentUrlToClipboard();
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      copyCurrentUrlToClipboard();
    }
  };

  const copyCurrentUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: "Link Copied!",
        description: "Comparison link has been copied to clipboard.",
      });
    });
  };

  const handleExportResults = () => {
    toast({
      title: "Export Started",
      description: "Your comparison data is being prepared for download.",
    });
    
    // This would typically trigger a real export function
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your comparison data has been exported to CSV.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {onBack && (
          <TooltipWrapper content="Back to search">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </TooltipWrapper>
        )}
        
        <div className="flex-1 md:hidden"></div>
        
        <div className="flex items-center gap-2">
          <TooltipWrapper content="Share comparison results">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShareResults}
              className="flex items-center gap-2"
            >
              <Share className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </TooltipWrapper>
          
          <TooltipWrapper content="Download as CSV">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportResults}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </TooltipWrapper>
        </div>
      </div>
      
      <Tabs defaultValue="table" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="price-history">Price History</TabsTrigger>
          <TabsTrigger value="price-alerts">Price Alerts</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="pt-4">
          <ComparisonTableView searchQuery={searchQuery} filters={filters} />
        </TabsContent>
        <TabsContent value="map" className="pt-4">
          <MapView searchQuery={searchQuery} filters={filters} />
        </TabsContent>
        <TabsContent value="price-history" className="pt-4">
          <PriceHistoryView searchQuery={searchQuery} filters={filters} />
        </TabsContent>
        <TabsContent value="price-alerts" className="pt-4">
          <PriceAlertView searchQuery={searchQuery} filters={filters} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
