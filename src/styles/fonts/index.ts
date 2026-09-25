import { Playfair_Display, Poppins } from "next/font/google";

// Typography from the imprimotrading.com reference: Playfair Display headings, Poppins body.
// The exported names are kept because pages import them as the shared heading/body fonts.
const integralCF = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const satoshi = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export { integralCF, satoshi };
