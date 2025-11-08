import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hire View AI - AI-Powered Interview Screening",
  description: "Streamline your hiring with AI-powered interview screening. Screen candidates 10x faster with intelligent candidate ranking.",
  keywords: "AI screening, video interviews, candidate screening, hiring platform, recruitment technology",
  openGraph: {
    title: "Hire View AI - AI-Powered Interview Screening",
    description: "Streamline your hiring with AI-powered interview screening",
    url: "https://hireviewai.com",
    siteName: "Hire View AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
