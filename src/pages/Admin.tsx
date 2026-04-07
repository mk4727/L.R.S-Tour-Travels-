import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ImageUpload from "@/components/ImageUpload";
import Footer from "@/components/Footer";
import RichTextEditor from "@/components/RichTextEditor";
import { Lock, Car, MessageSquare, Info, Save, Plus, Trash2, Star, LogOut, Compass, Settings, Hotel } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
// import { tours as defaultTours, Tour } from "@/data/tours";
// import { getSiteSettings, saveSiteSettings, SiteSettings } from "@/data/siteSettings";

const ADMIN_PASSWORD = "admin123";
const STORAGE_KEY_AUTH = "rideswi_admin_auth";

const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY_AUTH, "true");
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border shadow-lg">
        <div className="text-center space-y-3 mb-8">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Enter your password to access the dashboard</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="password" placeholder="Enter admin password" value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }} className="h-12" />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button type="submit" className="w-full h-12 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all">Login</button>
        </form>
      </div>
    </div>
  );
};

type Tab = "cars" | "about" | "testimonials" | "tours" | "settings" | "hotels";

interface CarItem {
  id: string; name: string; type: string; seats: number; price_per_km: number;
  fuel_type: string; ac: boolean; image: string; description: string; available: boolean;
  categories: string[];
}

interface TestimonialItem {
  id: string; name: string; text: string; rating: number; avatar: string;
}

interface TourItem {
  id: string; title: string; destination: string; image: string; duration: string;
  price: number; category: string; tag: string; description: string;
}

interface SiteSettingsItem {
  id: string; company_name: string; tagline: string; phone: string; email: string;
  address: string; whatsapp: string; instagram: string; twitter: string;
  facebook: string; youtube: string; map_embed_url: string;
}

interface HotelItem {
  id: string; name: string; city: string; image: string; price_per_night: number;
  rating: number; amenities: string[]; description: string; contact_phone: string; available: boolean;
}

