"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";

/**
 * @description Обертки провайдеров
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
