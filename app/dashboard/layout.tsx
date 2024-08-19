import Avatar from "@/components/Avatar";
import { verifySession } from "@/utils/session";
import { Bus, Cable, TrafficCone, UserRound } from "lucide-react";
import Link from "next/link";
import { Workflow } from "lucide-react";
import Image from "next/image";
import icon from "@/app/chadormalu.gif";

const navLinks = [
  { label: "خودروها", href: "/dashboard/vehicles", icon: <Bus /> },
  { label: "رانندگان", href: "/dashboard/drivers", icon: <UserRound /> },
  { label: "مسیرها", href: "/dashboard/routes", icon: <TrafficCone /> },
  { label: "ارتباط", href: "/dashboard/connections", icon: <Cable /> },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await verifySession();

  return (
    <div className="flex-grow">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* Navbar */}
          <div className="navbar rounded bg-base-300 shadow-lg">
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
              <Link href="/dashboard" className="flex items-center gap-2">
                <Image src={icon} width={50} alt="logo" /> ایاب و ذهاب
              </Link>
            </div>
            <div className="hidden flex-none lg:block lg:flex">
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
              <div className="mr-2">
                <Avatar user={user} />
              </div>
            </div>
          </div>
          <div className="p-4">{children}</div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu min-h-full w-80 bg-base-200 p-4">
            {/* Sidebar content here */}
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
    </div>
  );
}
