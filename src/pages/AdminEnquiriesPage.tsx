import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  MessageSquare,
  Mail,
  Phone,
  Globe,
  Calendar
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Enquiry = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  country: string | null;
  preferred_contact: string | null;
  message: string | null;
  budget_range: string | null;
  product_title: string | null;
  status: string;
  created_at: string;
};

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    const { data, error } = await supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error loading enquiries", variant: "destructive" });
    } else {
      setEnquiries(data || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("enquiries")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({ title: "Error updating status", variant: "destructive" });
    } else {
      toast({ title: "Status updated" });
      fetchEnquiries();
    }
  };

  const filteredEnquiries = enquiries.filter((e) => 
    filter === "all" ? true : e.status === filter
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-gold/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-display text-foreground">Enquiries</h1>
              <p className="text-sm text-muted-foreground">{enquiries.length} total enquiries</p>
            </div>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">Loading...</div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No enquiries found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEnquiries.map((enquiry) => (
              <div 
                key={enquiry.id} 
                className={`bg-card border rounded-lg p-6 ${
                  enquiry.status === "new" ? "border-gold/40" : "border-gold/20"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-display text-lg text-foreground">{enquiry.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        enquiry.status === "new" 
                          ? "bg-gold/20 text-gold" 
                          : enquiry.status === "contacted"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {enquiry.status}
                      </span>
                    </div>

                    {enquiry.product_title && (
                      <p className="text-sm text-gold mb-2">
                        Product: {enquiry.product_title}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                      {enquiry.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" /> {enquiry.email}
                        </span>
                      )}
                      {enquiry.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {enquiry.phone}
                        </span>
                      )}
                      {enquiry.country && (
                        <span className="flex items-center gap-1">
                          <Globe className="w-3 h-3" /> {enquiry.country}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {formatDate(enquiry.created_at)}
                      </span>
                    </div>

                    {enquiry.message && (
                      <p className="text-foreground font-body bg-muted/30 p-3 rounded">
                        {enquiry.message}
                      </p>
                    )}

                    {enquiry.budget_range && (
                      <p className="text-sm text-muted-foreground mt-2">
                        Budget: <span className="text-foreground">{enquiry.budget_range}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <Select 
                      value={enquiry.status} 
                      onValueChange={(value) => updateStatus(enquiry.id, value)}
                    >
                      <SelectTrigger className="w-28">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
