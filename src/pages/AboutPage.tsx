import { Layout } from "@/components/layout/Layout";
import { OrnateDivider } from "@/components/ui/ornate-divider";
import heroImage from "@/assets/hero-main.jpg";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="New Indian Emporium heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-maroon-dark/80" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <span className="text-gold text-sm tracking-heritage uppercase font-body mb-4 inline-block">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground">
            About New Indian Emporium
          </h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-32 bg-background relative">
        <div className="absolute inset-0 bg-kolam opacity-30" />
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <OrnateDivider className="mb-16" />
            
            <div className="prose prose-lg max-w-none font-body text-foreground">
              <h2 className="text-3xl font-display font-semibold text-foreground mb-8 text-center">
                A Legacy of Craftsmanship
              </h2>
              
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                Nestled in the historic Jew Town of Kerala, New Indian Emporium stands as a testament 
                to India's rich artisanal heritage. For generations, our family has curated the finest 
                expressions of traditional craftsmanship — from the intricate temple jewellery of 
                South India to the legendary Pashmina shawls of Kashmir.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-card p-8 ornate-frame">
                  <h3 className="text-xl font-display text-foreground mb-4">Our Heritage</h3>
                  <p className="text-muted-foreground">
                    Located in Kerala's historic spice trading quarter, we've been privileged 
                    to work with master artisans whose families have perfected their crafts 
                    over centuries. Each piece in our collection carries this legacy forward.
                  </p>
                </div>
                <div className="bg-card p-8 ornate-frame">
                  <h3 className="text-xl font-display text-foreground mb-4">Our Promise</h3>
                  <p className="text-muted-foreground">
                    We believe in fair artisan partnerships, authentic craftsmanship, and 
                    transparent provenance. Every item comes with documentation of its origin, 
                    materials, and the story of its creation.
                  </p>
                </div>
              </div>
              
              <h2 className="text-3xl font-display font-semibold text-foreground mb-8 text-center mt-16">
                The Artisans Behind Our Collections
              </h2>
              
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                Our Pashmina and Pashtush shawls come from family workshops in the Kashmir Valley, 
                where artisans spend months — sometimes years — perfecting a single piece. Our 
                temple jewellery is crafted by master goldsmiths in Kerala and Tamil Nadu, using 
                techniques passed down through generations.
              </p>
              
              <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                Our antiques are carefully sourced and authenticated, each piece telling a unique 
                story of India's cultural heritage. From ceremonial brass lamps to hand-carved 
                temple panels, every artifact has been selected for its historical significance 
                and artistic merit.
              </p>
            </div>
            
            <OrnateDivider className="my-16" />
            
            {/* Visit Info */}
            <div className="text-center">
              <h2 className="text-2xl font-display font-semibold text-foreground mb-6">
                Visit Our Emporium
              </h2>
              <div className="bg-card p-8 ornate-frame inline-block">
                <p className="text-lg font-body text-muted-foreground mb-2">
                  <strong className="text-foreground">Address:</strong> Jew Town, God's Own Country, Kerala
                </p>
                <p className="text-lg font-body text-muted-foreground mb-4">
                  <strong className="text-foreground">Hours:</strong> Monday - Saturday, 10:00 AM - 6:00 PM IST
                </p>
                <p className="text-gold italic font-body">
                  Appointments recommended for personalized viewing
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
