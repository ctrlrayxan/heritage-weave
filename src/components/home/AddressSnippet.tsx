import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function AddressSnippet() {
  return (
    <section className="py-20 bg-maroon relative overflow-hidden">
      {/* Kolam pattern overlay */}
      <div className="absolute inset-0 bg-kolam opacity-20" />
      
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-gold/30" />
      <div className="absolute top-4 right-4 w-16 h-16 border-t border-r border-gold/30" />
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b border-l border-gold/30" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-gold/30" />
      
      <div className="relative container mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/10 border border-gold/30 mb-6">
          <MapPin className="w-8 h-8 text-gold" />
        </div>
        
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary-foreground mb-4">
          Visit Our Emporium
        </h2>
        
        <p className="text-xl font-body text-primary-foreground/90 mb-2">
          Jew Town, God's Own Country
        </p>
        <p className="text-lg font-body text-gold italic mb-8">
          Kerala, India
        </p>
        
        <Link
          to="/contact"
          className="btn-gold-outline border-gold text-primary-foreground hover:bg-gold hover:text-secondary-foreground"
        >
          Get Directions
        </Link>
      </div>
    </section>
  );
}
