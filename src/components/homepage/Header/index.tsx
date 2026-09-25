"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Banner } from "@/types/banner.types";

interface HeroBannerProps {
  banners?: Banner[];
}

export default function HeroBanner({ banners = [] }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const activeBanners = banners.filter((b) => b.isActive).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) {
    return null; // Don't show if no banners
  }

  return (
    <section className="relative w-full overflow-hidden bg-im-black grid">
      <AnimatePresence mode="wait">
        {activeBanners.map((banner, index) => {
          if (index !== currentIndex) return null;
          return (
            <motion.div
              key={banner._id || index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="col-start-1 row-start-1 w-full relative"
            >
              {/* Whole banner links to the shop; images carry their own artwork/CTA */}
              <Link href="/shop" aria-label={banner.title || "Shop now"} className="block">
              {/* Desktop Image */}
              <div className="hidden md:block w-full relative">
                <Image
                  src={banner.desktopImage}
                  alt={banner.title || "Banner"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>

              {/* Mobile Image */}
              <div className="block md:hidden w-full relative">
                <Image
                  src={banner.mobileImage || banner.desktopImage}
                  alt={banner.title || "Banner"}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              </Link>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Dots Indicator */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {activeBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-im-gold scale-125" : "bg-im-gold/40 hover:bg-im-gold/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}