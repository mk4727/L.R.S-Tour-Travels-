import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IndianRupee, MapPin, Star, CheckCircle2, Users, CalendarDays, BedDouble, Sparkles, Phone, Mail, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import emailjs from "@emailjs/browser";

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

const PREFERENCE_MULTIPLIER: Record<string, number> = {
  budget: 0.7,
  standard: 1,
  luxury: 1.8,
};

const getTodayString = () => new Date().toISOString().split("T")[0];

const BookHotel = () => {
  const [searchParams] = useSearchParams();
  const hotelId = searchParams.get("hotel") || "";
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    check_in: "", check_out: "", guests: "1", rooms: "1",
    hotel_preference: "standard", room_type: "double",
    special_occasion: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      if (!hotelId) { setLoading(false); return; }
      const { data } = await supabase.from("hotels").select("*").eq("id", hotelId).single();
      if (data) setHotel(data as Hotel);
      setLoading(false);
    };
    fetchHotel();
  }, [hotelId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name || !form.phone || !form.check_in || !form.check_out) {
//       toast.error("Please fill all required fields"); return;
//     }
//     setSubmitting(true);

//     // Save to database
//     const messageStr = `Preference: ${form.hotel_preference} | Room: ${form.room_type} | Rooms: ${form.rooms}${form.special_occasion ? ` | Occasion: ${form.special_occasion}` : ""}${form.message ? ` | Notes: ${form.message}` : ""}`;

//     const { error } = await supabase.from("hotel_bookings").insert({
//       hotel_id: hotel?.id || hotelId,
//       guest_name: form.name,
//       guest_phone: form.phone,
//       guest_email: form.email,
//       check_in: form.check_in,
//       check_out: form.check_out,
//       guests_count: parseInt(form.guests),
//       message: messageStr,
//     });

//     // Send EmailJS notification (if configured)
//     try {
//       const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
//       const templateId = import.meta.env.VITE_EMAILJS_HOTEL_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
//       const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

//       if (serviceId && templateId && publicKey) {
//         await emailjs.send(serviceId, templateId, {
//           from_name: form.name,
//           from_email: form.email,
//           phone: form.phone,
//           to_name: "Admin",
//           guest_name: form.name,
//           guest_email: form.email,
//           guest_phone: form.phone,
//           hotel_name: hotel?.name || "N/A",
//           hotel_city: hotel?.city || "N/A",
//           check_in: form.check_in,
//           check_out: form.check_out,
//           guests: form.guests,
//           rooms: form.rooms,
//           hotel_preference: form.hotel_preference,
//           room_type: form.room_type,
//           special_occasion: form.special_occasion,
//           message: `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nHotel: ${hotel?.name}\nCity: ${hotel?.city}\nCheck-in: ${form.check_in}\nCheck-out: ${form.check_out}\nGuests: ${form.guests}\nRooms: ${form.rooms}\nPreference: ${form.hotel_preference}\nRoom Type: ${form.room_type}${form.special_occasion ? `\nOccasion: ${form.special_occasion}` : ""}${form.message ? `\nNotes: ${form.message}` : ""}`,
//         }, publicKey);
//       }
//     } catch (emailError) {
//       console.log("EmailJS not configured or failed:", emailError);
//     }

//     setSubmitting(false);

//     if (error) {
//       toast.error("Failed to submit booking. Please try again.");
//     } else {
//       setSubmitted(true);
//       toast.success("Hotel booking request sent!");
//     }
//   };

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.phone || !form.check_in || !form.check_out) {
    toast.error("Please fill all required fields");
    return;
  }

  setSubmitting(true);

  // ✅ Create message string (same as before)
  const messageStr = `Preference: ${form.hotel_preference} | Room: ${form.room_type} | Rooms: ${form.rooms}${
    form.special_occasion ? ` | Occasion: ${form.special_occasion}` : ""
  }${form.message ? ` | Notes: ${form.message}` : ""}`;

  // ✅ EmailJS Template Params (like taxi format)
  const templateParams = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    hotel: hotel?.name || "N/A",
    city: hotel?.city || "N/A",
    check_in: form.check_in,
    check_out: form.check_out,
    guests: form.guests,
    rooms: form.rooms,
    preference: form.hotel_preference,
    room_type: form.room_type,
    special_occasion: form.special_occasion,
    message: form.message,
  };

  try {
    // ✅ 1. Send Email (same style as taxi)
    await emailjs.send(
      "service_qqsrpwb",   // 🔴 your service ID
      "template_itgacda",  // 🔴 your template ID
      templateParams,
      "CgOZaW5zQ1gtbicoe"  // 🔴 your public key
    );

    // ✅ 2. Save to Supabase
    const { error } = await supabase.from("hotel_bookings").insert({
      hotel_id: hotel?.id || hotelId,
      guest_name: form.name,
      guest_phone: form.phone,
      guest_email: form.email,
      check_in: form.check_in,
      check_out: form.check_out,
      guests_count: parseInt(form.guests),
      message: messageStr,
    });

    if (error) {
      toast.error("Booking saved failed, but email sent!");
    } else {
      setSubmitted(true);
      toast.success("Hotel booked & email sent successfully!");
    }

  } catch (error) {
    console.error(error);
    toast.error("Failed to send booking email");
  }

  setSubmitting(false);
};


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

  if (submitted) {
    const nights = form.check_in && form.check_out
      ? Math.max(1, Math.ceil((new Date(form.check_out).getTime() - new Date(form.check_in).getTime()) / (1000 * 60 * 60 * 24)))
      : 1;
    const multiplier = PREFERENCE_MULTIPLIER[form.hotel_preference] || 1;
    const totalPrice = Math.round(hotel.price_per_night * nights * parseInt(form.rooms) * multiplier);

    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-28 pb-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-6 animate-fade-in-up">
            <CheckCircle2 className="h-20 w-20 text-primary mx-auto" />
            <h1 className="text-4xl font-display font-bold text-foreground">Booking Request Sent!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your booking at <span className="text-primary font-semibold">{hotel.name}</span> in {hotel.city} has been submitted.
              We'll contact you at {form.phone} to confirm your reservation.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border text-lg">
              <span className="text-muted-foreground">Estimated Total:</span>
              <span className="flex items-center gap-1 text-primary font-bold"><IndianRupee className="h-5 w-5" />{totalPrice.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground text-sm">({nights} night{nights > 1 ? "s" : ""} × {form.rooms} room{parseInt(form.rooms) > 1 ? "s" : ""})</span>
            </div>
            <div className="flex gap-4 justify-center">
              <Link to="/hotels" className="px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-all">Browse More Hotels</Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const nights = form.check_in && form.check_out
    ? Math.max(1, Math.ceil((new Date(form.check_out).getTime() - new Date(form.check_in).getTime()) / (1000 * 60 * 60 * 24)))
    : 0;
  const multiplier = PREFERENCE_MULTIPLIER[form.hotel_preference] || 1;
  const totalPrice = nights > 0 ? Math.round(hotel.price_per_night * nights * parseInt(form.rooms) * multiplier) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Hotel Preview Banner */}
          <div className="rounded-xl overflow-hidden border border-border mb-8">
            <div className="relative h-64 md:h-80">
              <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-background">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3 fill-primary-foreground" /> {hotel.rating}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-bold">{hotel.name}</h1>
                <div className="flex flex-wrap gap-4 mt-3 text-sm opacity-90">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {hotel.city}</span>
                  <span className="flex items-center gap-1 font-bold"><IndianRupee className="h-4 w-4" /> {hotel.price_per_night.toLocaleString("en-IN")} / night</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-card"><p className="text-muted-foreground">{hotel.description}</p></div>
          </div>

          <div className="space-y-4 mb-6"><h2 className="text-2xl font-display font-bold text-foreground">Book This Hotel</h2></div>

          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl bg-card border border-border">
            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1"><Mail className="h-4 w-4 text-primary" /> Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@email.com" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1"><Phone className="h-4 w-4 text-primary" /> Phone *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1"><Users className="h-4 w-4 text-primary" /> Guests</label>
                <select name="guests" value={form.guests} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (<option key={n} value={n}>{n} {n===1?"Guest":"Guests"}</option>))}
                </select>
              </div>
            </div>

            {/* Stay Details */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1"><CalendarDays className="h-4 w-4 text-primary" /> Check In *</label>
                <input name="check_in" type="date" value={form.check_in} onChange={handleChange} min={getTodayString()}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1"><CalendarDays className="h-4 w-4 text-primary" /> Check Out *</label>
                <input name="check_out" type="date" value={form.check_out} onChange={handleChange} min={form.check_in || getTodayString()}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>

            {/* Hotel Preference */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><Sparkles className="h-4 w-4 text-primary" /> Hotel Preference</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "budget", label: "Budget", desc: "₹500–1500/night" },
                  { value: "standard", label: "Standard", desc: "₹1500–4000/night" },
                  { value: "luxury", label: "Luxury", desc: "₹4000+/night" },
                ].map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setForm({ ...form, hotel_preference: opt.value })}
                    className={`p-3 rounded-lg border text-left transition-all ${form.hotel_preference === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <div className="text-sm font-semibold text-foreground">{opt.label}</div>
                    <div className="text-[10px] text-muted-foreground">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Room Type */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><BedDouble className="h-4 w-4 text-primary" /> Room Type</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: "single", label: "Single" },
                  { value: "double", label: "Double" },
                  { value: "deluxe", label: "Deluxe / Suite" },
                ].map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setForm({ ...form, room_type: opt.value })}
                    className={`p-3 rounded-lg border text-center transition-all ${form.room_type === opt.value ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"}`}>
                    <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Rooms count */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Number of Rooms</label>
                <select name="rooms" value={form.rooms} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {[1,2,3,4,5,6,7,8,9,10].map((n) => (<option key={n} value={n}>{n} {n===1?"Room":"Rooms"}</option>))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Special Occasion</label>
                <input name="special_occasion" value={form.special_occasion} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Birthday, anniversary, etc." />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-1"><MessageSquare className="h-4 w-4 text-primary" /> Special Requests</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Extra bed, early check-in, specific floor..." />
            </div>

            {/* Price Summary */}
            {totalPrice > 0 && (
              <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center justify-between">
                <span className="text-muted-foreground">Estimated Total ({nights} night{nights > 1 ? "s" : ""} × {form.rooms} room{parseInt(form.rooms) > 1 ? "s" : ""} × ₹{hotel.price_per_night.toLocaleString("en-IN")})</span>
                <span className="flex items-center gap-1 text-primary font-bold text-xl"><IndianRupee className="h-5 w-5" />{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            )}

            <button type="submit" disabled={submitting}
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all glow-amber disabled:opacity-50">
              {submitting ? "Sending..." : "Submit Booking Request"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookHotel;
