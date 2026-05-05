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
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
      },
    ],
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
