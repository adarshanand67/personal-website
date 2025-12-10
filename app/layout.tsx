import type { Metadata } from "next";
import { Assistant, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { GlobalProvider } from "@/components/common/GlobalProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { MatrixRain } from "@/components/ui/MatrixRain";
import MusicPlayer from "@/components/widgets/MusicPlayer";
import MusicToggleButton from "@/components/widgets/MusicToggleButton";
import ChatWidget from "@/components/widgets/ChatWidget";
import { siteConfig } from "@/config";
import { StructuredData } from "@/components/seo/StructuredData";
import { generatePersonSchema, generateWebSiteSchema } from "@/lib/seo/schemas";

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
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.seo.keywords], // Convert readonly to mutable
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
        {/* SEO Structured Data */}
        <StructuredData data={generatePersonSchema()} />
        <StructuredData data={generateWebSiteSchema()} />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>

          <GlobalProvider>
            <Navbar />
            <MatrixRain />
            <CommandMenu />
            {children}
            <MusicPlayer />
            <MusicToggleButton />
            <ChatWidget />
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
          </GlobalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
