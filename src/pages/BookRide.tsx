import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { IndianRupee, MapPin, Calculator, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useCars } from "@/hooks/useSupabaseData";
import emailjs from "@emailjs/browser";

const BookRide = () => {
  const [searchParams] = useSearchParams();
  const preselectedCar = searchParams.get("car") || "";
  const { cars: allCars } = useCars();

  const [form, setForm] = useState({
    name: "", email: "", phone: "", carId: preselectedCar,
    pickup: "", drop: "", date: "", message: "",
  });

  const [distance, setDistance] = useState<number | null>(null);
  const [fare, setFare] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const selectedCar = allCars.find((c) => c.id === form.carId);
  const availableCars = allCars.filter((c) => c.available);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "carId") { setFare(null); setDistance(null); }
  };

  const calculateFare = () => {
    if (!form.pickup || !form.drop) { toast.error("Please enter both pickup and drop locations"); return; }
    if (!selectedCar) { toast.error("Please select a car first"); return; }
    const mockDistance = Math.floor(Math.random() * 46) + 5;
    setDistance(mockDistance);
    // setFare(mockDistance * selectedCar.pricePerKm);
    // toast.success(`Estimated distance: ${mockDistance} km`);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!form.name || !form.email || !form.phone || !form.carId || !form.pickup || !form.drop || !form.date) {
  //     toast.error("Please fill all required fields"); return;
  //   }
  //   setSubmitted(true);
  //   toast.success("Ride booked successfully!");
  // };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name || !form.email || !form.phone || !form.carId || !form.pickup || !form.drop || !form.date) {
    toast.error("Please fill all required fields");
    return;
  }

  const selectedCar = allCars.find((c) => c.id === form.carId);

  const templateParams = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    car: selectedCar?.name || "N/A",
    pickup: form.pickup,
    drop: form.drop,
    date: form.date,
    message: form.message,
  };

  try {
    // ✅ Send Email
    await emailjs.send(
      "service_jko53kr",   // 🔴 your service ID
      "template_8lma1qg",  // 🔴 your template ID
      templateParams,
      "XQUdXDcAR8XINBQWF"  // 🔴 your public key
    );

    setSubmitted(true);
    toast.success("Ride booked & email sent successfully!");

  } catch (error) {
    console.error(error);
    toast.error("Failed to send booking email");
  }
};

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto pt-28 pb-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-6 animate-fade-in-up">
            <CheckCircle2 className="h-20 w-20 text-primary mx-auto" />
            <h1 className="text-4xl font-display font-bold text-foreground">Booking Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your ride with <span className="text-primary font-semibold">{selectedCar?.name}</span> has been booked. 
              We'll contact you shortly at {form.phone} to confirm the details.
            </p>
            {fare && (
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary border border-border text-lg">
                <span className="text-muted-foreground">Estimated Fare:</span>
                <span className="flex items-center gap-1 text-primary font-bold"><IndianRupee className="h-5 w-5" />{fare}</span>
              </div>
            )}
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
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Book a Ride</span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
              Reserve Your <span className="text-gradient">Taxi</span>
            </h1>
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Phone *</label>
                <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="+91 98765 43210" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Car *</label>
                <select name="carId" value={form.carId} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option value="">Choose a car</option>
                  {availableCars.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" /> Pickup Location *
                </label>
                <input name="pickup" value={form.pickup} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. Mumbai Central" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-primary" /> Drop Location *
                </label>
                <input name="drop" value={form.drop} onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. Andheri East" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Travel Date *</label>
              <input
    name="date"
    type="date"
    value={form.date}
    onChange={handleChange}
    min={new Date().toISOString().split("T")[0]} // 👈 restrict past dates
    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
  />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Additional Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows={3}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Any special requests..." />
            </div>

            {/* <div className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
              <button type="button" onClick={calculateFare}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/10 transition-all">
                <Calculator className="h-4 w-4" /> Calculate Fare
              </button>
              {fare !== null && distance !== null && (
                <div className="flex items-center gap-4 animate-fade-in">
                  <span className="text-sm text-muted-foreground">Distance: <strong className="text-foreground">{distance} km</strong></span>
                  <span className="text-sm text-muted-foreground">Fare: <strong className="text-primary text-lg">₹{fare}</strong></span>
                </div>
              )}
            </div> */}

            <button type="submit"
              className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all glow-amber">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookRide;
