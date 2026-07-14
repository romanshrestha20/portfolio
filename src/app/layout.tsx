import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "../index.css";

const sans = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://romanshrestha.info"),
  title: { default: "Roman Shrestha | Software Engineer", template: "%s | Roman Shrestha" },
  description: "Roman Shrestha is a software engineering student building clear web and mobile products with React, Django, and Kotlin.",
  openGraph: {
    title: "Roman Shrestha | Software Engineer",
    description: "Selected full-stack web and mobile product work by Roman Shrestha.",
    url: "/",
    siteName: "Roman Shrestha",
    images: [{ url: "/portfolio-preview.jpeg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/portfolio-preview.jpeg"] },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#090b0c", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable}`}>{children}</body>
    </html>
  );
}
