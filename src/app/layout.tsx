import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "@mantine/core/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";
import WebVitals from "./components/WebVitals";
import "./globals.css";
import { Providers } from "./lib/providers";

// Fonts

const inter = Inter({ subsets: ["latin"] });

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
    <html className={inter.className} lang="en" {...mantineHtmlProps}>
      <head>
        <link href="/site.webmanifest" rel="manifest" />
        <meta content={viewport.themeColor} name="theme-color" />

        <meta content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no viewport-fit=cover" name="viewport" />

        <ColorSchemeScript />
      </head>
      <body className="pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <Providers>{children}</Providers>

        {process.env.NODE_ENV === "production" && <WebVitals />}
      </body>
    </html>
  );
}
