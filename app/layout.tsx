import type { Metadata } from "next";
import { Assistant, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { GlobalProvider } from "@/components/common/GlobalProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CommandMenu } from "@/components/layout/CommandMenu";
import { MatrixRain } from "@/components/ui/MatrixRain";
import { TerminalCursor } from "@/components/ui/TerminalCursor";
import BackToTop from "@/components/layout/BackToTop";
import MusicPlayer from "@/components/widgets/MusicPlayer";

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
    default: "Adarsh Anand",
    template: "%s | Adarsh Anand",
  },
  description:
    "Software Development Engineer @Trellix focusing on data security, C++, and secure systems. Ex-Intel. IIT Goa graduate.",
  keywords: [
    "Adarsh Anand",
    "Software Engineer",
    "C++",
    "Rust",
    "Data Security",
    "Intel SGX",
    "Trellix",
    "IIT Goa",
  ],
  authors: [{ name: "Adarsh Anand" }],
  creator: "Adarsh Anand",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adarshanand.dev",
    siteName: "Adarsh Anand",
    title: "Adarsh Anand - SDE @Trellix | C++ | Ex-Intel",
    description:
      "Software Development Engineer focusing on data security, confidential computing, and secure systems development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Adarsh Anand",
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
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
          <GlobalProvider>
            <Navbar />
            <TerminalCursor />
            <MatrixRain />
            <CommandMenu />
            {children}
            <MusicPlayer />
            <BackToTop />
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
