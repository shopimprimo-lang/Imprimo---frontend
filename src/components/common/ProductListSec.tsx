import React from "react";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product.types";
import Link from "next/link";

type ProductListSecProps = {
  title: string;
  data: Product[];
  viewAllLink?: string;
  eyebrow?: string;
};

const ProductListSec = ({ title, data, viewAllLink, eyebrow }: ProductListSecProps) => {
  return (
    <section className="max-w-frame mx-auto text-center px-4 xl:px-0">
      <h2 className={cn([integralCF.className, "section-title"])}>{title}</h2>
      {eyebrow && <p className="mt-4 text-sm md:text-base font-light text-im-text/80">{eyebrow}</p>}
      <div className="mb-8 md:mb-12" />
      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mb-6 md:mb-9"
        >
          <CarouselContent className={cn("ml-0 space-x-3 sm:space-x-4 lg:space-x-5", data.length < 4 && "lg:justify-center")}>
            {data.map((product) => (
              <CarouselItem
                key={product.id}
                className="w-[calc(50%-6px)] sm:w-full sm:max-w-[245px] md:max-w-[280px] lg:max-w-[295px] pl-0 basis-auto shrink-0"
              >
                <ProductCard data={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        {viewAllLink && (
          <div className="w-full text-center">
            <Link
              href={viewAllLink}
              className="btn-gold w-full sm:w-auto"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductListSec;
