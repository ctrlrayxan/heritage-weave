import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Search,
  Package
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Product = {
  id: string;
  title: string;
  sku: string;
  category: string;
  is_limited_edition: boolean;
  is_one_of_a_kind: boolean;
  stock_status: string;
  created_at: string;
};

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    checkAuth();
    fetchProducts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading products", variant: "destructive" });
    } else {
      setProducts(data || []);
    }
    setIsLoading(false);
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast({ title: "Error deleting product", variant: "destructive" });
    } else {
      toast({ title: "Product deleted" });
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-gold/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-display text-foreground">Products</h1>
              <p className="text-sm text-muted-foreground">{products.length} total products</p>
            </div>
          </div>
          <Link to="/admin/products/new">
            <Button className="btn-heritage">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-border"
          />
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No products found</p>
            <Link to="/admin/products/new">
              <Button className="mt-4 btn-heritage">Add Your First Product</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-card border border-gold/20 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-body text-foreground">Product</th>
                  <th className="text-left px-4 py-3 text-sm font-body text-foreground">SKU</th>
                  <th className="text-left px-4 py-3 text-sm font-body text-foreground">Category</th>
                  <th className="text-left px-4 py-3 text-sm font-body text-foreground">Badges</th>
                  <th className="text-left px-4 py-3 text-sm font-body text-foreground">Status</th>
                  <th className="text-right px-4 py-3 text-sm font-body text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <span className="font-body text-foreground">{product.title}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground font-mono text-sm">
                      {product.sku}
                    </td>
                    <td className="px-4 py-3">
                      <span className="capitalize text-muted-foreground">{product.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {product.is_limited_edition && (
                          <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded">Limited</span>
                        )}
                        {product.is_one_of_a_kind && (
                          <span className="text-xs bg-maroon/20 text-maroon px-2 py-0.5 rounded">One-of-a-Kind</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        product.stock_status === "available" 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {product.stock_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/products/${product.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
