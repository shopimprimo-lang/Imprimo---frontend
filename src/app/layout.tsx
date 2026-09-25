import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { integralCF, satoshi } from "@/styles/fonts";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";

const title = "Imprimo Trading | Premium Printing & Personalized Gifts";
const description =
  "Premium printing, personalized gifts, packaging and branded solutions from Imprimo Trading in Qatar.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://imprimotrading.com"),
  title,
  description,
  keywords: "Imprimo Trading, Printing Qatar, Personalized Gifts, Corporate Gifts Doha, Packaging",
  openGraph: {
    siteName: "Imprimo Trading",
    title,
    description,
    images: ["/images/imprimo-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  }
};

export const viewport: Viewport = {
  themeColor: "#0B0B0B",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${satoshi.variable} ${integralCF.variable} flex flex-col min-h-screen`}>
        <HolyLoader color="#D4AF37" />
        <Providers>
          {/* Navbar */}
          <TopNavbar />
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer - Always at bottom */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
