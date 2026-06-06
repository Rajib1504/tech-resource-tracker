"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./navbar";
import { Footer } from "./footer";

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;
  return <Navbar />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;
  return <Footer />;
}
