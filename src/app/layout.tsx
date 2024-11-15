"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import "./globals.css";
import localfont from "next/font/local";
import { usePathname } from "next/navigation";

// Import fonts
const SpButchLite = localfont({
  src: [{ path: "../../public/fonts/SpButchLiteBold-8O88B.woff", weight: "1000" }],
  variable: "--font-SpButchLite",
});

const SuperFunky = localfont({
  src: [{ path: "../../public/fonts/SuperFunky-lgmWw.woff", weight: "1000" }],
  variable: "--font-SuperFunky",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname === "/profile";

  return (
    <html lang="en" className={`${SpButchLite.variable} ${SuperFunky.variable}`}>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/assets/favicon.ico" type="image/x-icon" />
        <title>Chemic.ly</title>
      </head>
      <body className="bg-white relative overflow-x-hidden mx-auto">
        {!isAuthPage && <Header />}
        {children}
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
