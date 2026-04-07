import { useState } from "react";
import { Link } from "react-router-dom";
import { CarCategory } from "@/data/cars";
import CarCard from "./CarCard";
import { Car, Crown, Bus, Plane } from "lucide-react";
import { useCars } from "@/hooks/useSupabaseData";

const categoryConfig: { key: CarCategory; label: string; icon: typeof Car; description: string; image: string; gradient: string }[] = [
  { key: "rental", label: "Rental Cars", icon: Car, description: "Affordable daily rental cars for city travel", image: "https://lh3.googleusercontent.com/d/1wmM7bew4I76Qrk2sDL5q2-tEy0Z6ofCo", gradient: "from-primary/30 to-primary/5" },
  { key: "luxury", label: "Luxury Cars", icon: Crown, description: "Premium luxury vehicles for special occasions", image: "https://lh3.googleusercontent.com/d/1_RhudVUgq2Kpxmu09LWX6vVnQ2NENR_u", gradient: "from-primary/5 via-primary/5 to-transparent" },
  { key: "tempo", label: "Tempo Travellers", icon: Bus, description: "Spacious vehicles for group & family trips", image: "https://lh3.googleusercontent.com/d/1n7Kfjc5JK_AWaLID96pI-G8b-X4K1T6C", gradient: "from-primary/5 via-primary/5 to-transparent" },
  { key: "airport", label: "Airport & Railway", icon: Plane, description: "Quick transfers to airports & railway stations", image: "https://lh3.googleusercontent.com/d/1JAJ8VTwGfQlhT3VLzfChBjXxNAVTo4FQ", gradient: "from-primary/5 via-primary/5 to-transparent" },
];

const CarsSection = () => {
  const { cars } = useCars();
  const [activeCategory, setActiveCategory] = useState<CarCategory>("rental");

  const filteredCars = cars.filter((car: any) => {
    if (car.categories && Array.isArray(car.categories)) {
      return car.categories.includes(activeCategory);
    }
    return false;
  });

  return (
    <section id="cars" className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-14 space-y-3">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Fleet</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Available <span className="text-gradient">Cars</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choose from our wide range of well-maintained vehicles for every occasion.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {categoryConfig.map((cat) => (
            <Link
              key={cat.key}
              to={`/category/${cat.key}`}
              onClick={(e) => {
                if (activeCategory !== cat.key) {
                  e.preventDefault();
                  setActiveCategory(cat.key);
                }
              }}
              className={`relative rounded-xl border-2 transition-all text-left group overflow-hidden ${
                activeCategory === cat.key
                  ? "border-primary shadow-lg shadow-primary/20 ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-md"
              }`}
            >
              <div className="h-32 sm:h-40 overflow-hidden">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient} to-transparent`} />
              </div>
              <div className="p-4 relative">
                <div className="flex items-center gap-2 mb-1">
                  <cat.icon className={`h-5 w-5 transition-colors ${activeCategory === cat.key ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
                  <h3 className="font-display font-semibold text-sm md:text-base text-foreground">{cat.label}</h3>
                </div>
                <p className="text-xs text-muted-foreground hidden sm:block">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* {filteredCars.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car: any) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No cars available in this category yet.</p>
            <p className="text-sm mt-2">Check back soon or explore other categories.</p>
          </div>
        )}

        <div className="text-center mt-8">
          <Link to={`/category/${activeCategory}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:underline">
            View all {categoryConfig.find(c => c.key === activeCategory)?.label} →
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default CarsSection;
