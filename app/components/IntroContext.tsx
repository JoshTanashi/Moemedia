"use client";

import { createContext, useContext, useCallback, useMemo, useRef } from "react";

type IntroRegistry = {
  register: (el: HTMLDivElement) => () => void;
  elementsRef: React.RefObject<Set<HTMLDivElement>>;
};

const IntroContext = createContext<IntroRegistry | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const elementsRef = useRef<Set<HTMLDivElement>>(new Set());

  const register = useCallback((el: HTMLDivElement) => {
    elementsRef.current.add(el);
    return () => {
      elementsRef.current.delete(el);
    };
  }, []);

  const value = useMemo(
    () => ({ register, elementsRef }),
    [register],
  );

  return <IntroContext.Provider value={value}>{children}</IntroContext.Provider>;
}

export function useIntroContext() {
  return useContext(IntroContext);
}
