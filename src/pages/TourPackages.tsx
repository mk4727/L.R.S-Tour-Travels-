import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tours as defaultTours, Tour } from "@/data/tours";
import { MapPin, Clock, IndianRupee, Compass, Palette, Bike } from "lucide-react";

type Category = "destination" | "theme" | "activity";

const categories: { key: Category; label: string; icon: typeof MapPin; description: string }[] = [
  { key: "destination", label: "Tour by Destination", icon: MapPin, description: "Explore India's most iconic cities and landmarks" },
  { key: "theme", label: "Tour by Theme", icon: Palette, description: "Curated tours around spiritual, heritage, romantic & wildlife themes" },
  { key: "activity", label: "Tour by Activity", icon: Bike, description: "Adventure sports, trekking, rafting, biking and more" },
];

const getStoredTours = (): Tour[] => {
  const stored = localStorage.getItem("rideswift_tours");
  if (stored) return JSON.parse(stored);
  return defaultTours;
};

const TourPackages = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("destination");
  const allTours = getStoredTours();
  const filteredTours = allTours.filter((t) => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-28 pb-16">
        <div className="text-center space-y-3 mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center justify-center gap-2">
            <Compass className="h-4 w-4" /> Tour Packages
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Explore Our <span className="text-gradient">Tour Packages</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Discover handpicked tour packages across India. Choose by destination, theme, or activity.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all border ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground border-primary glow-amber"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-center text-muted-foreground mb-8">
          {categories.find((c) => c.key === activeCategory)?.description}
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative h-48 overflow-hidden">
                <img src={tour.image} alt={tour.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  {tour.tag}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-display font-semibold text-foreground">{tour.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {tour.destination}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-2">{tour.description}</p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> {tour.duration}
                  </div>
                  <div className="flex items-center gap-0.5 text-primary font-bold">
                    <IndianRupee className="h-4 w-4" />
                    {tour.price.toLocaleString("en-IN")}
                  </div>
                </div>
                <Link
                  to={`/book-tour?tour=${tour.id}`}
                  className="block w-full text-center py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all mt-2"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TourPackages;
