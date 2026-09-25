"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ResTopNavbar from "./ResTopNavbar";
import CartBtn from "./CartBtn";
import SearchInput from "../SearchInput";

const TopNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: 1, type: "MenuItem" as const, label: "Home", url: "/", children: [] },
    { id: 2, type: "MenuItem" as const, label: "About Us", url: "/about", children: [] },
    { id: 3, type: "MenuItem" as const, label: "Contact", url: "/#contact", children: [] },
  ];

  return (
    <nav
      className={cn(
        // Reference header: rgba(11,11,11,.95), 1px rgba(201,166,70,.1) bottom border, 15px vertical padding
        "z-50 sticky top-0 w-full transition-shadow duration-300 bg-[rgba(11,11,11,0.95)] backdrop-blur-md border-b border-[rgba(201,166,70,0.1)] py-[15px]",
        isScrolled && "shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
      )}
    >
      <div className="flex relative max-w-[1400px] mx-auto items-center justify-between px-4 sm:px-6 lg:px-10 gap-3">
        {/* Left: Logo — reference size 140×70 (from the 300×150 source: >2× pixels, sharp on retina) */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/imprimo-logo.png"
              alt="Imprimo Trading"
              width={300}
              height={150}
              className="object-contain w-[120px] h-[60px] sm:w-[140px] sm:h-[70px]"
              // Serve the original PNG: the optimizer's lossy AVIF re-encode blurred the thin lettering.
              unoptimized
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation links (Desktop) — Poppins 400, 1px tracking, gold */}
        <div className="hidden lg:flex flex-1 justify-center items-center gap-8 xl:gap-10">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={cn(
                "relative py-1 text-[16px] xl:text-[17.6px] font-normal tracking-[1px] text-im-accent transition-colors duration-300 hover:text-im-gold",
                "after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-im-gold after:transition-all after:duration-300",
                pathname === item.url ? "text-im-gold after:w-full" : "after:w-0 hover:after:w-full"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions and Mobile Hamburger */}
        <div className="flex items-center gap-4 md:gap-5 flex-shrink-0 justify-end">
          <div className="hidden lg:block w-60 xl:w-72">
            <SearchInput />
          </div>
          <CartBtn />
          <div className="lg:hidden flex items-center">
            <ResTopNavbar data={navItems} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
