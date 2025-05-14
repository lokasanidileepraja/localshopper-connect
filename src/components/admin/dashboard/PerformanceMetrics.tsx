
import { Grid } from "lucide-react";
import CriticalMetrics from "./CriticalMetrics";
import ActivityFeed from "./ActivityFeed";

const PerformanceMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <CriticalMetrics />
      <ActivityFeed />
    </div>
  );
};

export default PerformanceMetrics;
