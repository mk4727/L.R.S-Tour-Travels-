export interface SiteSettings {
  companyName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  instagram: string;
  twitter: string;
  facebook: string;
  youtube: string;
  mapEmbedUrl: string;
}

const STORAGE_KEY = "rideswift_site_settings";

export const defaultSiteSettings: SiteSettings = {
  companyName: "L.R.S TOURS",
  tagline: "Your trusted partner for safe and affordable city travel since 2006.",
  phone: "+91 98765 43210",
  email: "info@rideswift.in",
  address: "Mumbai, India",
  whatsapp: "https://wa.me/919876543210",
  instagram: "https://instagram.com/rideswift",
  twitter: "https://twitter.com/rideswift",
  facebook: "https://facebook.com/rideswift",
  youtube: "https://youtube.com/@rideswift",
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.14571525307!2d72.71637785737682!3d19.08219783953439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin",
};

export const getSiteSettings = (): SiteSettings => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return { ...defaultSiteSettings, ...JSON.parse(stored) };
  return defaultSiteSettings;
};

export const saveSiteSettings = (settings: SiteSettings) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
};
