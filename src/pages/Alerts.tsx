import { ProductAlerts } from "@/components/ProductAlerts";

const Alerts = () => {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Price & Stock Alerts</h1>
      <div className="max-w-3xl mx-auto">
        <ProductAlerts 
          productId="demo-product"
          inStock={true}
          currentPrice={79999}
        />
      </div>
    </div>
  );
};

export default Alerts;