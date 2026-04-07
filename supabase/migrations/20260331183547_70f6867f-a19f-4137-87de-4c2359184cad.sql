
-- Create cars table
CREATE TABLE public.cars (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  seats INTEGER NOT NULL DEFAULT 4,
  price_per_km NUMERIC NOT NULL DEFAULT 10,
  fuel_type TEXT NOT NULL DEFAULT 'Petrol',
  ac BOOLEAN NOT NULL DEFAULT true,
  image TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  available BOOLEAN NOT NULL DEFAULT true,
  categories TEXT[] NOT NULL DEFAULT '{"rental"}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tours table
CREATE TABLE public.tours (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  destination TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  duration TEXT NOT NULL DEFAULT '1 Day',
  price NUMERIC NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'destination',
  tag TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  avatar TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create about_content table (single row)
CREATE TABLE public.about_content (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site_settings table (single row)
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL DEFAULT 'L.R.S TOURS',
  tagline TEXT NOT NULL DEFAULT '',
  phone TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  address TEXT NOT NULL DEFAULT '',
  whatsapp TEXT NOT NULL DEFAULT '',
  instagram TEXT NOT NULL DEFAULT '',
  twitter TEXT NOT NULL DEFAULT '',
  facebook TEXT NOT NULL DEFAULT '',
  youtube TEXT NOT NULL DEFAULT '',
  map_embed_url TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables (website content)
CREATE POLICY "Anyone can view cars" ON public.cars FOR SELECT USING (true);
CREATE POLICY "Anyone can view tours" ON public.tours FOR SELECT USING (true);
CREATE POLICY "Anyone can view testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Anyone can view about_content" ON public.about_content FOR SELECT USING (true);
CREATE POLICY "Anyone can view site_settings" ON public.site_settings FOR SELECT USING (true);

-- Admin write access (using anon key since admin uses password auth)
CREATE POLICY "Anyone can insert cars" ON public.cars FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update cars" ON public.cars FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete cars" ON public.cars FOR DELETE USING (true);

CREATE POLICY "Anyone can insert tours" ON public.tours FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update tours" ON public.tours FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete tours" ON public.tours FOR DELETE USING (true);

CREATE POLICY "Anyone can insert testimonials" ON public.testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update testimonials" ON public.testimonials FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete testimonials" ON public.testimonials FOR DELETE USING (true);

CREATE POLICY "Anyone can insert about_content" ON public.about_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update about_content" ON public.about_content FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete about_content" ON public.about_content FOR DELETE USING (true);

CREATE POLICY "Anyone can insert site_settings" ON public.site_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update site_settings" ON public.site_settings FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete site_settings" ON public.site_settings FOR DELETE USING (true);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for all tables
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON public.cars FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tours_updated_at BEFORE UPDATE ON public.tours FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
