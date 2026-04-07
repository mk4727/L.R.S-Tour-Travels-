import { MapPin } from "lucide-react";
import { useSiteSettings, mapDbSettings } from "@/hooks/useSupabaseData";
import { defaultSiteSettings } from "@/data/siteSettings";

const MapSection = () => {
  const { settings: dbSettings } = useSiteSettings();
  const settings = dbSettings ? mapDbSettings(dbSettings) : defaultSiteSettings;

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="text-center mb-10 space-y-3">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" /> Our Location
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Find <span className="text-gradient">Us Here</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Visit our office or reach out to us for any queries about rides and tour packages.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden border border-border shadow-lg" style={{ height: "400px" }}>
          {/* <iframe
            src={settings.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="RideSwif Location"
          /> */}
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3385.0205352429866!2d77.0777222!3d28.5807778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM0JzUwLjgiTiA3N8KwMDQnMzkuOCJF!5e1!3m2!1sen!2sin!4v1775487897777!5m2!1sen!2sin"
           width="100%" 
           height="100%" 
          style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title=" Location"
          />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
