import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { QuickFilters } from "@/components/home/quick-filters";
import { FeaturedSection } from "@/components/home/featured-section";
import { TrendingSection } from "@/components/home/trending-section";
import { RecentReviews } from "@/components/home/recent-reviews";
import { MissionSection } from "@/components/home/mission-section";
import { RestaurantCTA } from "@/components/home/restaurant-cta";
import BlogGrid from "@/components/home/BlogGrid";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <QuickFilters />
        <FeaturedSection />
        <TrendingSection />
        <RecentReviews />
        <MissionSection />
        <RestaurantCTA />
        <BlogGrid />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}
