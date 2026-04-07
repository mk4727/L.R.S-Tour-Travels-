import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Star, Wifi, Wind, UtensilsCrossed, Car, IndianRupee } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Hotel {
  id: string;
  name: string;
  city: string;
  image: string;
  price_per_night: number;
  rating: number;
  amenities: string[];
  description: string;
  contact_phone: string;
  available: boolean;
}

const CITIES = ["All", "Agra", "Mathura", "Jaipur", "Haridwar", "Mussoorie", "Jaisalmer", "Varanasi", "Udaipur", "Delhi"];

const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi, AC: Wind, Restaurant: UtensilsCrossed, Parking: Car,
};

const HotelCard = ({ hotel }: { hotel: Hotel }) => (
  <Link to={`/hotel/${hotel.id}`} className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5 block">
    <div className="relative h-52 overflow-hidden">
      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-background/80 backdrop-blur text-sm font-semibold text-primary">
        <Star className="h-3.5 w-3.5 fill-primary" /> {hotel.rating}
      </div>
      <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
        <MapPin className="h-3 w-3" /> {hotel.city}
      </div>
    </div>
    <div className="p-5 space-y-3">
      <h3 className="text-lg font-display font-semibold text-foreground">{hotel.name}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{hotel.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {hotel.amenities.slice(0, 4).map((a) => {
          const Icon = amenityIcons[a];
          return (
            <span key={a} className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/50 text-xs text-muted-foreground border border-border">
              {Icon && <Icon className="h-3 w-3" />} {a}
            </span>
          );
        })}
      </div>
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-0.5 text-primary font-bold text-lg">
          <IndianRupee className="h-4 w-4" />{hotel.price_per_night.toLocaleString("en-IN")}
          <span className="text-xs text-muted-foreground font-normal">/night</span>
        </div>
      </div>
      <span className="block w-full text-center py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all mt-2">
        View Details
      </span>
    </div>
  </Link>
);

const Hotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState("All");

  useEffect(() => {
    const fetchHotels = async () => {
      const { data } = await supabase.from("hotels").select("*").eq("available", true);
      if (data) setHotels(data as Hotel[]);
      setLoading(false);
    };
    fetchHotels();
  }, []);

  const filteredHotels = selectedCity === "All" ? hotels : hotels.filter((h) => h.city === selectedCity);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-28 pb-16">
        <div className="text-center space-y-3 mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" /> Hotel Booking
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Book Your Perfect <span className="text-gradient">Stay</span>
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Handpicked hotels across India's most popular destinations. Comfort, convenience, and great prices.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CITIES.map((city) => (
            <button key={city} onClick={() => setSelectedCity(city)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                selectedCity === city
                  ? "bg-primary text-primary-foreground border-primary glow-amber"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}>
              {city}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground py-20">Loading hotels...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
            {filteredHotels.length === 0 && (
              <div className="col-span-full text-center py-16 text-muted-foreground">
                No hotels found in this city. More coming soon!
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Hotels;