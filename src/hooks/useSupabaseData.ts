import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

// Generic hook for fetching data from Supabase
function useSupabaseTable<T>(table: "cars" | "tours" | "testimonials" | "about_content" | "site_settings" | "hotels" | "hotel_bookings", fallback: T[]): { data: T[]; loading: boolean; refetch: () => void } {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data: rows, error } = await supabase.from(table).select("*");
    if (!error && rows && rows.length > 0) {
      setData(rows as unknown as T[]);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, [table]);

  return { data, loading, refetch: fetchData };
}

// ---- Cars ----
export interface DbCar {
  id: string; name: string; type: string; seats: number; price_per_km: number;
  fuel_type: string; ac: boolean; image: string; description: string; available: boolean;
  categories: string[];
}

export const mapDbCar = (c: DbCar) => ({
  id: c.id, name: c.name, type: c.type, seats: c.seats, pricePerKm: c.price_per_km,
  fuelType: c.fuel_type, ac: c.ac, image: c.image, description: c.description,
  available: c.available, categories: c.categories,
});

export function useCars() {
  const { data, loading, refetch } = useSupabaseTable<DbCar>("cars", []);
  return { cars: data.map(mapDbCar), loading, refetch };
}

// ---- Tours ----
export interface DbTour {
  id: string; title: string; destination: string; image: string; duration: string;
  price: number; category: string; tag: string; description: string;
}

export function useTours() {
  return useSupabaseTable<DbTour>("tours", []);
}

// ---- Testimonials ----
export interface DbTestimonial {
  id: string; name: string; text: string; rating: number; avatar: string;
}

export function useTestimonials() {
  return useSupabaseTable<DbTestimonial>("testimonials", []);
}

// ---- About Content ----
export function useAboutContent() {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from("about_content").select("*").limit(1);
    if (data && data.length > 0) {
      setContent(data[0].content);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);
  return { content, loading, refetch: fetchData };
}

// ---- Site Settings ----
export interface DbSiteSettings {
  id: string; company_name: string; tagline: string; phone: string; email: string;
  address: string; whatsapp: string; instagram: string; twitter: string;
  facebook: string; youtube: string; map_embed_url: string;
}

export const mapDbSettings = (s: DbSiteSettings) => ({
  companyName: s.company_name, tagline: s.tagline, phone: s.phone, email: s.email,
  address: s.address, whatsapp: s.whatsapp, instagram: s.instagram, twitter: s.twitter,
  facebook: s.facebook, youtube: s.youtube, mapEmbedUrl: s.map_embed_url,
});

export function useSiteSettings() {
  const [settings, setSettings] = useState<DbSiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("*").limit(1);
    if (data && data.length > 0) {
      setSettings(data[0] as DbSiteSettings);
    }
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);
  return { settings, loading, refetch: fetchData };
}
