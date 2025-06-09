import "./globals.css";
import Navbar from "@/components/Navbar/page";

export const metadata = {
  title: "Blueterra",
  description: "Blueterra the travel website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        {/* <Navbar/> */}
        {children}
      </body>
    </html>
  );
}
