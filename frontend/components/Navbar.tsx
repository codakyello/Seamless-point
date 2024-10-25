import Link from "next/link";
import React from "react";
import Button, { ButtonVariant } from "./Button";
import { usePathname } from "next/navigation";
import { IoMenu } from "react-icons/io5";

const siteRoutes = [
  { title: "Home", href: "/" },
  { title: "About us", href: "/about-us" },
  { title: "Products", href: "/products" },
  { title: "F.A.Q", href: "/faqs" },
  { title: "Contact us", href: "/contact-us" },
];
export default function Navbar() {
  //   const pathname = usePathname();
  const user = "kfja";
  const pathname = usePathname();
  const isDashboardPage = pathname.startsWith("/dashboard");

  return (
    <div
      className={`flex items-center justify-between h-16 px-5 fixed top-0 bg-white w-full z-50 ${
        isDashboardPage ? "border-b border-neutral-200" : ""
      }`}
    >
      <Link href="/">
        <BrandLogo />
      </Link>
      {!user && (
        <>
          <nav className="hidden lg:block flex-1">
            <ul className="flex items-center gap-8 mx-16">
              {siteRoutes.map((route, index) => (
                <li key={route.title}>
                  <Link
                    href={route.href}
                    className="whitespace-nowrap"
                    // ${pathname === route.href ? "font-bold text-black" : ""
                  >
                    {route.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex ml-auto lg:ml-0">
            <Button text="Sign in" variant={ButtonVariant.link} />
            <Button
              isRoundedLarge
              text="Sign up"
              variant={ButtonVariant.fill}
            />
          </div>
          <IoMenu className="text-3xl cursor-pointer lg:hidden ml-5" />
        </>
      )}
      {user && <div>profile</div>}
    </div>
  );
}
export function BrandLogo() {
  return (
    <div className="text-lg font-semibold">
      <span className="text-brandPry">SEAMLESS</span>
      <span className="text-brandSec">POINT</span>
    </div>
  );
}
