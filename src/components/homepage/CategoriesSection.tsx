import React from "react";
import { integralCF } from "@/styles/fonts";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
  products?: any[];
};

type Props = {
  categories: Category[];
};

export default function CategoriesSection({ categories }: Props) {
  if (!categories || categories.length === 0) return null;

  return (
    <section id="categories" className="max-w-frame mx-auto text-center px-4 xl:px-0">
      <h2 className={cn([integralCF.className, "section-title"])}>Shop by Category</h2>
      <p className="mt-4 mb-8 md:mb-12 text-sm md:text-base font-light text-im-text/80">Printing · Gifting · Packaging</p>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5">
        {categories.map((cat) => {
          return (
          <Link
            key={cat._id}
            href={`/shop?categories=${cat.name}`}
            className="card-luxe group flex flex-col overflow-hidden w-[calc(50%-6px)] sm:w-[calc(33.333%-11px)] lg:w-[calc(20%-16px)]"
          >
            <div className="relative w-full aspect-[4/3] sm:aspect-square bg-im-black overflow-hidden">
              {cat.image && (
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 text-left">
              <div className="min-w-0">
                <h3 className="font-heading font-semibold text-sm sm:text-base lg:text-lg leading-snug text-im-gold">
                  {cat.name}
                </h3>
                <p className="text-xs font-light text-im-muted mt-0.5">
                  {cat.products?.length || 0} {cat.products?.length === 1 ? "product" : "products"}
                </p>
              </div>
              <span className="text-im-gold text-lg leading-none transition-transform duration-300 group-hover:translate-x-1" aria-hidden>
                →
              </span>
            </div>
          </Link>
          );
        })}
      </div>
    </section>
  );
}
