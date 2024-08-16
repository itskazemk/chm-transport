import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import "@mantine/core/styles.css";
import { ColorSchemeScript } from "@mantine/core";
import Providers from "./provider";

export const metadata: Metadata = {
  title: "ایاب و ذهاب",
  description: "برنامه مدیریت ایاب و ذهاب خودرو ها و رانندگان",
};

const myFont = localFont({
  src: "./fonts/Vazirmatn-Regular.woff2",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={myFont.className}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <main className="flex h-screen flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
