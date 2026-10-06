export type CurrencyCode = "USD" | "GBP" | "AUD" | "CAD" | "EUR" | "INR";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  prefix: string;
  amount: string;
  label: string;
  country: string;
}

/**
 * Fixed market starting prices. These are NOT live currency conversions;
 * each currency has its own absolute minimum base rate.
 *
 * Order matters: the first entry (USD) is used as the default displayed
 * price on first page load and across all sections of the site.
 */
export const currencies: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: "USD",
    symbol: "$",
    prefix: "$",
    amount: "99",
    label: "$99 USD",
    country: "United States",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    prefix: "£",
    amount: "99",
    label: "£99 GBP",
    country: "United Kingdom",
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    prefix: "A$",
    amount: "199",
    label: "A$199 AUD",
    country: "Australia",
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    prefix: "C$",
    amount: "179",
    label: "C$179 CAD",
    country: "Canada",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    prefix: "€",
    amount: "119",
    label: "€119 EUR",
    country: "Europe",
  },
  INR: {
    code: "INR",
    symbol: "₹",
    prefix: "₹",
    amount: "10,000",
    label: "₹10,000 INR",
    country: "India",
  },
};

/**
 * Returns the default starting currency — always USD.
 *
 * The site never uses browser locale, IP geolocation or any automatic
 * detection to pick a currency. USD ($99) is the headline international
 * price every visitor sees on first load. Other currencies are only
 * shown when the visitor explicitly selects them in the manual selector.
 */
export const DEFAULT_CURRENCY: CurrencyCode = "USD";