import { Providers } from "@lib/providers";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import type { PropsWithChildren } from "react";
import WebVitals from "./components/WebVitals";
import "./globals.css";

// Fonts
const roboto = Roboto({ subsets: ["latin"] });

// Next.js
const siteName = "UniDB";

export const metadata: Metadata = {
	appleWebApp: {
		title: siteName,
	},
	applicationName: siteName,
	metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),
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
		creator: `${process.env.NEXT_PUBLIC_SITE_CONTENT_CREATOR}` || "@hyoretsu",
	},
};
export const viewport = {
	themeColor: "#4F53B7",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html className={roboto.className} lang="en" {...mantineHtmlProps}>
			<head>
				<link href="/site.webmanifest" rel="manifest" />
				<meta content={viewport.themeColor} name="theme-color" />

				<meta
					content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
					name="viewport"
				/>

				<ColorSchemeScript />
			</head>
			<body className="!pt-[calc(env(safe-area-inset-top)_+_1rem)] !pb-[calc(env(safe-area-inset-bottom)_+_1rem)]">
				<Providers>
					<main className="mx-auto flex max-w-full flex-col items-center px-4">{children}</main>
				</Providers>

				{process.env.NODE_ENV === "production" && <WebVitals />}
			</body>
		</html>
	);
}
