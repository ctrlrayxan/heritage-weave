import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { OrnateDivider } from "@/components/ui/ornate-divider";
import { EnquiryModal } from "@/components/ui/enquiry-modal";
import { supabase } from "@/integrations/supabase/client";
import categoryJewellery from "@/assets/category-jewellery.jpg";
import categoryPashmina from "@/assets/category-pashmina.jpg";
import categoryPashtush from "@/assets/category-pashtush.jpg";
import categoryAntiques from "@/assets/category-antiques.jpg";

const categoryInfo: Record<string, {
  title: string;
  description: string;
  heroImage: string;
  dbCategory: string;
}> = {
  jewellery: {
    title: "Jewellery Collection",
    description: "Temple traditions meet timeless elegance. Each piece is handcrafted with centuries-old techniques, carrying the soul of Kerala's artisan heritage.",
    heroImage: categoryJewellery,
    dbCategory: "jewellery",
  },
  pashminas: {
    title: "Pashmina Collection",
    description: "Hand-finished cashmere heirlooms from the valleys of Kashmir. Each shawl represents months of dedicated craftsmanship.",
    heroImage: categoryPashmina,
    dbCategory: "pashmina",
  },
  pashtush: {
    title: "Exclusive Pashtush",
    description: "Limited edition woven treasures. The finest Pashtush shawls, each a masterpiece of traditional weaving art.",
    heroImage: categoryPashtush,
    dbCategory: "pashtush",
  },
  antiques: {
    title: "Antiques & Collectibles",
    description: "Curated heritage pieces from across India. Each artifact tells a story of craftsmanship, culture, and timeless beauty.",
    heroImage: categoryAntiques,
    dbCategory: "antiques",
  },
};

type Product = {
  id: string;
  title: string;
  sku: string;
  materials: string | null;
  is_limited_edition: boolean | null;
  is_one_of_a_kind: boolean | null;
  hero_image?: string | null;
};

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ name: string; sku: string } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const category = categoryInfo[slug || ""];

  useEffect(() => {
    if (category) {
      fetchProducts();
    }
  }, [slug, category]);

  const fetchProducts = async () => {
    setIsLoading(true);
    
    const dbCategory = category.dbCategory as "jewellery" | "pashmina" | "pashtush" | "antiques";
    
    const { data: productsData, error } = await supabase
      .from("products")
      .select("id, title, sku, materials, is_limited_edition, is_one_of_a_kind")
      .eq("category", dbCategory)
      .eq("stock_status", "available")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } else {
      // Fetch hero images for each product
      const productsWithImages = await Promise.all(
        (productsData || []).map(async (product) => {
          const { data: imageData } = await supabase
            .from("product_images")
            .select("image_url")
            .eq("product_id", product.id)
            .eq("is_hero", true)
            .maybeSingle();
          
          return {
            ...product,
            hero_image: imageData?.image_url || null,
          };
        })
      );
      setProducts(productsWithImages);
    }
    setIsLoading(false);
  };

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

  const getBadge = (product: Product) => {
    if (product.is_limited_edition) return "Limited Edition";
    if (product.is_one_of_a_kind) return "One-of-a-Kind";
    return null;
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
          
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground font-body text-lg italic">
                Products coming soon...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product) => {
                const badge = getBadge(product);
                return (
                  <div
                    key={product.id}
                    className="group bg-card card-heritage overflow-hidden ornate-frame"
                  >
                    {/* Image */}
                    <div className="aspect-[4/5] bg-muted relative overflow-hidden img-zoom-container">
                      {product.hero_image ? (
                        <img 
                          src={product.hero_image} 
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-body italic">
                          <span>Product Image</span>
                        </div>
                      )}
                      <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/30 transition-all duration-700" />
                      
                      {/* Badge */}
                      {badge && (
                        <div className="absolute top-4 left-4">
                          <span className={badge === "Limited Edition" ? "badge-limited" : "badge-exclusive"}>
                            {badge}
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
                        {product.title}
                      </h3>
                      {product.materials && (
                        <p className="text-sm text-muted-foreground font-body mb-4">
                          {product.materials}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm font-body text-gold italic">
                          Price on Request
                        </span>
                        <button
                          onClick={() => handleEnquiry({ name: product.title, sku: product.sku })}
                          className="btn-heritage text-xs py-2 px-4"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
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