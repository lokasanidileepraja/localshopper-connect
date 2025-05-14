
import { Users, Store, ShoppingBag, DollarSign } from "lucide-react";
import MetricCard from "./MetricCard";

const SummaryMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard 
        title="Total Users" 
        value="14,583" 
        icon={<Users className="h-5 w-5 text-primary mr-2" />}
        trend="↑ 12%" 
      />
      
      <MetricCard 
        title="Active Stores" 
        value="842" 
        icon={<Store className="h-5 w-5 text-primary mr-2" />}
        trend="↑ 7%" 
      />
      
      <MetricCard 
        title="Total Products" 
        value="23,947" 
        icon={<ShoppingBag className="h-5 w-5 text-primary mr-2" />}
        trend="↑ 18%" 
      />
      
      <MetricCard 
        title="Revenue" 
        value="₹4.2M" 
        icon={<DollarSign className="h-5 w-5 text-primary mr-2" />}
        trend="↑ 22%" 
      />
    </div>
  );
};

export default SummaryMetrics;
