import { useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-main.jpg";
import { EnquiryModal } from "@/components/ui/enquiry-modal";

export function HeroSection() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxurious Indian jewelry and textiles collection"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-dark/90 via-maroon-dark/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/50 via-transparent to-maroon-dark/30" />
      </div>

      {/* Decorative frame corners */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-gold/50" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-gold/50" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-gold/50" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-gold/50" />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Decorative element */}
          <div className="flex items-center gap-4 mb-6 animate-fade-in">
            <div className="h-px w-12 bg-gold" />
            <span className="text-gold text-sm tracking-heritage uppercase font-body">
              Est. Jew Town, Kerala
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-semibold text-primary-foreground leading-tight mb-4 animate-fade-in">
            New Indian Emporium
          </h1>
          <p className="text-2xl md:text-3xl font-display italic text-gold-light mb-6 animate-fade-in">
            "Where Art Is Impression"
          </p>

          <p className="text-xl md:text-2xl font-body text-primary-foreground/90 leading-relaxed mb-4 animate-fade-in-delay">
            Handcrafted heritage jewellery, exquisite Pashminas, 
            and rare antiques from the heart of Kerala.
          </p>

          <p className="text-lg font-body text-gold italic mb-10 animate-fade-in-delay">
            Price on Request
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay">
            <Link
              to="/category/jewellery"
              className="btn-heritage text-center"
            >
              Explore Collection
            </Link>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="btn-gold-outline border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-maroon-dark"
            >
              Enquire Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <EnquiryModal open={enquiryOpen} onOpenChange={setEnquiryOpen} />
    </section>
  );
}
