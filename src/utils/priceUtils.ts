
/**
 * Format a number as a price with currency symbol
 * @param price The price to format
 * @param currency The currency symbol to use
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency: string = '₹'): string => {
  return `${currency}${price.toLocaleString()}`;
};

/**
 * Calculate discount percentage
 * @param originalPrice The original price
 * @param discountedPrice The discounted price
 * @returns Discount percentage
 */
export const calculateDiscountPercentage = (
  originalPrice: number,
  discountedPrice: number
): number => {
  if (originalPrice <= 0 || discountedPrice >= originalPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Calculate EMI monthly amount
 * @param price The total price
 * @param months Number of months
 * @param interestRate Annual interest rate (as a percentage)
 * @returns Monthly EMI amount
 */
export const calculateEMI = (
  price: number,
  months: number,
  interestRate: number
): number => {
  // Convert annual interest rate to monthly rate
  const monthlyRate = interestRate / 12 / 100;
  
  // EMI calculation formula: P * r * (1+r)^n / ((1+r)^n - 1)
  if (interestRate === 0) {
    return price / months;
  }
  
  const emi =
    (price * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
    
  return Math.round(emi);
};

/**
 * Calculate tax amount
 * @param price The price before tax
 * @param taxRate The tax rate (as a percentage)
 * @returns Tax amount
 */
export const calculateTax = (price: number, taxRate: number = 18): number => {
  return Math.round(price * (taxRate / 100));
};

/**
 * Calculate shipping cost based on cart total
 * @param cartTotal The cart total
 * @param freeShippingThreshold The threshold above which shipping is free
 * @param standardShippingCost The standard shipping cost
 * @returns Shipping cost
 */
export const calculateShipping = (
  cartTotal: number,
  freeShippingThreshold: number = 10000,
  standardShippingCost: number = 99
): number => {
  return cartTotal > 0 ? (cartTotal >= freeShippingThreshold ? 0 : standardShippingCost) : 0;
};

/**
 * Calculate the final cart total including tax and shipping
 * @param cartTotal The cart subtotal
 * @param taxRate The tax rate (as a percentage)
 * @param freeShippingThreshold The threshold above which shipping is free
 * @param standardShippingCost The standard shipping cost
 * @returns Final total including tax and shipping
 */
export const calculateFinalTotal = (
  cartTotal: number,
  taxRate: number = 18,
  freeShippingThreshold: number = 10000,
  standardShippingCost: number = 99
): number => {
  const tax = calculateTax(cartTotal, taxRate);
  const shipping = calculateShipping(cartTotal, freeShippingThreshold, standardShippingCost);
  return cartTotal + tax + shipping;
};
