import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Users, Fuel, Wind, IndianRupee, CheckCircle } from "lucide-react";
import { useCars } from "@/hooks/useSupabaseData";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, loading } = useCars();
  const car = cars.find((c) => c.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-display font-bold text-foreground">Car not found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-28 pb-16">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="rounded-xl overflow-hidden border border-border">
            <img src={car.image} alt={car.name} className="w-full h-[400px] object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-sm text-primary font-semibold uppercase tracking-wider">{car.type}</span>
              <h1 className="text-4xl font-display font-bold text-foreground mt-1">{car.name}</h1>
            </div>

            <div className="flex items-center gap-2 text-3xl font-bold text-primary">
              
              
              <span className="text-base text-muted-foreground font-normal"></span>
            </div>

            <p className="text-muted-foreground leading-relaxed">{car.description}</p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Seating", value: `${car.seats} passengers` },
                { icon: Fuel, label: "Fuel", value: car.fuelType },
                { icon: Wind, label: "AC", value: car.ac ? "Available" : "Not available" },
                { icon: CheckCircle, label: "Status", value: car.available ? "Available" : "Booked" },
              ].map((spec) => (
                <div key={spec.label} className="p-4 rounded-lg bg-secondary/50 border border-border">
                  <spec.icon className="h-5 w-5 text-primary mb-2" />
                  <div className="text-xs text-muted-foreground">{spec.label}</div>
                  <div className="text-sm font-semibold text-foreground">{spec.value}</div>
                </div>
              ))}
            </div>

            {car.available ? (
              <Link to={`/book?car=${car.id}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-amber">
                Book This Car
              </Link>
            ) : (
              <div className="px-8 py-4 rounded-lg bg-muted text-muted-foreground font-semibold inline-block">
                Currently Unavailable
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarDetails;
