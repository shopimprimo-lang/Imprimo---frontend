import { Suspense } from "react";
import BreadcrumbShop from "@/components/shop-page/BreadcrumbShop";
import MobileFilters from "@/components/shop-page/filters/MobileFilters";
import Filters from "@/components/shop-page/filters";
import { FiSliders } from "react-icons/fi";
import ShopProductsList from "@/components/shop-page/ShopProductsList";

const ProductsSkeleton = () => (
  <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-5 animate-pulse">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="flex flex-col">
        <div className="bg-white/10 rounded-none aspect-square mb-3" />
        <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
        <div className="h-3 bg-white/10 rounded w-1/2 mb-2" />
        <div className="h-5 bg-white/10 rounded w-1/3" />
      </div>
    ))}
  </div>
);

export default function ShopPage() {
  return (
    <main className="pb-20">
      <div className="max-w-frame mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-im-rich/20 mb-5 sm:mb-6" />
        <BreadcrumbShop />
        <div className="flex md:space-x-5 items-start">
          <div className="hidden md:block min-w-[295px] max-w-[295px] border border-im-rich/20 rounded-none px-5 md:px-6 py-5 space-y-5 md:space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-bold text-im-text text-xl">Filters</span>
              <FiSliders className="text-2xl text-im-text/55" />
            </div>
            <Suspense fallback={<div className="space-y-3 animate-pulse">{Array.from({length:5}).map((_,i)=><div key={i} className="h-4 bg-white/10 rounded"/>)}</div>}>
              <Filters />
            </Suspense>
          </div>
          <div className="flex flex-col w-full space-y-5">
            <div className="flex items-center justify-between">
              <Suspense fallback={null}>
                <MobileFilters />
              </Suspense>
            </div>
            <Suspense fallback={<ProductsSkeleton />}>
              <ShopProductsList />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
