import "./globals.css";
import { Jost } from 'next/font/google'
import Navbar from "@/components/Navbar/page";
import Footer from "@/components/Footer/page";

export const metadata = {
  title: "Blueterra",
  description: "Blueterra the travel website",
};

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '700'],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={jost.className}>
        {/* <Navbar/> */}
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
