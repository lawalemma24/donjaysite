import "./globals.css";
import { Poppins } from "next/font/google";
import LayoutWrapper from "@/components/layoutwrapper";
import { Toaster } from "react-hot-toast";

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
        <LayoutWrapper>{children}</LayoutWrapper>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
