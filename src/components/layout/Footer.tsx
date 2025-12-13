import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";
import { OrnateDivider } from "../ui/ornate-divider";

export function Footer() {
  return (
    <footer className="bg-maroon-dark text-primary-foreground relative overflow-hidden">
      {/* Decorative kolam pattern overlay */}
      <div className="absolute inset-0 bg-kolam opacity-30" />
      
      <div className="relative">
        {/* Top decorative border */}
        <div className="h-1 bg-gradient-gold" />
        
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-display font-semibold mb-2">
                New Indian Emporium
              </h3>
              <p className="text-gold text-sm tracking-heritage uppercase mb-6">
                Heirlooms Reborn. Handcrafted. Hidden Prices.
              </p>
              <p className="text-primary-foreground/80 font-body text-lg leading-relaxed max-w-md">
                Curating the finest heritage jewellery, hand-finished Pashminas, 
                exclusive Pashtush shawls, and timeless antiques from the heart of Kerala.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-display mb-6 text-gold">Explore</h4>
              <ul className="space-y-3 font-body">
                <li>
                  <Link to="/category/jewellery" className="text-primary-foreground/80 hover:text-gold transition-colors">
                    Jewellery Collection
                  </Link>
                </li>
                <li>
                  <Link to="/category/pashminas" className="text-primary-foreground/80 hover:text-gold transition-colors">
                    Pashmina Shawls
                  </Link>
                </li>
                <li>
                  <Link to="/category/pashtush" className="text-primary-foreground/80 hover:text-gold transition-colors">
                    Exclusive Pashtush
                  </Link>
                </li>
                <li>
                  <Link to="/category/antiques" className="text-primary-foreground/80 hover:text-gold transition-colors">
                    Antiques & Collectibles
                  </Link>
                </li>
                <li>
                  <Link to="/care" className="text-primary-foreground/80 hover:text-gold transition-colors">
                    Care & Authenticity
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-display mb-6 text-gold">Visit Us</h4>
              <ul className="space-y-4 font-body">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                  <span className="text-primary-foreground/80">
                    Jew Town,<br />
                    God's Own Country,<br />
                    Kerala, India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  <a href="mailto:enquiry@newindianemporium.com" className="text-primary-foreground/80 hover:text-gold transition-colors">
                    enquiry@newindianemporium.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  <span className="text-primary-foreground/80">
                    Contact via WhatsApp
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <OrnateDivider className="my-12 opacity-30" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-primary-foreground/60 font-body">
              © {new Date().getFullYear()} New Indian Emporium. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 font-body italic">
              Ships internationally — contact for shipping & customs
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
