"use client";

import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import ThemeProvider from "./ThemeProvider";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
