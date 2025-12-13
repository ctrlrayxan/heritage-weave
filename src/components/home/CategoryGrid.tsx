import { Link } from "react-router-dom";
import { OrnateDivider } from "@/components/ui/ornate-divider";
import categoryJewellery from "@/assets/category-jewellery.jpg";
import categoryPashmina from "@/assets/category-pashmina.jpg";
import categoryPashtush from "@/assets/category-pashtush.jpg";
import categoryAntiques from "@/assets/category-antiques.jpg";

const categories = [
  {
    name: "Jewellery",
    description: "Temple traditions meet timeless elegance",
    image: categoryJewellery,
    href: "/category/jewellery",
    span: "large",
  },
  {
    name: "Pashminas",
    description: "Hand-finished cashmere heirlooms",
    image: categoryPashmina,
    href: "/category/pashminas",
    span: "small",
  },
  {
    name: "Exclusive Pashtush",
    description: "Limited edition woven treasures",
    image: categoryPashtush,
    href: "/category/pashtush",
    badge: "Limited Edition",
    span: "small",
  },
  {
    name: "Antiques",
    description: "Curated heritage collectibles",
    image: categoryAntiques,
    href: "/category/antiques",
    badge: "One-of-a-Kind",
    span: "large",
  },
];

export function CategoryGrid() {
  return (
    <section className="py-24 bg-background relative">
      {/* Subtle kolam pattern background */}
      <div className="absolute inset-0 bg-kolam opacity-50" />
      
      <div className="relative container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm tracking-heritage uppercase font-body">
            Our Collections
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-foreground mt-4 mb-6">
            Curated Heritage
          </h2>
          <OrnateDivider className="max-w-md mx-auto" />
        </div>

        {/* Category Grid - Asymmetric mosaic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className={`group relative overflow-hidden card-heritage bg-card ${
                category.span === "large" && index === 0
                  ? "lg:col-span-2 lg:row-span-2"
                  : category.span === "large"
                  ? "lg:col-span-2"
                  : ""
              }`}
            >
              {/* Image container with ornate frame */}
              <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 via-maroon-dark/40 to-transparent" />
                
                {/* Decorative border on hover */}
                <div className="absolute inset-4 border border-gold/0 group-hover:border-gold/40 transition-all duration-700" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                {/* Badge */}
                {category.badge && (
                  <span className="badge-limited mb-4 inline-block">
                    {category.badge}
                  </span>
                )}
                
                <h3 className="text-2xl lg:text-3xl font-display font-semibold text-primary-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-primary-foreground/80 font-body text-lg">
                  {category.description}
                </p>
                
                {/* View collection link */}
                <div className="mt-4 flex items-center gap-2 text-gold group-hover:gap-4 transition-all duration-300">
                  <span className="text-sm tracking-wider uppercase font-body">
                    View Collection
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
