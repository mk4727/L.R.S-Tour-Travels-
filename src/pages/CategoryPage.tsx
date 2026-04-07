import { useParams, Link } from "react-router-dom";
import { CarCategory } from "@/data/cars";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Car, Crown, Bus, Plane, ArrowLeft } from "lucide-react";
import { useCars } from "@/hooks/useSupabaseData";

const categoryMeta: Record<CarCategory, { label: string; icon: typeof Car; description: string; image: string }> = {
  rental: { label: "Rental Cars", icon: Car, description: "Affordable daily rental cars for city travel and short trips", image: "https://lh3.googleusercontent.com/d/1wmM7bew4I76Qrk2sDL5q2-tEy0Z6ofCo" },
  luxury: { label: "Luxury Cars", icon: Crown, description: "Premium luxury vehicles for special occasions and executive travel", image: "https://lh3.googleusercontent.com/d/1_RhudVUgq2Kpxmu09LWX6vVnQ2NENR_u" },
  tempo: { label: "Tempo Travellers", icon: Bus, description: "Spacious vehicles perfect for group travel and family trips", image: "https://lh3.googleusercontent.com/d/1n7Kfjc5JK_AWaLID96pI-G8b-X4K1T6C" },
  airport: { label: "Airport & Railway Transfers", icon: Plane, description: "Quick and reliable transfers to airports and railway stations", image: "https://lh3.googleusercontent.com/d/1JAJ8VTwGfQlhT3VLzfChBjXxNAVTo4FQ" },
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const cat = category as CarCategory;
  const meta = categoryMeta[cat];
  const { cars } = useCars();

  const filteredCars = cars.filter((car: any) => {
    if (car.categories && Array.isArray(car.categories)) {
      return car.categories.includes(cat);
    }
    return false;
  });

  if (!meta) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-display font-bold text-foreground">Category not found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const Icon = meta.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img src={meta.image} alt={meta.label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto pb-8">
          <Link to="/#cars" className="inline-flex items-center gap-2 text-sm text-primary mb-4 hover:underline">
            <ArrowLeft className="h-4 w-4" /> Back to all categories
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{meta.label}</h1>
              <p className="text-muted-foreground">{meta.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        {filteredCars.length > 0 ? (
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
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;
