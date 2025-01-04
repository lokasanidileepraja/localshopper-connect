import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PriceComparePage from "./pages/PriceComparePage";
import StoreDetails from "./pages/StoreDetails";
import { ComparisonTable } from "./components/price/ComparisonTable";
import { PriceHistory } from "./components/price/PriceHistory";
import { PriceAlerts } from "./components/price/PriceAlerts";
import { StoreMap } from "./components/store/StoreMap";
import Index from "./pages/Index";
import { Breadcrumbs } from "./components/Breadcrumbs";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/price-compare" element={<PriceComparePage />} />
          <Route path="/shop/:storeName" element={<StoreDetails />} />
          <Route path="/comparison-table" element={<ComparisonTable />} />
          <Route path="/price-history" element={<PriceHistory />} />
          <Route path="/price-alerts" element={<PriceAlerts />} />
          <Route path="/store-map" element={<StoreMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;