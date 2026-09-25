import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import { Gift, Star, HeartHandshake, Zap, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutUsSection() {
  return (
    <section id="about" className="max-w-[1200px] mx-auto px-4 xl:px-0 mt-8 md:mt-12 mb-12 md:mb-16">
      {/* Title Section */}
      <div className="text-center mb-8 md:mb-12">
        <motion.div
          initial={{ y: "30px", opacity: 0 }}
          whileInView={{ y: "0", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={cn([integralCF.className, "section-title"])}>About Us</h2>
          <p className="mt-5 max-w-3xl mx-auto text-base md:text-lg text-im-text/85 font-light leading-relaxed">
            Welcome to Imprimo Trading – your trusted destination in Qatar for premium printing, personalized gifts and branded solutions.
          </p>
        </motion.div>
      </div>

      {/* Main Philosophy Section */}
      <motion.div
        initial={{ y: "40px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="card-luxe p-6 sm:p-8 md:p-12 mb-12 md:mb-20"
      >
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-im-gold leading-tight">
              Preserving Memories, Elevating Brands
            </h3>
            <p className="text-im-text/85 font-light text-base md:text-lg leading-relaxed">
              At Imprimo Trading, we believe every memory deserves to be beautifully preserved and every brand deserves to stand out. We offer a wide range of high-quality printing services and customized gift products designed for individuals, businesses, schools, and corporate clients.
            </p>
            <p className="text-im-text/85 font-light text-base md:text-lg leading-relaxed">
              From photo mugs, cushions, keychains, photo frames, mementos, gift hampers, albums, business cards, wedding cards, ID cards, stickers, banners, and corporate branding materials to many more creative products, we combine modern printing technology with skilled craftsmanship to deliver exceptional quality.
            </p>
          </div>
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative shrink-0 aspect-square w-56 h-56 md:w-72 md:h-72 bg-im-black border border-[rgba(212,175,55,0.35)] rounded-full flex items-center justify-center">
               <div className="absolute inset-0 bg-im-gold/10 rounded-full blur-3xl"></div>
               <Image src="/images/imprimo-logo.png" alt="Imprimo Trading" width={220} height={110} className="relative z-10 object-contain w-[180px] md:w-[220px] h-auto" unoptimized />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Values / Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 md:mb-24">
        {[
          {
            icon: <Star className="w-8 h-8 text-im-gold" />,
            title: "Exceptional Quality",
            desc: "Premium materials combined with skilled craftsmanship for products you'll be proud to own or gift.",
          },
          {
            icon: <HeartHandshake className="w-8 h-8 text-im-gold" />,
            title: "Customer First",
            desc: "Customer satisfaction is our highest priority. Every order is handled with strict attention to detail.",
          },
          {
            icon: <Zap className="w-8 h-8 text-im-gold" />,
            title: "Timely Delivery",
            desc: "We ensure making printing easy, gifting memorable, and delivering your products exactly when you need them.",
          }
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ y: "40px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + (idx * 0.1), duration: 0.6 }}
            className="card-luxe p-6 sm:p-8 group"
          >
            <div className="w-16 h-16 bg-im-black border border-[rgba(212,175,55,0.35)] flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h4 className="font-heading text-xl font-semibold text-im-gold mb-3">{item.title}</h4>
            <p className="text-im-text/80 font-light leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Footer Call to Action */}
      <motion.div
        initial={{ y: "30px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="bg-im-velvet border border-[rgba(201,166,70,0.3)] p-8 md:p-12 text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 text-im-gold/10">
          <Gift className="w-64 h-64" strokeWidth={1} />
        </div>
        <div className="relative z-10">
          <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4 text-im-gold">
            Bring Your Ideas To Life
          </h3>
          <p className="text-im-text/85 font-light text-base md:text-lg max-w-2xl mx-auto mb-7">
            Whether you're celebrating a special occasion, promoting your business, or creating something unique, Imprimo Trading is here for you.
          </p>
          <Link href="/shop" className="btn-gold">
            SHOP NOW
          </Link>
          <p className="mt-5 text-xs tracking-[2px] uppercase text-im-rich">
            Imprimo Trading · Service Beyond Expectations
          </p>
        </div>
      </motion.div>
    </section>
  );
}
