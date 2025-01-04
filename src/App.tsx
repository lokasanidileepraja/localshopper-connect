import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PriceComparePage from "./pages/PriceComparePage";
import StoreDetails from "./pages/StoreDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/price-compare" element={<PriceComparePage />} />
        <Route path="/shop/:storeName" element={<StoreDetails />} />
      </Routes>
    </Router>
  );
}

export default App;