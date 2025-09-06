import "./globals.css";
import TopBar from "@/components/topbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Don-Jay Autos",
  description: "Driving trust and quality with every car we sell and service",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <TopBar />
        {children}
      </body>
    </html>
  );
}
