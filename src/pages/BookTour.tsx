import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tours as defaultTours, Tour } from "@/data/tours";
import { IndianRupee, MapPin, Clock, CheckCircle2, Users, Calendar } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

const getStoredTours = (): Tour[] => {
  const stored = localStorage.getItem("rideswift_tours");
  if (stored) return JSON.parse(stored);
  return defaultTours;
};

const BookTour = () => {
  const [searchParams] = useSearchParams();
  const tourId = searchParams.get("tour") || "";
  const allTours = getStoredTours();
  const tour = allTours.find((t) => t.id === tourId);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    travelers: "1",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 // ✅ UPDATED WITH EMAILJS
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.date) {
      toast.error("Please fill all required fields");
      return;
    }

    const templateParams = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      tour: tour?.title,
      destination: tour?.destination,
      duration: tour?.duration,
      travelers: form.travelers,
      date: form.date,
      message: form.message,
      total: (tour!.price * parseInt(form.travelers || "1")).toLocaleString("en-IN"),
    };

    emailjs
      .send(
        "service_jko53kr",   // 🔴 replace
        "template_i5k74z8",  // 🔴 replace
        templateParams,
        "XQUdXDcAR8XINBQWF"    // 🔴 replace
      )
      .then(
        () => {
          setSubmitted(true);
          toast.success("Tour booked successfully!");
        },
        (error) => {
          console.error(error);
          toast.error("Failed to send booking. Try again.");
        }
      );
  };

  if (!tour) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-28 pb-16 text-center space-y-6">
          <h1 className="text-3xl font-display font-bold text-foreground">Tour Not Found</h1>
          <p className="text-muted-foreground">The tour package you're looking for doesn't exist.</p>
          <Link to="/tours" className="inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold">
            Browse Tours
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-28 pb-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-6 animate-fade-in-up">
            <CheckCircle2 className="h-20 w-20 text-primary mx-auto" />
            <h1 className="text-4xl font-display font-bold text-foreground">Tour Booking Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your tour to <span className="text-primary font-semibold">{tour.title}</span> has been booked.
              We'll contact you at {form.phone} with full details.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border text-lg">
              <span className="text-muted-foreground">Total:</span>
              <span className="flex items-center gap-1 text-primary font-bold">
                <IndianRupee className="h-5 w-5" />
                {(tour.price * parseInt(form.travelers || "1")).toLocaleString("en-IN")}
              </span>
              <span className="text-muted-foreground text-sm">({form.travelers} traveler{parseInt(form.travelers) > 1 ? "s" : ""})</span>
            </div>
            <div className="flex gap-4 justify-center">
              <Link to="/tours" className="px-6 py-3 rounded-lg border border-border text-foreground font-semibold hover:bg-secondary transition-all">
                Browse More Tours
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto pt-28 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Tour Info Header */}
          <div className="rounded-xl overflow-hidden border border-border mb-8">
            <div className="relative h-64 md:h-80">
              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-background">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-3 inline-block">
                  {tour.tag}
                </span>
                <h1 className="text-3xl md:text-4xl font-display font-bold">{tour.title}</h1>
                <div className="flex flex-wrap gap-4 mt-3 text-sm opacity-90">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {tour.destination}</span>
                  <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {tour.duration}</span>
                  <span className="flex items-center gap-1 font-bold"><IndianRupee className="h-4 w-4" /> {tour.price.toLocaleString("en-IN")} / person</span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-card">
              <p className="text-muted-foreground">{tour.description}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="space-y-4 mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground">Book This Tour</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl bg-card border border-border">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email *</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@email.com" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Users className="h-4 w-4 text-primary" /> Travelers *
                </label>
                <select name="travelers" value={form.travelers} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>
                  ))}
                </select>
              </div>
              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-primary" /> Travel Date *
                </label>
                <input name="date" type="date" value={form.date} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div> */}

              <div className="space-y-2">
  <label className="text-sm font-medium text-foreground">
    Travel Date *
  </label>

  <input
    name="date"
    type="date"
    value={form.date}
    onChange={handleChange}
    min={new Date().toISOString().split("T")[0]} // 👈 restrict past dates
    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
  />
</div>


            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Special Requests</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Any special requirements or requests..." />
            </div>

            {/* Price Summary */}
            <div className="p-4 rounded-lg bg-secondary/50 border border-border flex items-center justify-between">
              <span className="text-muted-foreground">Total Price ({form.travelers} × ₹{tour.price.toLocaleString("en-IN")})</span>
              <span className="flex items-center gap-1 text-primary font-bold text-xl">
                <IndianRupee className="h-5 w-5" />
                {(tour.price * parseInt(form.travelers || "1")).toLocaleString("en-IN")}
              </span>
            </div>

            <button type="submit"
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all glow-amber">
              Confirm Tour Booking
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookTour;
