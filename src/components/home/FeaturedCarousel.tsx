import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OrnateDivider } from "@/components/ui/ornate-divider";
import { EnquiryModal } from "@/components/ui/enquiry-modal";
import { supabase } from "@/integrations/supabase/client";

type FeaturedProduct = {
  id: string;
  title: string;
  sku: string;
  category: string;
  description: string | null;
  is_limited_edition: boolean | null;
  is_one_of_a_kind: boolean | null;
  hero_image?: string | null;
};

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<FeaturedProduct | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    const { data: productsData, error } = await supabase
      .from("products")
      .select("id, title, sku, category, description, is_limited_edition, is_one_of_a_kind")
      .eq("stock_status", "available")
      .order("created_at", { ascending: false })
      .limit(8);

    if (error) {
      console.error("Error fetching products:", error);
      setFeaturedProducts([]);
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
      setFeaturedProducts(productsWithImages);
    }
    setIsLoading(false);
  };

  const nextSlide = () => {
    if (featuredProducts.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
    }
  };

  const prevSlide = () => {
    if (featuredProducts.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    }
  };

  const handleEnquiry = (product: FeaturedProduct) => {
    setSelectedProduct(product);
    setEnquiryOpen(true);
  };

  const getBadge = (product: FeaturedProduct) => {
    if (product.is_limited_edition) return "Limited Edition";
    if (product.is_one_of_a_kind) return "One-of-a-Kind";
    return null;
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      jewellery: "Jewellery",
      pashmina: "Pashminas",
      pashtush: "Pashtush",
      antiques: "Antiques",
    };
    return labels[category] || category;
  };

  return (
    <section className="py-24 bg-ivory-dark relative">
      {/* Decorative texture */}
      <div className="absolute inset-0 bg-texture" />
      
      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-heritage uppercase font-body">
            Handpicked Selection
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mt-4 mb-6">
            Featured Treasures
          </h2>
          <OrnateDivider className="max-w-md mx-auto" />
        </div>

        {/* Carousel */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body">Loading...</p>
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 rounded-full bg-background border border-gold/30 flex items-center justify-center text-foreground hover:bg-gold hover:text-secondary-foreground transition-all duration-300 shadow-soft"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 rounded-full bg-background border border-gold/30 flex items-center justify-center text-foreground hover:bg-gold hover:text-secondary-foreground transition-all duration-300 shadow-soft"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.slice(currentIndex, currentIndex + 3).concat(
                featuredProducts.slice(0, Math.max(0, currentIndex + 3 - featuredProducts.length))
              ).slice(0, 3).map((product) => {
                const badge = getBadge(product);
                return (
                  <div
                    key={product.id}
                    className="group bg-background card-heritage p-6 ornate-frame"
                  >
                    {/* Product image */}
                    <div className="aspect-square bg-muted mb-6 relative overflow-hidden img-zoom-container">
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
                      <div className="absolute inset-4 border border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
                    </div>

                    {/* Badge */}
                    {badge && (
                      <span className={`inline-block mb-3 ${badge === "Limited Edition" ? "badge-limited" : "badge-exclusive"}`}>
                        {badge}
                      </span>
                    )}

                    {/* Content */}
                    <p className="text-xs text-gold uppercase tracking-wider font-body mb-1">
                      {getCategoryLabel(product.category)}
                    </p>
                    <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body mb-1">
                      SKU: {product.sku}
                    </p>
                    {product.description && (
                      <p className="text-muted-foreground font-body mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Price on request badge */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-body text-gold italic">
                        Price on Request
                      </span>
                      <button
                        onClick={() => handleEnquiry(product)}
                        className="text-sm font-body text-maroon hover:text-gold transition-colors underline underline-offset-4"
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {featuredProducts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-gold" : "bg-gold/30"
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground font-body text-lg italic">
              Featured products coming soon...
            </p>
          </div>
        )}
      </div>

      <EnquiryModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        productName={selectedProduct?.title}
        productSku={selectedProduct?.sku}
      />
    </section>
  );
}