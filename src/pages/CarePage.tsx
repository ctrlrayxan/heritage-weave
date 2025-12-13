import { Layout } from "@/components/layout/Layout";
import { OrnateDivider } from "@/components/ui/ornate-divider";

const CarePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 bg-maroon overflow-hidden">
        <div className="absolute inset-0 bg-kolam opacity-20" />
        
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-gold/40" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-gold/40" />
        
        <div className="relative container mx-auto px-4 text-center">
          <span className="text-gold text-sm tracking-heritage uppercase font-body mb-4 inline-block">
            Preservation Guide
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-primary-foreground">
            Care & Authenticity
          </h1>
        </div>
      </section>

      {/* Care Content */}
      <section className="py-20 lg:py-32 bg-background relative">
        <div className="absolute inset-0 bg-kolam opacity-30" />
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Pashmina Care */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-semibold text-foreground mb-6 text-center">
                Pashmina Care
              </h2>
              <OrnateDivider className="max-w-xs mx-auto mb-8" />
              
              <div className="bg-card p-8 lg:p-12 ornate-frame">
                <p className="text-lg font-body text-muted-foreground mb-6 italic">
                  Your Pashmina shawl is a precious heirloom that, with proper care, will last for generations.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Cleaning</h3>
                    <p className="text-muted-foreground font-body">
                      Dry clean only. We recommend specialized dry cleaners experienced with delicate 
                      cashmere and embroidered textiles. Avoid harsh chemicals and excessive heat.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Storage</h3>
                    <p className="text-muted-foreground font-body">
                      Store folded in breathable fabric such as muslin or cotton. Avoid plastic bags 
                      which can trap moisture. Keep away from direct sunlight to prevent fading. 
                      Use natural moth deterrents like lavender or cedar.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Refreshing</h3>
                    <p className="text-muted-foreground font-body">
                      Steam lightly to remove creases — never iron directly. If needed, use a 
                      pressing cloth between iron and shawl on the lowest heat setting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Pashtush Care */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-semibold text-foreground mb-6 text-center">
                Pashtush Care
              </h2>
              <OrnateDivider className="max-w-xs mx-auto mb-8" />
              
              <div className="bg-card p-8 lg:p-12 ornate-frame">
                <p className="text-lg font-body text-muted-foreground mb-6 italic">
                  Pashtush represents the pinnacle of woven artistry. These guidelines will help 
                  preserve its extraordinary craftsmanship.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Cleaning</h3>
                    <p className="text-muted-foreground font-body">
                      Hand-wash or dry clean recommended. If hand-washing, use lukewarm water with 
                      mild detergent. Gently squeeze — never wring or twist. Dry flat on a clean, 
                      dry towel away from direct heat or sunlight.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Embellishments</h3>
                    <p className="text-muted-foreground font-body">
                      Handle embroidered areas and embellishments with extra care. Avoid pulling 
                      or snagging on jewelry or rough surfaces. For pieces with extensive embroidery, 
                      professional dry cleaning is strongly recommended.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Long-term Preservation</h3>
                    <p className="text-muted-foreground font-body">
                      Allow the shawl to rest between wearings. Store with acid-free tissue paper 
                      to prevent creasing. Refold periodically to avoid permanent fold lines.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Antique Authenticity */}
            <div className="mb-20">
              <h2 className="text-3xl font-display font-semibold text-foreground mb-6 text-center">
                Antique Authenticity
              </h2>
              <OrnateDivider className="max-w-xs mx-auto mb-8" />
              
              <div className="bg-card p-8 lg:p-12 ornate-frame">
                <p className="text-lg font-body text-muted-foreground mb-6 italic">
                  Each antique in our collection is carefully authenticated and documented.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Provenance Documentation</h3>
                    <p className="text-muted-foreground font-body">
                      All antiques come with detailed provenance documentation including estimated age, 
                      origin region, material composition, and acquisition history. Certificates of 
                      authenticity are provided where applicable.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Condition Reports</h3>
                    <p className="text-muted-foreground font-body">
                      Each piece includes a comprehensive condition report detailing any restoration 
                      work, repairs, or age-related patina. We believe in complete transparency about 
                      the state of our antiques.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-3">Care Recommendations</h3>
                    <p className="text-muted-foreground font-body">
                      Antique items require specific care based on their materials and age. We provide 
                      individualized care instructions with each purchase. For metals, avoid harsh 
                      chemicals; for wood, maintain stable humidity; for textiles, store in 
                      climate-controlled environments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Restoration Services */}
            <div>
              <h2 className="text-3xl font-display font-semibold text-foreground mb-6 text-center">
                Repair & Restoration
              </h2>
              <OrnateDivider className="max-w-xs mx-auto mb-8" />
              
              <div className="bg-maroon/10 p-8 lg:p-12 border border-gold/20">
                <p className="text-lg font-body text-foreground text-center mb-6">
                  We offer professional repair and restoration services for items purchased 
                  from New Indian Emporium.
                </p>
                
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h3 className="font-display text-lg text-gold mb-2">Textile Repair</h3>
                    <p className="text-sm text-muted-foreground font-body">
                      Moth damage, fraying, embroidery restoration
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-gold mb-2">Jewelry Restoration</h3>
                    <p className="text-sm text-muted-foreground font-body">
                      Stone replacement, gold polishing, clasp repair
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-gold mb-2">Antique Conservation</h3>
                    <p className="text-sm text-muted-foreground font-body">
                      Professional cleaning, stabilization, preservation
                    </p>
                  </div>
                </div>
                
                <p className="text-center text-gold italic font-body mt-8">
                  Contact us for restoration consultations and quotes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CarePage;
