import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { OrnateDivider } from "@/components/ui/ornate-divider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    contactMethod: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: `Thank you, ${formData.name}. We'll respond within 24 hours IST.`,
    });

    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      country: "",
      contactMethod: "",
      subject: "",
      message: "",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-maroon overflow-hidden">
        <div className="absolute inset-0 bg-kolam opacity-20" />
        
        {/* Decorative corners */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/40" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold/40" />
        
        <div className="relative container mx-auto px-4 text-center">
          <span className="text-gold text-sm tracking-heritage uppercase font-body mb-4 inline-block">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 lg:py-32 bg-background relative">
        <div className="absolute inset-0 bg-kolam opacity-30" />
        
        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-display font-semibold text-foreground mb-8">
                Visit Our Emporium
              </h2>
              
              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-1">Address</h3>
                    <p className="text-muted-foreground font-body">
                      VI/147, Opp. Ginger Restaurant,<br />
                      Jew Town, Mattancherry,<br />
                      Kochi - 682 002, Kerala, India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-1">Store Hours</h3>
                    <p className="text-muted-foreground font-body">
                      Open Daily<br />
                      10:00 AM - 8:00 PM IST
                    </p>
                    <p className="text-sm text-gold font-body mt-1">
                      Proprietor: Syed Afrose R
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-1">Email</h3>
                    <a href="mailto:syedafroser@rediffmail.com" className="text-gold hover:underline font-body">
                      syedafroser@rediffmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-foreground mb-1">Phone / WhatsApp</h3>
                    <a 
                      href="https://wa.me/919884187864" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gold hover:underline font-body"
                    >
                      +91 98841 87864
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Google Maps Embed */}
              <div className="ornate-frame overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.466!2d76.2595!3d9.9575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0873f1ebcb8a8d%3A0x4f5c8f5f5f5f5f5f!2sJew%20Town%2C%20Mattancherry%2C%20Kochi%2C%20Kerala%20682002!5e0!3m2!1sen!2sin!4v1702500000000!5m2!1sen!2sin"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="New Indian Emporium Location - Jew Town, Mattancherry, Kochi"
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-display font-semibold text-foreground mb-8">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 ornate-frame">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-body text-foreground mb-2">
                      Your Name *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your name"
                      className="border-border focus:border-gold focus:ring-gold/30"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-body text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="border-border focus:border-gold focus:ring-gold/30"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
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
                  
                  <div>
                    <label className="block text-sm font-body text-foreground mb-2">
                      Preferred Contact
                    </label>
                    <Select
                      value={formData.contactMethod}
                      onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                    >
                      <SelectTrigger className="border-border focus:border-gold">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-body text-foreground mb-2">
                    Subject *
                  </label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is your enquiry about?"
                    className="border-border focus:border-gold focus:ring-gold/30"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-body text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us more about what you're looking for..."
                    rows={5}
                    className="border-border focus:border-gold focus:ring-gold/30"
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-heritage"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                
                <p className="text-xs text-center text-muted-foreground font-body">
                  We typically respond within 24 hours IST
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
