import type { Metadata, Viewport } from "next";
import { Assistant, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { StructuredData } from "@/components/seo";
import { ClientLayout, DLPProvider } from "@/components/layout";
import { siteConfig } from "@/lib/config";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/seo";

const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["latin"],
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
export const metadata: Metadata = {
  referrer: "no-referrer",
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seo.keywords],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adarsh Anand - SDE @Trellix",
    description:
      "Software Development Engineer @Trellix focusing on data security and C++.",
    images: ["/ogImage.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${assistant.variable} ${jetbrains.variable} antialiased`}
        suppressHydrationWarning
      >
        <StructuredData data={generatePersonSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <ClientLayout>
          <DLPProvider>{children}</DLPProvider>
        </ClientLayout>
      </body>
    </html>
  );
}
