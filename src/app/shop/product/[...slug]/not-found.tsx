import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">Product Not Found</h2>
      <p className="text-im-muted mb-8 max-w-md">
        We couldn't find the product you're looking for. It might have been removed, renamed, or temporarily unavailable.
      </p>
      <Link 
        href="/shop" 
        className="btn-gold"
      >
        Browse Our Shop
      </Link>
    </div>
  );
}
