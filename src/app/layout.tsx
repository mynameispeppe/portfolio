import type { Metadata } from "next";
import { Trirong, Dosis } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Giuseppe Milazzo",
  description: "Portfolio of Giuseppe Milazzo, Angular frontend developer based in Pescara, Italy. I build scalable and maintainable web applications.",
  keywords: ["Angular", "Frontend Developer", "Web Developer", "Portfolio", "Giuseppe Milazzo", "Pescara"],
  authors: [{ name: "Giuseppe Milazzo" }],
  openGraph: {
    title: "Giuseppe Milazzo — Frontend Developer",
    description: "I build scalable and maintainable Angular applications. Based in Pescara, Italy.",
    url: "https://giuseppemilazzo.dev",
    siteName: "Giuseppe Milazzo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Giuseppe Milazzo — Angular Developer",
    description: "I build scalable and maintainable Angular applications.",
  },
};

const trirong = Trirong({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-trirong",
});

const dosis = Dosis({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dosis",
});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body className={`${trirong.variable} ${dosis.variable}`}>
      {children}
      <Analytics />
    </body>
    </html>
  );
}