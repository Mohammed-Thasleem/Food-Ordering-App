export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(2)}`;
};

export const formatPriceShort = (price: number): string => {
  // If price has no decimals or ends in .00, show without decimals
  if (price % 1 === 0) {
    return `₹${price}`;
  }
  return `₹${price.toFixed(2)}`;
};
