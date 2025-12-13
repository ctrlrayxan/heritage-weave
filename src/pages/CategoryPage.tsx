import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { OrnateDivider } from "@/components/ui/ornate-divider";
import { EnquiryModal } from "@/components/ui/enquiry-modal";
import categoryJewellery from "@/assets/category-jewellery.jpg";
import categoryPashmina from "@/assets/category-pashmina.jpg";
import categoryPashtush from "@/assets/category-pashtush.jpg";
import categoryAntiques from "@/assets/category-antiques.jpg";

const categoryData: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  products: Array<{
    id: string;
    name: string;
    sku: string;
    materials: string;
    badge?: string;
    size?: "small" | "medium" | "large";
  }>;
}> = {
  jewellery: {
    title: "Jewellery Collection",
    description: "Temple traditions meet timeless elegance. Each piece is handcrafted with centuries-old techniques, carrying the soul of Kerala's artisan heritage.",
    heroImage: categoryJewellery,
    products: [
      { id: "1", name: "Maharani Temple Necklace", sku: "JN-001", materials: "22K Gold, Ruby, Pearl", size: "large" },
      { id: "2", name: "Lakshmi Pendant Set", sku: "JN-002", materials: "22K Gold, Emerald", size: "medium" },
      { id: "3", name: "Chandbali Earrings", sku: "JE-003", materials: "22K Gold, Uncut Diamond", size: "small" },
      { id: "4", name: "Kemp Temple Bangles", sku: "JB-004", materials: "22K Gold, Kemp Stones", size: "medium" },
      { id: "5", name: "Nagas Work Choker", sku: "JN-005", materials: "22K Gold, Ruby", size: "large" },
      { id: "6", name: "Traditional Jhumka", sku: "JE-006", materials: "22K Gold, Pearl", size: "small" },
    ],
  },
  pashminas: {
    title: "Pashmina Collection",
    description: "Hand-finished cashmere heirlooms from the valleys of Kashmir. Each shawl represents months of dedicated craftsmanship.",
    heroImage: categoryPashmina,
    products: [
      { id: "1", name: "Kashmir Rose Pashmina", sku: "PS-001", materials: "100% Pashmina, Hand-embroidered", size: "large" },
      { id: "2", name: "Chinar Leaf Stole", sku: "PS-002", materials: "Pure Cashmere, Sozni Work", size: "medium" },
      { id: "3", name: "Mughal Garden Shawl", sku: "PS-003", materials: "Pashmina, Papier-mâché embroidery", size: "medium" },
      { id: "4", name: "Ivory Elegance Wrap", sku: "PS-004", materials: "100% Pashmina", size: "small" },
      { id: "5", name: "Royal Blue Jamawar", sku: "PS-005", materials: "Pashmina, Jamawar weave", size: "large" },
    ],
  },
  pashtush: {
    title: "Exclusive Pashtush",
    description: "Limited edition woven treasures. The finest Pashtush shawls, each a masterpiece of traditional weaving art.",
    heroImage: categoryPashtush,
    products: [
      { id: "1", name: "Royal Paisley Pashtush", sku: "PT-001", materials: "Pure Pashtush, Hand-woven", badge: "Limited Edition", size: "large" },
      { id: "2", name: "Forest Dream Shawl", sku: "PT-002", materials: "Pashtush, Kani weave", badge: "Limited Edition", size: "medium" },
      { id: "3", name: "Heritage Medallion", sku: "PT-003", materials: "Pure Pashtush, Antique design", badge: "Limited Edition", size: "large" },
      { id: "4", name: "Golden Hour Wrap", sku: "PT-004", materials: "Pashtush, Zari work", badge: "Limited Edition", size: "medium" },
    ],
  },
  antiques: {
    title: "Antiques & Collectibles",
    description: "Curated heritage pieces from across India. Each artifact tells a story of craftsmanship, culture, and timeless beauty.",
    heroImage: categoryAntiques,
    products: [
      { id: "1", name: "Antique Brass Lamp", sku: "AN-001", materials: "Brass, 19th Century", badge: "One-of-a-Kind", size: "medium" },
      { id: "2", name: "Rosewood Writing Desk", sku: "AN-002", materials: "Rosewood, Inlay work", badge: "One-of-a-Kind", size: "large" },
      { id: "3", name: "Copper Urli Bowl", sku: "AN-003", materials: "Copper, Traditional Kerala", badge: "One-of-a-Kind", size: "small" },
      { id: "4", name: "Temple Door Panel", sku: "AN-004", materials: "Teak, Hand-carved", badge: "One-of-a-Kind", size: "large" },
      { id: "5", name: "Bronze Deity Figure", sku: "AN-005", materials: "Bronze, Chola style", badge: "One-of-a-Kind", size: "medium" },
      { id: "6", name: "Vintage Jewelry Box", sku: "AN-006", materials: "Silver, Bone inlay", badge: "One-of-a-Kind", size: "small" },
    ],
  },
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; sku: string } | null>(null);

  const category = categoryData[slug || ""];

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-display text-foreground">Category not found</h1>
          <Link to="/" className="text-gold hover:underline mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </Layout>
    );
  }

  const handleEnquiry = (product: { name: string; sku: string }) => {
    setSelectedProduct(product);
    setEnquiryOpen(true);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={category.heroImage}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark via-maroon-dark/60 to-maroon-dark/20" />
        </div>
        
        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/40" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold/40" />
        
        <div className="relative container mx-auto px-4 pb-12">
          <span className="text-gold text-sm tracking-heritage uppercase font-body mb-4 inline-block">
            Our Collection
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground mb-4">
            {category.title}
          </h1>
          <p className="text-lg md:text-xl font-body text-primary-foreground/90 max-w-2xl">
            {category.description}
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-24 bg-background relative">
        <div className="absolute inset-0 bg-kolam opacity-30" />
        
        <div className="relative container mx-auto px-4">
          <OrnateDivider className="max-w-md mx-auto mb-16" />
          
          {/* Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {category.products.map((product) => (
              <div
                key={product.id}
                className={`group bg-card card-heritage overflow-hidden ornate-frame ${
                  product.size === "large" ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : ""
                }`}
              >
                {/* Image placeholder */}
                <div className="aspect-[4/5] bg-muted relative overflow-hidden img-zoom-container">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-body italic">
                    <span>Product Image</span>
                  </div>
                  <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/30 transition-all duration-700" />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4">
                      <span className={product.badge === "Limited Edition" ? "badge-limited" : "badge-exclusive"}>
                        {product.badge}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <p className="text-xs text-gold uppercase tracking-wider font-body mb-2">
                    {product.sku}
                  </p>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground font-body mb-4">
                    {product.materials}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm font-body text-gold italic">
                      Price on Request
                    </span>
                    <button
                      onClick={() => handleEnquiry(product)}
                      className="btn-heritage text-xs py-2 px-4"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* International shipping note */}
          <p className="text-center text-muted-foreground font-body italic mt-16">
            Ships internationally — contact for shipping & customs
          </p>
        </div>
      </section>

      <EnquiryModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        productName={selectedProduct?.name}
        productSku={selectedProduct?.sku}
      />
    </Layout>
  );
};

export default CategoryPage;
