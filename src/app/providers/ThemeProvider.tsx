"use client";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme } from "@/shared/config/theme";
import { ReactNode } from "react";

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
