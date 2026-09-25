import ProductListSec from "@/components/common/ProductListSec";
import HeroBanner from "@/components/homepage/Header";
import CategoriesSection from "@/components/homepage/CategoriesSection";
import { Product } from "@/types/product.types";
import { Banner } from "@/types/banner.types";
import { apiFetch } from "@/lib/api";

export const revalidate = 10; // short, so admin edits show up almost immediately
export const maxDuration = 30; // allow the Render API time to wake from sleep


async function getProducts(): Promise<Product[]> {
  try {
    const res = await apiFetch(`/product`, {
      next: { revalidate: 10 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return [];
    const data = await res.json();
    if (!data.products) return [];

    return data.products.map((p: any) => {
      const defaultVariant =
        p.variants?.find((v: any) => v.isDefault) || p.variants?.[0];
      const startingPrice = defaultVariant?.price || 0;

      return {
        id: p._id,
        title: p.name,
        category: p.category?.name || "General",
        description: p.description || "No description available.",
        srcUrl: defaultVariant?.images?.[0] || "/images/imprimo-logo.png",
        gallery: defaultVariant?.images || [],
        price: startingPrice,
        discount: { amount: 0, percentage: 0 },
        rating: 4,
        amenities: p.amenities || [],
        featured: !!p.featured
      };
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function getCategories() {
  try {
    const res = await apiFetch(`/category`, {
      next: { revalidate: 10 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return [];
    const data = await res.json();
    return data.categories ?? [];
  } catch {
    return [];
  }
}

async function getBanners(): Promise<Banner[]> {
  try {
    const res = await apiFetch(`/banner`, {
      next: { revalidate: 10 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return [];
    const data = await res.json();
    return data.banners ?? [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
}

// Server component — no "use client", no useEffect, no client-side waterfall
export default async function Home() {
  const [products, categories, banners] = await Promise.all([
    getProducts(),
    getCategories(),
    getBanners(),
  ]);
  const featured = products.filter((p) => p.featured);

  return (
    <>
      <HeroBanner banners={banners} />
      <div className="py-14 md:py-20">
        <CategoriesSection categories={categories} />
      </div>

      <div id="products" className="bg-im-velvet border-t border-[rgba(201,166,70,0.1)] py-14 md:py-20">
        <ProductListSec
          title="Featured Products"
          eyebrow="Handpicked for you"
          data={featured.length ? featured : products}
          viewAllLink="/shop"
        />
      </div>
    </>
  );
}
