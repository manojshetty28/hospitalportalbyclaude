import { describe, expect, it } from "vitest";
import { formatAmount, formatDate, getInitials } from "@/lib/format";

describe("formatDate", () => {
  it("formats an ISO date as DD MMM YYYY", () => {
    expect(formatDate("2026-11-16")).toBe("16 Nov 2026");
    expect(formatDate("2026-01-05")).toBe("05 Jan 2026");
  });

  it("returns the input when it is not an ISO date", () => {
    expect(formatDate("16/11/2026")).toBe("16/11/2026");
  });

  it("returns the input when the month is out of range", () => {
    expect(formatDate("2026-13-01")).toBe("2026-13-01");
  });
});

describe("formatAmount", () => {
  it("formats with two decimals and digit grouping", () => {
    expect(formatAmount("42500.00")).toBe("42,500.00");
    expect(formatAmount(124300)).toBe("1,24,300.00");
    expect(formatAmount("0")).toBe("0.00");
  });

  it("returns the input when it is not a number", () => {
    expect(formatAmount("n/a")).toBe("n/a");
  });
});

describe("getInitials", () => {
  it("returns the first letters of the first two words", () => {
    expect(getInitials("Ravi Kumar")).toBe("RK");
    expect(getInitials("  john   mathew  varghese ")).toBe("JM");
  });

  it("handles a single word and an empty name", () => {
    expect(getInitials("Lakshmi")).toBe("L");
    expect(getInitials("")).toBe("");
  });
});
