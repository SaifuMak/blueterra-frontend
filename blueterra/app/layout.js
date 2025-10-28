import "./globals.css";

import { Toaster } from 'sonner';

export const metadata = {
  title: "BlueTerra | Curated Travel and Experiences",
  description: "Discover Blueterra — your gateway to curated travel itineraries, unforgettable adventures, and handpicked travel packages across the globe.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={jost.className}> */}
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className="">
        <Toaster position="bottom-right" richColors />

        {/* <Navbar/> */}
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
