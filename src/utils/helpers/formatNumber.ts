export function formatNumber(value?: string | number): string {
  const result = value
    ? Number(value)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .replace(".00", "")
    : "0";
  return result;
}
