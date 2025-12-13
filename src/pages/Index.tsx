import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { AddressSnippet } from "@/components/home/AddressSnippet";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoryGrid />
      <FeaturedCarousel />
      <AddressSnippet />
    </Layout>
  );
};

export default Index;
