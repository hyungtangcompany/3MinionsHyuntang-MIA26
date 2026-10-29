import { describe, it, expect } from "vitest";
import { formatRupiah, formatNumber } from "./format";

describe("format helpers", () => {
  it("formats numbers to Rupiah currency correctly", () => {
    expect(formatRupiah(1000000000)).toMatch(/Rp\s?1\.000\.000\.000/);
    expect(formatRupiah(100000000)).toMatch(/Rp\s?100\.000\.000/);
    expect(formatRupiah(BigInt(580300000))).toMatch(/Rp\s?580\.300\.000/);
  });

  it("formats regular numbers according to ID locale", () => {
    expect(formatNumber(1250)).toBe("1.250");
    expect(formatNumber(88)).toBe("88");
  });
});

