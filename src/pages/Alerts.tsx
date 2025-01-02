import { ProductAlerts } from "@/components/ProductAlerts";

const Alerts = () => {
  const productAlertsProps = {
    productId: "1",
    inStock: true,
    currentPrice: 79999
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Product Alerts</h1>
      <ProductAlerts {...productAlertsProps} />
    </div>
  );
};

export default Alerts;