const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
  const [tab, setTab] = useState<Tab>("cars");
  const [cars, setCars] = useState<CarItem[]>([]);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [aboutText, setAboutText] = useState("");
  const [aboutId, setAboutId] = useState<string | null>(null);
  const [tours, setTours] = useState<TourItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<SiteSettingsItem | null>(null);
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load all data from Supabase
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [carsRes, testimonialsRes, aboutRes, toursRes, settingsRes, hotelsRes] = await Promise.all([
        supabase.from("cars").select("*"),
        supabase.from("testimonials").select("*"),
        supabase.from("about_content").select("*").limit(1),
        supabase.from("tours").select("*"),
        supabase.from("site_settings").select("*").limit(1),
        supabase.from("hotels").select("*"),
      ]);
      if (carsRes.data) setCars(carsRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      if (aboutRes.data && aboutRes.data.length > 0) {
        setAboutText(aboutRes.data[0].content);
        setAboutId(aboutRes.data[0].id);
      }
      if (toursRes.data) setTours(toursRes.data);
      if (settingsRes.data && settingsRes.data.length > 0) setSiteSettings(settingsRes.data[0]);
      if (hotelsRes.data) setHotels(hotelsRes.data);
      setLoading(false);
    };
    loadData();
  }, []);

  // --- Cars ---
  const saveCars = async () => {
    for (const car of cars) {
      await supabase.from("cars").upsert({
        id: car.id, name: car.name, type: car.type, seats: car.seats,
         fuel_type: car.fuel_type, ac: car.ac,
        image: car.image, description: car.description, available: car.available,
        categories: car.categories,
      });
    }
    toast({ title: "Cars updated!", description: "Changes saved to database." });
  };

  const addCar = async () => {
    const { data } = await supabase.from("cars").insert({
      name: "New Car", type: "Sedan", seats: 4, 
      fuel_type: "Petrol", ac: true, image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&q=80",
      description: "Enter car description here.", available: true, categories: ["rental"],
    }).select();
    if (data) setCars((prev) => [...prev, data[0]]);
    toast({ title: "Car added!", description: "New car created in database." });
  };

  const deleteCar = async (id: string) => {
    await supabase.from("cars").delete().eq("id", id);
    setCars((prev) => prev.filter((c) => c.id !== id));
    toast({ title: "Car removed!", description: "Car deleted from database." });
  };

  const updateCar = (id: string, field: keyof CarItem, value: any) => {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };


  // --- Testimonials ---
  const saveTestimonials = async () => {
    for (const t of testimonials) {
      await supabase.from("testimonials").upsert({
        id: t.id, name: t.name, text: t.text, rating: t.rating, avatar: t.avatar,
      });
    }
    toast({ title: "Testimonials updated!", description: "Changes saved to database." });
  };

  const addTestimonial = async () => {
    const { data } = await supabase.from("testimonials").insert({
      name: "New Customer", text: "Enter review here.", rating: 5, avatar: "NC",
    }).select();
    if (data) setTestimonials((prev) => [...prev, data[0]]);
    toast({ title: "Testimonial added!" });
  };

  const deleteTestimonial = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Testimonial removed!" });
  };

  const updateTestimonial = (id: string, field: keyof TestimonialItem, value: string | number) => {
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  // --- About ---
  const saveAbout = async () => {
    if (aboutId) {
      await supabase.from("about_content").update({ content: aboutText }).eq("id", aboutId);
    } else {
      const { data } = await supabase.from("about_content").insert({ content: aboutText }).select();
      if (data) setAboutId(data[0].id);
    }
    toast({ title: "About section updated!", description: "Changes saved to database." });
  };

  // --- Tours ---
  const saveTours = async () => {
    for (const t of tours) {
      await supabase.from("tours").upsert({
        id: t.id, title: t.title, destination: t.destination, image: t.image,
        duration: t.duration, price: t.price, category: t.category, tag: t.tag,
        description: t.description,
      });
    }
    toast({ title: "Tours updated!", description: "Changes saved to database." });
  };

  const addTour = async () => {
    const { data } = await supabase.from("tours").insert({
      title: "New Tour", destination: "City, State",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
      duration: "2 Days / 1 Night", price: 5000, category: "destination", tag: "New",
      description: "Enter tour description here.",
    }).select();
    if (data) setTours((prev) => [...prev, data[0]]);
    toast({ title: "Tour added!" });
  };

  const deleteTour = async (id: string) => {
    await supabase.from("tours").delete().eq("id", id);
    setTours((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Tour removed!" });
  };

  const updateTour = (id: string, field: keyof TourItem, value: string | number) => {
    setTours((prev) => prev.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  };

  // --- Site Settings ---
  const handleSaveSiteSettings = async () => {
    if (siteSettings) {
      await supabase.from("site_settings").update({
        company_name: siteSettings.company_name, tagline: siteSettings.tagline,
        phone: siteSettings.phone, email: siteSettings.email, address: siteSettings.address,
        whatsapp: siteSettings.whatsapp, instagram: siteSettings.instagram,
        twitter: siteSettings.twitter, facebook: siteSettings.facebook,
        youtube: siteSettings.youtube, map_embed_url: siteSettings.map_embed_url,
      }).eq("id", siteSettings.id);
      toast({ title: "Site settings updated!", description: "Changes saved to database." });
    }
  };

  const updateSetting = (field: keyof SiteSettingsItem, value: string) => {
    setSiteSettings((prev) => prev ? { ...prev, [field]: value } : prev);
  };

  // --- Hotels ---
  const saveHotels = async () => {
    for (const h of hotels) {
      await supabase.from("hotels").upsert({
        id: h.id, name: h.name, city: h.city, image: h.image,
        price_per_night: h.price_per_night, rating: h.rating, amenities: h.amenities,
        description: h.description, contact_phone: h.contact_phone, available: h.available,
      });
    }
    toast({ title: "Hotels updated!", description: "Changes saved to database." });
  };

  const addHotel = async () => {
    const { data } = await supabase.from("hotels").insert({
      name: "New Hotel", city: "Agra", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80",
      price_per_night: 2000, rating: 4, amenities: ["WiFi", "AC"],
      description: "Enter hotel description.", contact_phone: "+91...", available: true,
    }).select();
    if (data) setHotels((prev) => [...prev, data[0]]);
    toast({ title: "Hotel added!" });
  };

  const deleteHotel = async (id: string) => {
    await supabase.from("hotels").delete().eq("id", id);
    setHotels((prev) => prev.filter((h) => h.id !== id));
    toast({ title: "Hotel removed!" });
  };

  const updateHotel = (id: string, field: keyof HotelItem, value: any) => {
    setHotels((prev) => prev.map((h) => (h.id === id ? { ...h, [field]: value } : h)));
  };

  const tabs: { key: Tab; label: string; icon: typeof Car }[] = [
    { key: "cars", label: "Manage Cars", icon: Car },
    { key: "tours", label: "Tour Packages", icon: Compass },
    { key: "hotels", label: "Hotels", icon: Hotel },
    { key: "about", label: "About Section", icon: Info },
    { key: "testimonials", label: "Testimonials", icon: MessageSquare },
    { key: "settings", label: "Site Settings", icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground text-lg">Loading admin data...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-28 pb-16">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-destructive hover:border-destructive transition-all text-sm">
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>

        <div className="flex gap-3 mb-8 flex-wrap">
          {tabs.map((t) => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm transition-all border ${
                tab === t.key ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}>
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* Cars Tab */}
        {tab === "cars" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-display font-semibold text-foreground">Vehicles ({cars.length})</h2>
              <div className="flex gap-3">
                <button onClick={addCar} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
                  <Plus className="h-4 w-4" /> Add Car
                </button>
                <button onClick={saveCars} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-all">
                  <Save className="h-4 w-4" /> Save All
                </button>
              </div>
            </div>
            {cars.map((car) => (
              <div key={car.id} className="p-6 rounded-xl bg-card border border-border space-y-4">
                <div className="flex items-start gap-4">
                  <img src={car.image} alt={car.name} className="w-24 h-24 rounded-lg object-cover border border-border" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div><label className="text-xs text-muted-foreground">Name</label><Input value={car.name} onChange={(e) => updateCar(car.id, "name", e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Type</label><Input value={car.type} onChange={(e) => updateCar(car.id, "type", e.target.value)} /></div>
                    {/* <div><label className="text-xs text-muted-foreground"></label><Input type="number"  onChange={(e) => updateCar(car.id, "price_per_km", +e.target.value)} /></div> */}
                    <div><label className="text-xs text-muted-foreground">Seats</label><Input type="number" value={car.seats} onChange={(e) => updateCar(car.id, "seats", +e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Fuel Type</label><Input value={car.fuel_type} onChange={(e) => updateCar(car.id, "fuel_type", e.target.value)} /></div>
                    <div><ImageUpload label="Car Image" value={car.image} onChange={(url) => updateCar(car.id, "image", url)} /></div>
                    <div>
                      <label className="text-xs text-muted-foreground">Categories (select multiple)</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {[
                          { value: "rental", label: "Rental" },
                          { value: "luxury", label: "Luxury" },
                          { value: "tempo", label: "Tempo" },
                          { value: "airport", label: "Airport & Railway" },
                        ].map((opt) => {
                          const cats = car.categories || ["rental"];
                          const isSelected = cats.includes(opt.value);
                          return (
                            <button key={opt.value} type="button"
                              onClick={() => {
                                const current = car.categories || ["rental"];
                                const updated = isSelected ? current.filter((c) => c !== opt.value) : [...current, opt.value];
                                if (updated.length > 0) updateCar(car.id, "categories", updated);
                              }}
                              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                                isSelected ? "bg-primary text-primary-foreground border-primary" : "bg-card text-muted-foreground border-border hover:border-primary/40"
                              }`}>
                              {opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div><label className="text-xs text-muted-foreground">Description</label><Textarea value={car.description} onChange={(e) => updateCar(car.id, "description", e.target.value)} rows={2} /></div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={car.available} onChange={(e) => updateCar(car.id, "available", e.target.checked)} className="accent-primary h-4 w-4" />
                    <span className="text-foreground">Available</span>
                  </label>
                  <button onClick={() => deleteCar(car.id)} className="flex items-center gap-1 text-sm text-destructive hover:underline"><Trash2 className="h-4 w-4" /> Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tours Tab */}
        {tab === "tours" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-display font-semibold text-foreground">Tour Packages ({tours.length})</h2>
              <div className="flex gap-3">
                <button onClick={addTour} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
                  <Plus className="h-4 w-4" /> Add Tour
                </button>
                <button onClick={saveTours} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-all">
                  <Save className="h-4 w-4" /> Save All
                </button>
              </div>
            </div>
            {tours.map((tour) => (
              <div key={tour.id} className="p-6 rounded-xl bg-card border border-border space-y-4">
                <div className="flex items-start gap-4">
                  <img src={tour.image} alt={tour.title} className="w-24 h-24 rounded-lg object-cover border border-border" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div><label className="text-xs text-muted-foreground">Title</label><Input value={tour.title} onChange={(e) => updateTour(tour.id, "title", e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Destination</label><Input value={tour.destination} onChange={(e) => updateTour(tour.id, "destination", e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Tag</label><Input value={tour.tag} onChange={(e) => updateTour(tour.id, "tag", e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Duration</label><Input value={tour.duration} onChange={(e) => updateTour(tour.id, "duration", e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Price (₹)</label><Input type="number" value={tour.price} onChange={(e) => updateTour(tour.id, "price", +e.target.value)} /></div>
                    <div>
                      <label className="text-xs text-muted-foreground">Category</label>
                      <select value={tour.category} onChange={(e) => updateTour(tour.id, "category", e.target.value)}
                        className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground text-sm">
                        <option value="destination">Destination</option>
                        <option value="theme">Theme</option>
                        <option value="activity">Activity</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div><ImageUpload label="Tour Image" value={tour.image} onChange={(url) => updateTour(tour.id, "image", url)} /></div>
                <div><label className="text-xs text-muted-foreground">Description</label><RichTextEditor value={tour.description} onChange={(html) => updateTour(tour.id, "description", html)} minHeight="100px" /></div>
                <div className="flex justify-end">
                  <button onClick={() => deleteTour(tour.id)} className="flex items-center gap-1 text-sm text-destructive hover:underline"><Trash2 className="h-4 w-4" /> Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hotels Tab */}
        {tab === "hotels" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-display font-semibold text-foreground">Hotels ({hotels.length})</h2>
              <div className="flex gap-3">
                <button onClick={addHotel} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
                  <Plus className="h-4 w-4" /> Add Hotel
                </button>
                <button onClick={saveHotels} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-all">
                  <Save className="h-4 w-4" /> Save All
                </button>
              </div>
            </div>
            {hotels.map((hotel) => (
              <div key={hotel.id} className="p-6 rounded-xl bg-card border border-border space-y-4">
                <div className="flex items-start gap-4">
                  <img src={hotel.image} alt={hotel.name} className="w-24 h-24 rounded-lg object-cover border border-border" />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div><label className="text-xs text-muted-foreground">Hotel Name</label><Input value={hotel.name} onChange={(e) => updateHotel(hotel.id, "name", e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">City</label><Input value={hotel.city} onChange={(e) => updateHotel(hotel.id, "city", e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Price/Night (₹)</label><Input type="number" value={hotel.price_per_night} onChange={(e) => updateHotel(hotel.id, "price_per_night", +e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Rating (1-5)</label><Input type="number" min={1} max={5} step={0.1} value={hotel.rating} onChange={(e) => updateHotel(hotel.id, "rating", +e.target.value)} /></div>
                    <div><label className="text-xs text-muted-foreground">Contact Phone</label><Input value={hotel.contact_phone} onChange={(e) => updateHotel(hotel.id, "contact_phone", e.target.value)} /></div>
                    <div><ImageUpload label="Hotel Image" value={hotel.image} onChange={(url) => updateHotel(hotel.id, "image", url)} /></div>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Amenities (comma separated)</label>
                  <Input value={hotel.amenities.join(", ")} onChange={(e) => updateHotel(hotel.id, "amenities", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} placeholder="WiFi, AC, Restaurant, Parking" />
                </div>
                <div><label className="text-xs text-muted-foreground">Description</label><Textarea value={hotel.description} onChange={(e) => updateHotel(hotel.id, "description", e.target.value)} rows={2} /></div>
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={hotel.available} onChange={(e) => updateHotel(hotel.id, "available", e.target.checked)} className="accent-primary h-4 w-4" />
                    <span className="text-foreground">Available</span>
                  </label>
                  <button onClick={() => deleteHotel(hotel.id)} className="flex items-center gap-1 text-sm text-destructive hover:underline"><Trash2 className="h-4 w-4" /> Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}


        {tab === "about" && (
          <div className="space-y-6">
            <h2 className="text-xl font-display font-semibold text-foreground">Edit About Section</h2>
            <div className="p-6 rounded-xl bg-card border border-border space-y-4">
              <label className="text-xs text-muted-foreground">Use the toolbar to format text with bold, italic, fonts, colors, and more.</label>
              <RichTextEditor value={aboutText} onChange={setAboutText} placeholder="Write about your taxi service..." minHeight="200px" />
              <button onClick={saveAbout} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all">
                <Save className="h-4 w-4" /> Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {tab === "testimonials" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-display font-semibold text-foreground">Testimonials ({testimonials.length})</h2>
              <div className="flex gap-3">
                <button onClick={addTestimonial} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all">
                  <Plus className="h-4 w-4" /> Add Testimonial
                </button>
                <button onClick={saveTestimonials} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-all">
                  <Save className="h-4 w-4" /> Save All
                </button>
              </div>
            </div>
            {testimonials.map((t) => (
              <div key={t.id} className="p-6 rounded-xl bg-card border border-border space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div><label className="text-xs text-muted-foreground">Customer Name</label><Input value={t.name} onChange={(e) => updateTestimonial(t.id, "name", e.target.value)} /></div>
                  <div><label className="text-xs text-muted-foreground">Initials (Avatar)</label><Input value={t.avatar} onChange={(e) => updateTestimonial(t.id, "avatar", e.target.value)} /></div>
                  <div>
                    <label className="text-xs text-muted-foreground">Rating (1-5)</label>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((r) => (
                        <button key={r} onClick={() => updateTestimonial(t.id, "rating", r)} className="p-0.5">
                          <Star className={`h-5 w-5 ${r <= t.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div><label className="text-xs text-muted-foreground">Review Text</label><Textarea value={t.text} onChange={(e) => updateTestimonial(t.id, "text", e.target.value)} rows={2} /></div>
                <div className="flex justify-end">
                  <button onClick={() => deleteTestimonial(t.id)} className="flex items-center gap-1 text-sm text-destructive hover:underline"><Trash2 className="h-4 w-4" /> Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Site Settings Tab */}
        {tab === "settings" && siteSettings && (
          <div className="space-y-6">
            <h2 className="text-xl font-display font-semibold text-foreground">Site-Wide Settings</h2>
            <div className="p-6 rounded-xl bg-card border border-border space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-muted-foreground">Company Name</label><Input value={siteSettings.company_name} onChange={(e) => updateSetting("company_name", e.target.value)} /></div>
                  <div><label className="text-xs text-muted-foreground">Phone Number</label><Input value={siteSettings.phone} onChange={(e) => updateSetting("phone", e.target.value)} /></div>
                  <div><label className="text-xs text-muted-foreground">Email</label><Input value={siteSettings.email} onChange={(e) => updateSetting("email", e.target.value)} /></div>
                  <div><label className="text-xs text-muted-foreground">Address</label><Input value={siteSettings.address} onChange={(e) => updateSetting("address", e.target.value)} /></div>
                </div>
                <div className="mt-3">
                  <label className="text-xs text-muted-foreground">Tagline</label>
                  <Textarea value={siteSettings.tagline} onChange={(e) => updateSetting("tagline", e.target.value)} rows={2} />
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Social Media Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="text-xs text-muted-foreground">WhatsApp URL</label><Input value={siteSettings.whatsapp} onChange={(e) => updateSetting("whatsapp", e.target.value)} placeholder="https://wa.me/91..." /></div>
                  <div><label className="text-xs text-muted-foreground">Instagram URL</label><Input value={siteSettings.instagram} onChange={(e) => updateSetting("instagram", e.target.value)} placeholder="https://www.instagram.com/l.r.s.toursandtravels342?utm_source=qr&igsh=MmJ4YW82eGFrOWRr" /></div>
                  <div><label className="text-xs text-muted-foreground">Twitter / X URL</label><Input value={siteSettings.twitter} onChange={(e) => updateSetting("twitter", e.target.value)} placeholder="https://twitter.com/..." /></div>
                  <div><label className="text-xs text-muted-foreground">Facebook URL</label><Input value={siteSettings.facebook} onChange={(e) => updateSetting("facebook", e.target.value)} placeholder="https://facebook.com/..." /></div>
                  <div><label className="text-xs text-muted-foreground">YouTube URL</label><Input value={siteSettings.youtube} onChange={(e) => updateSetting("youtube", e.target.value)} placeholder="https://youtube.com/@..." /></div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">Google Map Embed</h3>
                <div><label className="text-xs text-muted-foreground">Map Embed URL</label><Input value={siteSettings.map_embed_url} onChange={(e) => updateSetting("map_embed_url", e.target.value)} placeholder="https://www.google.com/maps/embed?..." /></div>
              </div>

              <button onClick={handleSaveSiteSettings} className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all">
                <Save className="h-4 w-4" /> Save Site Settings
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const Admin = () => {
  const [authed, setAuthed] = useState(() => localStorage.getItem(STORAGE_KEY_AUTH) === "true");
  const handleLogout = () => { localStorage.removeItem(STORAGE_KEY_AUTH); setAuthed(false); };
  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;
  return <AdminDashboard onLogout={handleLogout} />;
};

export default Admin;
