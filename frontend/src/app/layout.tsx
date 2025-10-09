import { Providers } from "@app/providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { Roboto } from "next/font/google";
import type { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import WebVitals from "./components/WebVitals";
import "./globals.css";

// Fonts
const roboto = Roboto({ subsets: ["latin"] });

// Next.js
const siteName = "NumAnalysis";

export const metadata: Metadata = {
	appleWebApp: {
		title: siteName,
	},
	applicationName: siteName,
	metadataBase: new URL("https://num-analysis.hyoretsu.com"),
	openGraph: {
		images: [
			{
				alt: siteName,
				height: 627,
				url: "/opengraph.jpg",
				width: 1200,
			},
		],
		siteName,
		type: "website",
	},
	title: {
		default: siteName,
		template: `%s | ${siteName}`,
	},
	twitter: {
		card: "summary_large_image",
		creator: "@hyoretsu",
	},
};
export const viewport = {
	themeColor: "#4F53B7",
};

export default async function RootLayout({ children }: PropsWithChildren) {
	const locale = "pt";
	const messages = await getMessages();

	return (
		<html className={roboto.className} lang={locale} {...mantineHtmlProps}>
			<head>
				<meta
					content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
					name="viewport"
				/>

				<ColorSchemeScript />
			</head>
			<body className="pt-12 pb-6">
				<Providers locale={locale} messages={messages}>
					<ToastContainer />

					<main className="flex w-full flex-col items-center px-4">{children}</main>
				</Providers>

				{process.env.NODE_ENV === "production" && <WebVitals />}
			</body>
		</html>
	);
}
