import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Jewellery", href: "/category/jewellery" },
  { name: "Pashminas", href: "/category/pashminas" },
  { name: "Pashtush", href: "/category/pashtush" },
  { name: "Antiques", href: "/category/antiques" },
  { name: "About", href: "/about" },
  { name: "Care", href: "/care" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gold/20">
      {/* Top decorative bar */}
      <div className="h-1 bg-gradient-gold" />
      
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-4 lg:py-6">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            <span className="text-2xl lg:text-3xl font-display font-semibold text-foreground tracking-wide">
              New Indian Emporium
            </span>
            <span className="text-xs tracking-heritage text-gold uppercase mt-1">
              Est. Kerala
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "relative text-sm font-body tracking-wider uppercase transition-colors duration-300",
                  "hover:text-gold",
                  "after:absolute after:bottom-0 after:left-0 after:w-full after:h-px",
                  "after:bg-gold after:scale-x-0 after:origin-right after:transition-transform after:duration-300",
                  "hover:after:scale-x-100 hover:after:origin-left",
                  location.pathname === item.href 
                    ? "text-gold after:scale-x-100" 
                    : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-t border-gold/20">
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block text-base font-body tracking-wider uppercase py-2 transition-colors",
                  location.pathname === item.href 
                    ? "text-gold" 
                    : "text-foreground/80 hover:text-gold"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
