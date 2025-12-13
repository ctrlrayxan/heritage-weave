import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  MessageSquare, 
  LogOut, 
  Plus,
  Home,
  Eye
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    products: 0,
    enquiries: 0,
    newEnquiries: 0,
  });

  useEffect(() => {
    checkAuth();
    fetchStats();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate("/admin/login");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin")
      .maybeSingle();

    if (!roleData) {
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
    
    setIsLoading(false);
  };

  const fetchStats = async () => {
    const [productsRes, enquiriesRes, newEnquiriesRes] = await Promise.all([
      supabase.from("products").select("id", { count: "exact", head: true }),
      supabase.from("enquiries").select("id", { count: "exact", head: true }),
      supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    ]);

    setStats({
      products: productsRes.count || 0,
      enquiries: enquiriesRes.count || 0,
      newEnquiries: newEnquiriesRes.count || 0,
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out successfully" });
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-gold/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-display text-foreground">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">New Indian Emporium</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-muted-foreground hover:text-foreground">
              <Home className="w-5 h-5" />
            </a>
            <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card border border-gold/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Products</p>
                <p className="text-3xl font-display text-foreground mt-1">{stats.products}</p>
              </div>
              <Package className="w-10 h-10 text-gold/50" />
            </div>
          </div>

          <div className="bg-card border border-gold/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Enquiries</p>
                <p className="text-3xl font-display text-foreground mt-1">{stats.enquiries}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-gold/50" />
            </div>
          </div>

          <div className="bg-card border border-gold/20 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">New Enquiries</p>
                <p className="text-3xl font-display text-foreground mt-1">{stats.newEnquiries}</p>
              </div>
              <MessageSquare className="w-10 h-10 text-maroon/50" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/admin/products"
            className="bg-card border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors">
                  Manage Products
                </h3>
                <p className="text-sm text-muted-foreground">Add, edit, or remove products</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/enquiries"
            className="bg-card border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-maroon/10 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-maroon" />
              </div>
              <div>
                <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors">
                  View Enquiries
                </h3>
                <p className="text-sm text-muted-foreground">
                  {stats.newEnquiries > 0 ? `${stats.newEnquiries} new enquiries` : "No new enquiries"}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Add */}
        <div className="mt-8">
          <Link to="/admin/products/new">
            <Button className="btn-heritage">
              <Plus className="w-4 h-4 mr-2" />
              Add New Product
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
