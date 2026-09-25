// Local development data — used only when the backend API is unreachable.
// Images are placeholders in /public/images/demo; replace once real product photos exist.

export const dummyCategories = [
  { _id: "cat-personalized-gifts", name: "Personalized Gifts", image: "/images/demo/category-personalized-gifts.jpg" },
  { _id: "cat-printing", name: "Printing", image: "/images/demo/category-printing.jpg" },
  { _id: "cat-packaging", name: "Packaging", image: "/images/demo/category-packaging.jpg" },
  { _id: "cat-invitations", name: "Invitations", image: "/images/demo/category-invitations.jpg" },
  { _id: "cat-corporate-gifts", name: "Corporate Gifts", image: "/images/demo/category-corporate-gifts.jpg" },
];

export const dummyProducts = [
  { id: "1", name: "Personalized Photo Mug", category: "cat-personalized-gifts", description: "Ceramic 11oz mug printed with your favourite photo or message. Dishwasher-safe, vibrant full-colour print.", price: 35, image: "/images/demo/product-1.jpg", stock: 120, featured: true },
  { id: "2", name: "Custom Photo Frame", category: "cat-personalized-gifts", description: "Elegant tabletop frame with a custom-printed photo and optional engraved name or date.", price: 60, image: "/images/demo/product-2.jpg", stock: 60, featured: true },
  { id: "3", name: "Personalized Gift Box", category: "cat-packaging", description: "Premium rigid gift box with a personalized lid print, ideal for occasions and hampers.", price: 120, image: "/images/demo/product-3.jpg", stock: 40, featured: true },
  { id: "4", name: "Custom Keychain", category: "cat-personalized-gifts", description: "Durable acrylic or metal keychain with your photo, logo or initials.", price: 20, image: "/images/demo/product-4.jpg", stock: 300, featured: false },
  { id: "5", name: "Premium Business Cards", category: "cat-printing", description: "Pack of 250 cards on 400gsm stock with matte or soft-touch lamination and optional gold foil.", price: 150, image: "/images/demo/product-5.jpg", stock: 500, featured: true },
  { id: "6", name: "Corporate Brochure", category: "cat-printing", description: "A4 tri-fold or booklet brochures, full-colour print on premium art paper. Price per 100 copies.", price: 450, image: "/images/demo/product-6.jpg", stock: 100, featured: false },
  { id: "7", name: "Custom Gift Box", category: "cat-packaging", description: "Branded gift box in your colours with custom insert — perfect for corporate and retail gifting.", price: 85, image: "/images/demo/product-7.jpg", stock: 80, featured: true },
  { id: "8", name: "Branded Carry Bag", category: "cat-packaging", description: "Paper carry bag with rope handles, printed with your logo. Price per bag, minimum 100.", price: 15, image: "/images/demo/product-8.jpg", stock: 1000, featured: false },
  { id: "9", name: "Wedding Invitation", category: "cat-invitations", description: "Luxury wedding invitation card with envelope, foil detailing and bilingual text on request.", price: 12, image: "/images/demo/product-9.jpg", stock: 800, featured: true },
  { id: "10", name: "Personalized Cushion", category: "cat-personalized-gifts", description: "Soft 40×40cm cushion with a full-colour custom print on the front.", price: 55, image: "/images/demo/product-10.jpg", stock: 70, featured: false },
  { id: "11", name: "Photo Calendar", category: "cat-printing", description: "12-month wall or desk calendar featuring your own photos on every page.", price: 70, image: "/images/demo/product-11.jpg", stock: 90, featured: false },
  { id: "12", name: "Corporate Gift Set", category: "cat-corporate-gifts", description: "Curated set with branded notebook, pen, bottle and card holder in a presentation box.", price: 250, image: "/images/demo/product-12.jpg", stock: 50, featured: true },
];

export const dummyBanners = [
  { _id: "banner-1", title: "Imprimo Trading — Premium Printing & Personalized Gifts", desktopImage: "/images/demo/hero-desktop.jpg", mobileImage: "/images/demo/hero-mobile.jpg", isActive: true, displayOrder: 1 },
];
