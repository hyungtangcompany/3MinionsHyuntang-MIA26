/**
 * Helper untuk format mata uang Rupiah dan angka sesuai konvensi Indonesia
 */
export function formatRupiah(amount: number | bigint): string {
  const num = typeof amount === "bigint" ? Number(amount) : amount;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("id-ID").format(value);
}

