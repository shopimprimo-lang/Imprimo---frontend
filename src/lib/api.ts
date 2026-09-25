import { dummyBanners, dummyCategories, dummyProducts } from "@/data/dummy";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, ""); // no trailing slash → no "//product"

// Same shape the backend returns, so call sites don't care where data came from.
const toApiProduct = (p: (typeof dummyProducts)[number]) => ({
  _id: p.id,
  name: p.name,
  description: p.description,
  category: dummyCategories.find((c) => c._id === p.category),
  featured: p.featured,
  variants: [
    { _id: `${p.id}-v1`, color: "Standard", price: p.price, stock: p.stock, images: [p.image], isDefault: true, sizes: [] },
  ],
});

function dummyResponse(path: string): Response {
  const url = new URL(path, "http://local");
  const [resource, id] = url.pathname.split("/").filter(Boolean);

  if (resource === "product" && id) {
    const p = dummyProducts.find((p) => p.id === id);
    return p ? Response.json({ product: toApiProduct(p) }) : Response.json({ error: "Not found" }, { status: 404 });
  }
  if (resource === "product") {
    const q = url.searchParams.get("search")?.toLowerCase();
    const limit = Number(url.searchParams.get("limit")) || undefined;
    const products = dummyProducts.map(toApiProduct).filter(
      (p) => !q || p.name.toLowerCase().includes(q) || p.category?.name.toLowerCase().includes(q)
    );
    return Response.json({ products: products.slice(0, limit) });
  }
  if (resource === "category") return Response.json({ categories: dummyCategories });
  if (resource === "banner") return Response.json({ banners: dummyBanners });
  return Response.json({ error: "Not found" }, { status: 404 });
}

// fetch() against the backend. With NEXT_PUBLIC_API_URL set (production) the real API is the only
// source: failures come back as a 503 the pages treat as "no data" — never as demo products.
// Local dummy data is used only when no API is configured (local development without a backend).
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (!API_URL) return dummyResponse(path);
  try {
    // 20s covers most of a sleeping Render instance waking up; pages allow 30s (maxDuration).
    return await fetch(`${API_URL}${path}`, { ...init, signal: init.signal ?? AbortSignal.timeout(20000) });
  } catch (err: any) {
    if (err?.name === "AbortError" && init.signal?.aborted) throw err; // caller cancelled; keep their semantics
    return Response.json({ error: "The Imprimo server is not reachable right now." }, { status: 503 });
  }
}
