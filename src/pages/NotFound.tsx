import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-background relative">
        <div className="absolute inset-0 bg-kolam opacity-30" />
        
        <div className="relative text-center px-4">
          <span className="text-gold text-8xl font-display mb-4 block">404</span>
          <h1 className="text-3xl font-display text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground font-body mb-8 max-w-md mx-auto">
            The treasure you seek has not been discovered. Perhaps it awaits in our collection.
          </p>
          <Link to="/" className="btn-heritage inline-block">
            Return to Emporium
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
