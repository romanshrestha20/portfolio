import type { Metadata, Viewport } from "next";
import { IBM_Plex_Serif, Space_Mono } from "next/font/google";
import { getPortfolioSettings } from "@/lib/site-settings";
import "../index.css";
import { Analytics } from "@vercel/analytics/next"
const mono = Space_Mono({ subsets: ["latin"], variable: "--font-sans", weight: ["400", "700"] });
const display = IBM_Plex_Serif({ subsets: ["latin"], variable: "--font-display", weight: ["400", "500", "600", "700"] });

export async function generateMetadata(): Promise<Metadata> {
  const { personalDetails } = await getPortfolioSettings();
  const title = `${personalDetails.name} | ${personalDetails.role}`;
  const description = personalDetails.heroIntro;
  return {
    metadataBase: new URL("https://www.roman-shrestha.info"),
    title: { default: title, template: `%s | ${personalDetails.name}` },
    description,
    icons: {
      icon: [
        { url: "/favicon-light.svg", type: "image/svg+xml", media: "(prefers-color-scheme: light)" },
        { url: "/favicon-dark.svg", type: "image/svg+xml", media: "(prefers-color-scheme: dark)" },
      ],
      shortcut: "/logo192.png",
      apple: "/logo192.png",
    },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: personalDetails.name,
      images: [{
        url: "/share-preview.jpg",
        width: 1200,
        height: 630,
        alt: `${personalDetails.name}'s portfolio homepage`,
        type: "image/jpeg",
      }],
      type: "website",
    },
    twitter: { card: "summary_large_image", images: ["/share-preview.jpg"] },
    alternates: { canonical: "/" },
  };
}

export const viewport: Viewport = { themeColor: "#1a1b12", colorScheme: "dark light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
     <Analytics />
      <body className={`${mono.variable} ${display.variable}`}>{children}</body>
    </html>
  );
}
