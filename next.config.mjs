/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "localhost" },
    ],
    formats: ["image/avif", "image/webp"],
    // Limit simultaneous image optimizations
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Uploaded images are stored by the backend as "/uploads/..." paths; serve them from this
  // origin so <img>/next/image treat them like local files.
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/?$/, "");
    return backend ? [{ source: "/uploads/:path*", destination: `${backend}/uploads/:path*` }] : [];
  },
  // The admin panel is a separate app (Imprimo-admin). Without this, /admin on the
  // customer site is a 404. Set ADMIN_URL in .env; unset = no redirect.
  async redirects() {
    const admin = process.env.ADMIN_URL;
    return admin ? [{ source: "/admin/:path*", destination: `${admin}/admin/:path*`, permanent: false }] : [];
  },
  compress: true,
  // Reduce JS payload — remove console.* in production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Faster builds + smaller output
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "lucide-react",
      "@radix-ui/react-icons",
      "framer-motion",
    ],
  },
};

export default nextConfig;
