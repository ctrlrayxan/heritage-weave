import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface EnquiryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
  productSku?: string;
}

export function EnquiryModal({ open, onOpenChange, productName, productSku }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    contactMethod: "",
    contactDetail: "",
    message: "",
    budgetRange: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Thank you for your enquiry!",
      description: `Thanks, ${formData.name}. We received your enquiry${productName ? ` for ${productName}` : ""}. Expect a reply within 24 hours IST.`,
    });

    setIsSubmitting(false);
    onOpenChange(false);
    setFormData({
      name: "",
      country: "",
      contactMethod: "",
      contactDetail: "",
      message: "",
      budgetRange: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background border border-gold/30 shadow-elevated">
        <DialogHeader className="text-center pb-4 border-b border-gold/20">
          <DialogTitle className="text-2xl font-display text-foreground">
            Request Price
          </DialogTitle>
          {productName && (
            <p className="text-muted-foreground font-body mt-2">
              Enquiring about: <span className="text-gold">{productName}</span>
              {productSku && <span className="text-sm ml-2">({productSku})</span>}
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 pt-4">
          <div>
            <label className="block text-sm font-body text-foreground mb-2">
              Your Name *
            </label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter your full name"
              className="border-border focus:border-gold focus:ring-gold/30"
            />
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-2">
              Country *
            </label>
            <Input
              required
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="Your country"
              className="border-border focus:border-gold focus:ring-gold/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-body text-foreground mb-2">
                Preferred Contact *
              </label>
              <Select
                value={formData.contactMethod}
                onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
              >
                <SelectTrigger className="border-border focus:border-gold">
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="phone">Phone</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-body text-foreground mb-2">
                Contact Detail *
              </label>
              <Input
                required
                value={formData.contactDetail}
                onChange={(e) => setFormData({ ...formData, contactDetail: e.target.value })}
                placeholder="Number or email"
                className="border-border focus:border-gold focus:ring-gold/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-2">
              Message
            </label>
            <Textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us more about what you're looking for..."
              rows={3}
              className="border-border focus:border-gold focus:ring-gold/30"
            />
          </div>

          <div>
            <label className="block text-sm font-body text-foreground mb-2">
              Budget Range (Optional)
            </label>
            <Select
              value={formData.budgetRange}
              onValueChange={(value) => setFormData({ ...formData, budgetRange: value })}
            >
              <SelectTrigger className="border-border focus:border-gold">
                <SelectValue placeholder="Select range (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="under-500">Under $500</SelectItem>
                <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                <SelectItem value="above-10000">Above $10,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-heritage"
          >
            {isSubmitting ? "Sending..." : "Submit Enquiry"}
          </Button>

          <p className="text-xs text-center text-muted-foreground font-body">
            We typically respond within 24 hours IST
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
