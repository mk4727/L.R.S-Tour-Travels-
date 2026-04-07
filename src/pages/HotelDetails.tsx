import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, MapPin, Star, IndianRupee, Phone, Wifi, Wind, UtensilsCrossed, Car, CheckCircle, BedDouble } from "lucide-react";
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

const amenityIcons: Record<string, typeof Wifi> = {
  WiFi: Wifi, AC: Wind, Restaurant: UtensilsCrossed, Parking: Car,
};

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      const { data } = await supabase.from("hotels").select("*").eq("id", id).single();
      if (data) setHotel(data as Hotel);
      setLoading(false);
    };
    fetchHotel();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-28 pb-16 text-center space-y-6">
          <h1 className="text-3xl font-display font-bold text-foreground">Hotel Not Found</h1>
          <p className="text-muted-foreground">The hotel you're looking for doesn't exist.</p>
          <Link to="/hotels" className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold">Browse Hotels</Link>
        </div>
        <Footer />
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
            <img src={hotel.image} alt={hotel.name} className="w-full h-[400px] object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-primary font-semibold uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {hotel.city}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                  <Star className="h-3.5 w-3.5 fill-primary" /> {hotel.rating}
                </span>
              </div>
              <h1 className="text-4xl font-display font-bold text-foreground">{hotel.name}</h1>
            </div>

            <div className="flex items-center gap-2 text-3xl font-bold text-primary">
              <IndianRupee className="h-6 w-6" />
              {hotel.price_per_night.toLocaleString("en-IN")}
              <span className="text-base text-muted-foreground font-normal">/night</span>
            </div>

            <p className="text-muted-foreground leading-relaxed">{hotel.description}</p>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {hotel.amenities.map((a) => {
                  const Icon = amenityIcons[a];
                  return (
                    <span key={a} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-secondary/50 text-sm text-foreground border border-border">
                      {Icon && <Icon className="h-4 w-4 text-primary" />} {a}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <Phone className="h-5 w-5 text-primary mb-2" />
                <div className="text-xs text-muted-foreground">Contact</div>
                <div className="text-sm font-semibold text-foreground">{hotel.contact_phone || "Available on booking"}</div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <BedDouble className="h-5 w-5 text-primary mb-2" />
                <div className="text-xs text-muted-foreground">Room Types</div>
                <div className="text-sm font-semibold text-foreground">Single, Double, Suite</div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <Star className="h-5 w-5 text-primary mb-2" />
                <div className="text-xs text-muted-foreground">Rating</div>
                <div className="text-sm font-semibold text-foreground">{hotel.rating} / 5</div>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                <CheckCircle className="h-5 w-5 text-primary mb-2" />
                <div className="text-xs text-muted-foreground">Status</div>
                <div className="text-sm font-semibold text-foreground">{hotel.available ? "Available" : "Fully Booked"}</div>
              </div>
            </div>

            {hotel.available ? (
              <Link to={`/book-hotel?hotel=${hotel.id}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-amber">
                Book This Hotel
              </Link>
            ) : (
              <div className="px-8 py-4 rounded-lg bg-muted text-muted-foreground font-semibold inline-block">
                Currently Fully Booked
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelDetails;
