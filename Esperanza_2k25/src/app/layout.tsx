import ConditionalFooter from "@/components/Shared/ConditionalFooter";
import Providers from "@/components/Shared/Providers";
import { metaDescription } from "@/utils/static/metaData";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { sedgwick, roboto } from "@/utils/fonts";
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
  title: "Esperanza2k26 | Home",
  description: metaDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sedgwick.variable} ${roboto.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <ConditionalFooter />
      </body>
    </html>
  );
}
