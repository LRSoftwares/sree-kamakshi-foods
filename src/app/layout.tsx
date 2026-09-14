import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Sree Kamakshi Foods | Authentic Homemade Andhra Pickles",
  description:
    "Fresh homemade Andhra pickles prepared only after your order. No preservatives, no shortcuts, just pure homemade goodness. Order Gongura Pickle today!",
  keywords: [
    "Andhra pickles",
    "homemade pickles",
    "Gongura pickle",
    "fresh pickle",
    "Chennai pickles",
    "traditional pickles",
    "no preservatives",
  ],
  openGraph: {
    title: "Sree Kamakshi Foods | Authentic Homemade Andhra Pickles",
    description:
      "Small-batch traditional recipes made only after your order is confirmed.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
