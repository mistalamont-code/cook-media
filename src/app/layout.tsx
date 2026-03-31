import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "COOK/Media \u2014 Erie, PA Wedding Photography & Media Production",
  description:
    "Professional wedding photography, videography, event coverage, and live sound production in Erie, PA. Book COOK/Media for your next event.",
};

export const viewport: Viewport = {
  themeColor: "#0F0620",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
