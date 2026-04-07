import { Shield, Clock, MapPin, Car, Star, Users, Phone, Award, CheckCircle2, Zap, Heart } from "lucide-react";
import { useAboutContent } from "@/hooks/useSupabaseData";
import { Link } from "react-router-dom";

// const stats = [
//   { icon: Users, value: "5,000+", label: "Happy Customers" },
//   { icon: Car, value: "50+", label: "Premium Vehicles" },
//   { icon: MapPin, value: "100+", label: "Destinations" },
//   { icon: Star, value: "4.9", label: "Average Rating" },
// ];

const services = [
  { icon: Car, title: "Car Rentals", desc: "Sedan, SUV, Luxury — pick your ride for any occasion.", color: "from-primary/20 to-primary/5" },
  { icon: MapPin, title: "Tour Packages", desc: "Curated trips across India's most iconic destinations.", color: "from-amber-500/20 to-amber-500/5" },
  { icon: Shield, title: "Safe & Reliable", desc: "Verified drivers, maintained vehicles, and 24/7 support.", color: "from-emerald-500/20 to-emerald-500/5" },
  { icon: Zap, title: "Instant Booking", desc: "Book in seconds. No hassle, no waiting.", color: "from-blue-500/20 to-blue-500/5" },
];

const whyUs = [
  "Transparent pricing with no hidden charges",
  "Professional & experienced drivers",
  "Well-maintained, sanitized vehicles",
  "24/7 customer support & roadside assistance",
  "Flexible cancellation policy",
  "On-time pickup guaranteed",
];

const AboutSection = () => {
  const { content: customAbout } = useAboutContent();

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w- h-72 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto relative z-10">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {/* {stats.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all group">
              <div className="mx-auto h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-display font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))} */}
        </div>

        {/* Main About */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6 h-full flex flex-col justify-between">
            {/* <span className="text-sm font-semibold text-primary uppercase tracking-wider">About Us</span> */}
            <span className="text-lg md:text-xxl font-bold text-primary uppercase tracking-widest leading-loose">
  About Us
</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground leading-tight">
              Your Trusted Travel <span className="text-gradient">Partner</span>
            </h2>
            {customAbout ? (
              <div className="text-muted-foreground leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: customAbout }} />
            ) : (
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>We are a leading car rental and tour service committed to making every journey memorable. From airport transfers to multi-day tours, we provide reliable, comfortable, and affordable travel solutions.</p>
                <p>With years of experience and thousands of happy customers, we pride ourselves on punctuality, safety, and exceptional service that goes beyond expectations.</p>
              </div>
            )}
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/book" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-amber">
                <Phone className="h-4 w-4" /> Book a Ride
              </Link>
              <Link to="/tours" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-primary bg-primary/10 text-foreground font-semibold hover:bg-primary/20 transition-all">
                <MapPin className="h-4 w-4" /> Explore Tours
              </Link>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="space-y-4 h-full flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-display font-bold text-foreground">Why Choose Us?</h3>
            </div>
            <div className="space-y-3">
              {whyUs.map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-foreground">{item}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-6 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <Heart className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-foreground">Trusted by 5,000+ happy customers across India</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              What We <span className="text-gradient">Offer</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group text-center space-y-3">
                <div className={`mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <s.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
