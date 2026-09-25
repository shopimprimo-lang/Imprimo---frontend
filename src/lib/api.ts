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

// fetch() against the backend, falling back to local dummy data when the API
// is unset, unreachable or not returning JSON (e.g. no database yet).
export async function apiFetch(path: string, init: RequestInit = {}): Promise<Response> {
  if (API_URL) {
    try {
      // Timeout so a backend stuck waiting on a DB doesn't hang server renders.
      const res = await fetch(`${API_URL}${path}`, { ...init, signal: init.signal ?? AbortSignal.timeout(8000) });
      if (res.ok && res.headers.get("content-type")?.includes("application/json")) return res;
      if (res.status === 404 && res.headers.get("content-type")?.includes("application/json")) return res;
    } catch (err: any) {
      if (err?.name === "AbortError") throw err; // caller cancelled; keep their semantics
    }
  }
  return dummyResponse(path);
}
