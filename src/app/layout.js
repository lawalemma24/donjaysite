import "./globals.css";
import { Poppins } from "next/font/google";
import RootLayoutClient from "@/components/RootLayoutClient";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: {
    default: "Donjay Autos — Buy, Sell, Swap & Inspect Cars in Nigeria",
    template: "%s | Donjay Autos",
  },
  description:
    "Looking for your next ride? Browse cars for sale in Nigeria, compare prices, sell or swap vehicles and book trusted car inspections easily.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "10Botm-7z2VFzwu7NmQPdct3AwUsjYcs0T5CVCm94Ek",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
