"use client";
import { ErrorProvider } from "@context/error";
import { MethodDataProvider } from "@context/methodData";
import { MantineProvider } from "@mantine/core";
import { theme } from "@styles/theme";
import { type Locale, NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

export interface ProvidersProps {
	children: ReactNode;
	locale: Locale;
	messages: Record<string, any>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<MantineProvider theme={theme}>
				<ErrorProvider>
					<MethodDataProvider>{children}</MethodDataProvider>
				</ErrorProvider>
			</MantineProvider>
		</NextIntlClientProvider>
	);
}
