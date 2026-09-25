import BreadcrumbProduct from "@/components/product-page/BreadcrumbProduct";
import Header from "@/components/product-page/Header";
import ProductListSec from "@/components/common/ProductListSec";
import { Product, ProductVariant } from "@/types/product.types";
import { notFound } from "next/navigation";
import { apiFetch } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 10; // short, so admin edits show up almost immediately
export const maxDuration = 30; // allow the Render API time to wake from sleep


async function getProduct(id: string): Promise<Product | null> {
  try {
    const res = await apiFetch(`/product/${id}`, {
      next: { revalidate: 10 },
    });
    if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) return null;
    const data = await res.json();
    const p = data.product ?? data;

    const variants: ProductVariant[] = (p.variants ?? []).map((v: any) => ({
      _id: v._id || "",
      color: v.color || v.name || "",
      modelName: v.modelName || "",
      sizeName: v.sizeName || "",
      sizesArray: Array.isArray(v.sizes)
        ? v.sizes.map((s: any) => ({
            _id: s._id || "",
            size: s.size || "",
            stock: s.stock ?? 0,
            price: s.price ?? 0,
          }))
        : [],
      price: v.price || 0,
      stock: v.stock || 0,
      images: Array.isArray(v.images) ? v.images : v.images ? [v.images] : [],
      isDefault: !!v.isDefault,
      description: v.description || "",
      duration: v.duration || "",
      capacity: v.capacity || "",
      maxGuests: v.maxGuests || "",
      roomType: v.roomType || "",
      serviceType: v.serviceType || "",
    }));

    const defaultVariant = variants.find((v) => v.isDefault) || variants[0];

    return {
      id: p._id,
      title: p.name,
      category: p.category?.name || "General",
      description: p.description || "No product description available.",
      srcUrl: defaultVariant?.images?.[0] || "/images/imprimo-logo.png",
      gallery: defaultVariant?.images || [],
      price: defaultVariant?.price || 0,
      discount: { amount: 0, percentage: 0 },
      rating: 4,
      variants,
      amenities: p.amenities || []
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

async function getRelatedProducts(): Promise<Product[]> {
  try {
    const res = await apiFetch(`/product`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    const data = await res.json();
    const products = data.products || data;
    if (!Array.isArray(products)) return [];
    
    return products.slice(0, 4).map((p: any) => {
      const variants: ProductVariant[] = (p.variants ?? []).map((v: any) => ({
        _id: v._id || "",
        color: v.color || v.name || "",
        modelName: v.modelName || "",
        sizeName: v.sizeName || "",
        sizesArray: [],
        price: v.price || 0,
        stock: v.stock || 0,
        images: Array.isArray(v.images) ? v.images : v.images ? [v.images] : [],
        isDefault: !!v.isDefault
      }));
      const defaultVariant = variants.find((v) => v.isDefault) || variants[0];
      return {
        id: p._id,
        title: p.name,
        srcUrl: defaultVariant?.images?.[0] || "/images/imprimo-logo.png",
        price: defaultVariant?.price || 0,
        rating: 4,
        discount: { amount: 0, percentage: 0 },
      };
    });
  } catch {
    return [];
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    notFound();
  }

  const productId = slug[0];
  
  try {
    const productData = await getProduct(productId);

    if (!productData?.title) {
      notFound();
    }

    return (
      <main>
        <div className="max-w-frame mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-im-rich/20 mb-5 sm:mb-6" />
          <BreadcrumbProduct title={productData?.title ?? "product"} />
          <section className="mb-11">
            <Header data={productData} />
          </section>
          
          <hr className="h-[1px] border-t-im-rich/20 my-10 sm:my-16" />
          <ProductListSec title="Related Products" data={await getRelatedProducts()} />
        </div>
      </main>
    );
  } catch (error) {
    console.error("Product page error:", error);
    notFound();
  }
}
