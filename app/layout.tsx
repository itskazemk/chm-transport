import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Bus, Cable, TrafficCone, UserRound } from "lucide-react";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import "@mantine/core/styles.css"; // doesn't work with font

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
  title: "ایاب و ذهاب",
  description: "برنامه مدیریت ایاب و ذهاب خودرو ها و رانندگان",
};

const myFont = localFont({
  src: "./fonts/Vazirmatn-Regular.woff2",
  display: "swap",
});

const navLinks = [
  { label: "خودروها", href: "/vehicles", icon: <Bus /> },
  { label: "رانندگان", href: "/drivers", icon: <UserRound /> },
  { label: "مسیرها", href: "/routes", icon: <TrafficCone /> },
  { label: "؟؟؟ارتباط", href: "/connections", icon: <Cable /> },
];

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
      <body className="flex min-h-screen flex-col">
        <MantineProvider theme={{ fontFamily: "Vazirmatn" }}>
          <div className="flex-grow">
            <div className="drawer">
              <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="navbar mx-auto w-3/4 rounded bg-base-300 shadow-md">
                  <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-6 w-6 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                      </svg>
                    </label>
                  </div>
                  <div className="mx-2 flex-1 px-2">
                    <Link href="/">ایاب و ذهاب</Link>
                  </div>
                  <div className="hidden flex-none lg:block">
                    <ul className="menu menu-horizontal">
                      {/* Navbar menu content here */}
                      {navLinks.map((link) => (
                        <li key={link.label}>
                          <Link href={link.href}>
                            {link.label} {link.icon}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-4">{children}</div>
              </div>
              <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu min-h-full w-80 bg-base-200 p-4">
                  {/* Sidebar content here */}
                  <li>
                    <a>Sidebar Item 1</a>
                  </li>
                  <li>
                    <a>Sidebar Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
