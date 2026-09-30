export function formatINR(value, options = {}) {
  const amount = Number(value || 0);
  const decimals = options.decimals ?? 2;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}
