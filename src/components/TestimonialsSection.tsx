import { Star } from "lucide-react";
import { useTestimonials } from "@/hooks/useSupabaseData";

const TestimonialsSection = () => {
  const { data: testimonials } = useTestimonials();

  return (
    <section id="testimonials" className="py-24 bg-card">
      <div className="container mx-auto">
        <div className="text-center mb-14 space-y-3">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            What Our <span className="text-gradient">Riders Say</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="p-6 rounded-xl bg-secondary/40 border border-border hover:border-primary/30 transition-all space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? "text-primary fill-primary" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                  {t.avatar}
                </div>
                <span className="text-sm font-semibold text-foreground">{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
