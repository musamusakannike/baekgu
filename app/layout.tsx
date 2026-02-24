import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "$BAEK (Baekgu) — March 1 Launch",
  description:
    "The Alpha Returns. The 300km Journey Ends Here. Join the pack before March 1st.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cinzel.variable} antialiased bg-background text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
