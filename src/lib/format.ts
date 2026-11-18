const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const amountFormatter = new Intl.NumberFormat("en-IN", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats an ISO date (`2026-11-16`) as `16 Nov 2026`. */
export function formatDate(isoDate: string): string {
  const match = ISO_DATE.exec(isoDate);
  const month = match ? MONTHS[Number(match[2]) - 1] : undefined;
  if (!match || !month) {
    return isoDate;
  }
  return `${match[3]} ${month} ${match[1]}`;
}

/** Formats an amount with two decimals and digit grouping, for example `42,500.00`. */
export function formatAmount(amount: string | number): string {
  const value = Number(amount);
  if (!Number.isFinite(value)) {
    return String(amount);
  }
  return amountFormatter.format(value);
}

/** Returns up to two initials for a name, for example `RK` for `Ravi Kumar`. */
export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}
