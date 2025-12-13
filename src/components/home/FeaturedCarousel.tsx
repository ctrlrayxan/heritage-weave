import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OrnateDivider } from "@/components/ui/ornate-divider";
import { EnquiryModal } from "@/components/ui/enquiry-modal";
import productNecklace from "@/assets/product-necklace.jpg";
import productPashmina from "@/assets/product-pashmina.jpg";
import categoryPashtush from "@/assets/category-pashtush.jpg";
import categoryAntiques from "@/assets/category-antiques.jpg";

// Sample featured products
const featuredProducts = [
  {
    id: 1,
    name: "Maharani Temple Necklace",
    image: productNecklace,
    sku: "JN-001",
    category: "Jewellery",
    description: "22K gold temple jewelry with intricate deity motifs",
    badge: null,
  },
  {
    id: 2,
    name: "Kashmir Rose Pashmina",
    image: productPashmina,
    sku: "PS-012",
    category: "Pashminas",
    description: "Pure cashmere with hand-embroidered rose patterns",
    badge: null,
  },
  {
    id: 3,
    name: "Royal Paisley Pashtush",
    image: categoryPashtush,
    sku: "PT-003",
    category: "Pashtush",
    description: "Limited edition woven shawl with traditional paisley",
    badge: "Limited Edition",
  },
  {
    id: 4,
    name: "Antique Brass Lamp",
    image: categoryAntiques,
    sku: "AN-045",
    category: "Antiques",
    description: "19th century ceremonial lamp from Kerala temple",
    badge: "One-of-a-Kind",
  },
];

export function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof featuredProducts[0] | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const handleEnquiry = (product: typeof featuredProducts[0]) => {
    setSelectedProduct(product);
    setEnquiryOpen(true);
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
            ).slice(0, 3).map((product) => (
              <div
                key={product.id}
                className="group bg-background card-heritage p-6 ornate-frame"
              >
                {/* Product image */}
                <div className="aspect-square bg-muted mb-6 relative overflow-hidden img-zoom-container">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-4 border border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
                </div>

                {/* Badge */}
                {product.badge && (
                  <span className={`inline-block mb-3 ${product.badge === "Limited Edition" ? "badge-limited" : "badge-exclusive"}`}>
                    {product.badge}
                  </span>
                )}

                {/* Content */}
                <p className="text-xs text-gold uppercase tracking-wider font-body mb-1">
                  {product.category}
                </p>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-1">
                  SKU: {product.sku}
                </p>
                <p className="text-muted-foreground font-body mb-4">
                  {product.description}
                </p>

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
            ))}
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
      </div>

      <EnquiryModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        productName={selectedProduct?.name}
        productSku={selectedProduct?.sku}
      />
    </section>
  );
}
