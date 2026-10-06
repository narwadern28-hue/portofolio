import { createContext, useContext, useState, ReactNode } from "react";
import {
  CurrencyCode,
  currencies,
  DEFAULT_CURRENCY,
  CurrencyConfig,
} from "./currency";

interface CurrencyContextType {
  currentCurrency: CurrencyConfig;
  setCurrency: (code: CurrencyCode) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // ALWAYS start at USD ($99 USD) on every page load.
  // No browser locale, IP geolocation or automatic detection is consulted.
  // The visitor only ever sees a different currency if they manually pick
  // one from the header selector.
  const [currencyCode, setCurrencyCode] =
    useState<CurrencyCode>(DEFAULT_CURRENCY);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyCode(code);
  };

  const currentCurrency = currencies[currencyCode];

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}