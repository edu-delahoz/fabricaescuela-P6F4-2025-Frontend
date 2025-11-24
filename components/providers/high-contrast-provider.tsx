"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type HighContrastContextValue = {
  isHighContrast: boolean;
  toggleHighContrast: () => void;
  setHighContrast: (value: boolean) => void;
};

const HighContrastContext = createContext<
  HighContrastContextValue | undefined
>(undefined);

export function HighContrastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedPreference = window.localStorage.getItem(
      "couriersync-high-contrast"
    );
    if (storedPreference === "true") {
      setIsHighContrast(true);
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined" || typeof window === "undefined") {
      return;
    }

    document.body.classList.toggle("high-contrast", isHighContrast);
    window.localStorage.setItem(
      "couriersync-high-contrast",
      isHighContrast ? "true" : "false"
    );
  }, [isHighContrast]);

  const value = useMemo(
    () => ({
      isHighContrast,
      toggleHighContrast: () => setIsHighContrast((prev) => !prev),
      setHighContrast: (value: boolean) => setIsHighContrast(value),
    }),
    [isHighContrast]
  );

  return (
    <HighContrastContext.Provider value={value}>
      {children}
    </HighContrastContext.Provider>
  );
}

export function useHighContrast() {
  const context = useContext(HighContrastContext);
  if (!context) {
    throw new Error(
      "useHighContrast debe usarse dentro de un HighContrastProvider"
    );
  }
  return context;
}
