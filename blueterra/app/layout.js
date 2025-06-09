import "./globals.css";

export const metadata = {
  title: "Blueterra",
  description: "Blueterra the travel website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=''>
        {children}
      </body>
    </html>
  );
}
