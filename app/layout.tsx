import type { Metadata } from "next";
import { Assistant, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, GlobalEffect, Navbar, Footer, CommandMenu, MatrixRain, MusicToggleButton } from "@/components/layout";
import { MusicPlayer } from "@/components/music-player";

import { siteConfig } from "@/lib/config";
import { StructuredData } from "@/components/seo/structuredData";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/seo/schemas";
import { HobbiesModal } from "@/components/modals/hobbiesModal";
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
    description: "Software Development Engineer @Trellix focusing on data security and C++.",
    images: ["/og-image.png"],
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
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${assistant.variable} ${jetbrains.variable} antialiased`}
        suppressHydrationWarning
      >
        { }
        <StructuredData data={generatePersonSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GlobalEffect />
          <Navbar />
          <MatrixRain />
          <CommandMenu />
          <HobbiesModal />
          {children}
          <MusicPlayer />
          <MusicToggleButton />

          {/* Footer */}
          {/* <div className="h-20" /> */}
          <Footer />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Adarsh Anand",
                url: "https://adarshanand.dev",
                sameAs: [
                  "https://github.com/adarshanand67",
                  "https://linkedin.com/in/adarshanand67",
                ],
                jobTitle: "Software Development Engineer",
                worksFor: {
                  "@type": "Organization",
                  name: "Trellix",
                },
                description:
                  "Software Development Engineer @Trellix focusing on data security, C++, and secure systems.",
              }),
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
