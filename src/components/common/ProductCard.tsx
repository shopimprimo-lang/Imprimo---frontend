import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
  // pass true for above-the-fold cards (first row) to eagerly load
  priority?: boolean;
};

const ProductCard = ({ data, priority = false }: ProductCardProps) => {
  return (
    <Link
      href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className="card-luxe flex flex-col items-start group w-full h-full overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative bg-im-black w-full aspect-[4/3] sm:aspect-square overflow-hidden flex-shrink-0">
        <Image
          src={data.srcUrl}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 295px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 [transition-timing-function:cubic-bezier(0.165,0.84,0.44,1)]"
          alt={data.title || "Product"}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-sm px-2.5 py-1 border border-[rgba(212,175,55,0.4)]">
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[1.5px] uppercase text-im-gold">
            {data.price > 0 ? "In Stock" : "Request"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col w-full p-4 sm:p-6 flex-1">
        
        {/* Category Label */}
        {data.category && (
          <span className="text-[10px] sm:text-[11px] font-medium text-im-muted uppercase tracking-[2px] mb-2 block text-left">
            {data.category}
          </span>
        )}

        <strong className="font-heading font-semibold text-im-gold text-base sm:text-lg lg:text-xl tracking-[1px] line-clamp-2 leading-snug text-left">
          {data.title}
        </strong>

        <p className="text-im-text/85 font-light text-xs sm:text-sm line-clamp-2 mt-2.5 mb-4 text-left leading-relaxed flex-1">
          {data.description || "Premium personalized printing solutions for your brand."}
        </p>

        <div className="flex flex-wrap items-end justify-between gap-2 w-full mt-auto pt-4 border-t border-im-rich/15">
          <div className="flex flex-col">
            <span className="text-[10px] text-im-muted font-normal uppercase tracking-[1.5px] text-left">Starting at</span>
            <span className="font-medium text-im-text text-lg sm:text-xl whitespace-nowrap">
              {data.price > 0 ? `QAR ${data.price}` : "Custom"}
            </span>
          </div>

          {/* View Details Button */}
          <div className="border border-im-gold text-im-gold group-hover:bg-im-gold group-hover:text-black px-3 sm:px-4 py-2 font-semibold text-[10px] sm:text-[11px] uppercase tracking-[1.5px] whitespace-nowrap transition-colors duration-300 flex items-center gap-1">
            View Details 
            <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);
