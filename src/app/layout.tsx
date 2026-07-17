import type { Metadata, Viewport } from "next";
import { IBM_Plex_Serif, Space_Mono } from "next/font/google";
import "../index.css";
import { Analytics } from "@vercel/analytics/next"
const mono = Space_Mono({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "700"] });
const display = IBM_Plex_Serif({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.roman-shrestha.info"),
  title: { default: "Roman Shrestha | Software Engineer", template: "%s | Roman Shrestha" },
  description: "Roman Shrestha is a software engineering student building clear web and mobile products with React, Django, and Kotlin.",
  icons: {
    icon: [
      { url: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
    ],
    shortcut: "/logo192.png",
    apple: "/logo192.png",
  },
  openGraph: {
    title: "Roman Shrestha | Software Engineer",
    description: "Selected full-stack web and mobile product work by Roman Shrestha.",
    url: "/",
    siteName: "Roman Shrestha",
    images: [
      {
        url: "/share-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Roman Shrestha's software engineering portfolio homepage",
        type: "image/jpeg",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/share-preview.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#1a1b12", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
     <Analytics />
      <body className={`${mono.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
