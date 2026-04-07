import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import CarsSection from "@/components/CarsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CarsSection />
      <TestimonialsSection />
      <MapSection />
      <Footer />
    </div>
  );
};

export default Index;
