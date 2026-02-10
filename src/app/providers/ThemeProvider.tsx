"use client";

import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { darkTheme } from "@/shared/config/theme";

/**
 * @description Провайдер темы (MUI)
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
