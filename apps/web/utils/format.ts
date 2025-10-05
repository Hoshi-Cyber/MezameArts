// apps/web/utils/format.ts
export function formatPrice(
  value: number,
  currency: string = "USD",
  locale?: string
) {
  return new Intl.NumberFormat(locale ?? "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}
