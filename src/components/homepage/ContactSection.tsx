import React from "react";
import * as motion from "framer-motion/client";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-frame mx-auto px-4 xl:px-0 mt-16 md:mt-24 mb-16 md:mb-24">
      <div className="bg-[#1a1a1a] rounded-none p-8 md:p-16 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D32F2F] rounded-full blur-[100px] opacity-20 pointer-events-none" />
        
        <div className="max-w-2xl relative z-10 text-center md:text-left mb-8 md:mb-0">
          <motion.h2
            initial={{ y: "20px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn([
              integralCF.className,
              "text-3xl md:text-4xl mb-4 font-bold drop-shadow-md",
            ])}
          >
            Ready to Elevate Your Brand?
          </motion.h2>
          <motion.p
            initial={{ y: "20px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white/80 text-sm md:text-base font-medium"
          >
            Contact us today for custom printing, corporate gifting, and premium branding solutions tailored to your business needs.
          </motion.p>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="relative z-10 flex gap-4"
        >
          <Link
            href="/contact"
            className="px-8 py-4 bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-semibold rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgb(211,47,47,39%)] hover:shadow-[0_6px_20px_rgba(211,47,47,23%)] hover:-translate-y-0.5 whitespace-nowrap"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
