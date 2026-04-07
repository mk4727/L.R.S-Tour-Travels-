import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import logo from "./Image/LOGO.png"; 

const slides = [
  {
    image: "https://lh3.googleusercontent.com/d/11ExrmqY4ul4XcKXjNv733R2Qp2zSF353",
    badge: "Reliable rides, anytime",
    heading: "Your Ride,",
    highlight: "Your Way",
    description: "Book premium taxis in seconds. Safe, affordable, and always on time. Experience city travel like never before.",
  },
  {
    image: "https://lh3.googleusercontent.com/d/1t_0dIjWIKxJ0ifx8sTo5chLPUmVu4si9",
    badge: "Travel in comfort",
    heading: "Luxury Cars,",
    highlight: "Best Prices",
    description: "Choose from our wide fleet of sedans, SUVs, and luxury vehicles. Every ride is a premium experience.",
  },
  {
image: "https://lh3.googleusercontent.com/d/1VxLn0cSU9oreuQfxd4BYdlKYDeqQuIkR",
    badge: "Explore India",
    heading: "Tour Packages",
    highlight: "Await You",
    description: "Discover handpicked tour packages to India's most iconic destinations. Adventure, heritage, and spirituality.",
  },
  {
    image: "https://lh3.googleusercontent.com/d/14jAx8TsSCiDda35SbGRmp1-dvnTnnJU0",
    badge: "24/7 availability",
    heading: "Airport &",
    highlight: "City Transfers",
    description: "Hassle-free airport pickups and drop-offs. Professional drivers, clean cars, and on-time service guaranteed.",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={s.image} alt={s.badge} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
        </div>
      ))}

      {/* Left arrow - screen edge */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full bg-primary/90 backdrop-blur border-2 border-primary flex items-center justify-center text-primary-foreground hover:bg-primary hover:scale-110 transition-all shadow-lg"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>

      {/* Right arrow - screen edge */}
      <button
        onClick={next}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 h-14 w-14 rounded-full bg-primary/90 backdrop-blur border-2 border-primary flex items-center justify-center text-primary-foreground hover:bg-primary hover:scale-110 transition-all shadow-lg"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      <div className="container mx-auto relative z-10 pt-28 pb-20">
        <div className="max-w-2xl space-y-8">
          <div key={current} className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">{slide.badge}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight text-foreground">
              {slide.heading}{" "}
              <span className="text-gradient">{slide.highlight}</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {slide.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all glow-amber"
              >
                Book a Ride <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border-2 border-primary bg-primary/10 text-foreground font-semibold hover:bg-primary/20 transition-all"
              >
                Tour Packages  <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-10 pt-6">
            {[
              { value: "1K+", label: "Happy Riders" },
              { value: "10+", label: "Vehicles" },
              { value: "24/7", label: "Availability" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-display font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots indicator - bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-3 rounded-full transition-all ${
              i === current ? "w-10 bg-primary" : "w-3 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
