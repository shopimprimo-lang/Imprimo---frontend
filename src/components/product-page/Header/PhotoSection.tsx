"use client";

import { Product } from "@/types/product.types";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);

  // When the variant changes (srcUrl changes), reset to the new variant's first image
  useEffect(() => {
    setSelected(data.srcUrl);
  }, [data.srcUrl]);

  return (
    <div className="flex flex-col-reverse lg:flex-row lg:space-x-3.5">
      {data?.gallery && data.gallery.length > 0 && (
        <div className="flex lg:flex-col gap-3 lg:gap-3.5 w-full lg:w-[152px] overflow-x-auto lg:overflow-visible snap-x snap-mandatory py-2 lg:py-0 scrollbar-hide shrink-0">
          {data.gallery.map((photo, index) => (
            <button
              key={index}
              type="button"
              className={`relative shrink-0 bg-white/5 rounded-none xl:rounded-none w-[90px] h-[90px] sm:w-[111px] sm:h-[111px] lg:w-full lg:h-[152px] overflow-hidden transition-all duration-300 snap-center ${
                selected === photo ? "ring-2 ring-offset-2 ring-im-gold opacity-100" : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo}
                fill
                sizes="152px"
                className="rounded-none object-cover hover:scale-110 transition-all duration-500"
                alt={data.title}
                priority
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      <div className="relative flex items-center justify-center bg-white/5 rounded-none sm:rounded-none w-full sm:w-96 md:w-full mx-auto h-full max-h-[530px] min-h-[330px] lg:min-h-[380px] xl:min-h-[530px] overflow-hidden mb-3 lg:mb-0">
        <Image
          src={selected}
          fill
          sizes="(max-width: 768px) 100vw, 444px"
          className="rounded-none object-cover hover:scale-110 transition-all duration-500"
          alt={data.title}
          priority
          unoptimized
        />
      </div>
    </div>
  );
};

export default PhotoSection;
