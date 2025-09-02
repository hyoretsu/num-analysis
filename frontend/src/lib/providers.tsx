"use client";
import { MantineProvider } from "@mantine/core";
import { theme } from "@styles/theme";
import type { ReactNode } from "react";

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
