import type { Metadata } from "next";
import { Suspense } from "react";
import Script from "next/script";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HashScroll from "@/components/HashScroll";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import ChatWidget from "@/components/ChatWidget";
import LedPromo from "@/components/LedPromo";
import Ambient from "@/components/Ambient";
import Spotlight from "@/components/Spotlight";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

// Гарчгийн уян хатан, цэвэрхэн фонт
const display = Manrope({
  variable: "--font-display-face",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Смарткарт ХХК | Smartcard",
  description:
    "Digital Identity and Security. Төлбөрийн карт, цахим бүртгэл, аюулгүй байдлын шийдэл.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased`}
      >
        <Ambient />
        <Script id="theme-init" strategy="beforeInteractive">
          {/* Харанхуй горим анхдагч; хэрэглэгч цайвар сонгосон бол л цайвар */}
          {`try{document.documentElement.classList.toggle("dark",localStorage.getItem("theme")!=="light")}catch(e){}`}
        </Script>
        <Suspense fallback={null}>
          <Navbar />
        </Suspense>
        <Suspense fallback={null}>
          <HashScroll />
        </Suspense>
        {children}
        <Footer />
        <ScrollToTop />
        <ScrollProgress />
        <ChatWidget />
        <Suspense fallback={null}>
          <LedPromo />
        </Suspense>
        <Spotlight />
      </body>
    </html>
  );
}