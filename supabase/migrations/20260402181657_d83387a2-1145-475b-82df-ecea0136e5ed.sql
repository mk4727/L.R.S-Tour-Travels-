
-- Create hotels table
CREATE TABLE public.hotels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  image TEXT NOT NULL DEFAULT '',
  price_per_night NUMERIC NOT NULL DEFAULT 0,
  rating NUMERIC NOT NULL DEFAULT 4,
  amenities TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL DEFAULT '',
  contact_phone TEXT NOT NULL DEFAULT '',
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hotel bookings table
CREATE TABLE public.hotel_bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  hotel_id UUID REFERENCES public.hotels(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL DEFAULT '',
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests_count INTEGER NOT NULL DEFAULT 1,
  message TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_bookings ENABLE ROW LEVEL SECURITY;

-- Hotels policies
CREATE POLICY "Anyone can view hotels" ON public.hotels FOR SELECT USING (true);
CREATE POLICY "Anyone can insert hotels" ON public.hotels FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update hotels" ON public.hotels FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete hotels" ON public.hotels FOR DELETE USING (true);

-- Hotel bookings policies
CREATE POLICY "Anyone can view hotel_bookings" ON public.hotel_bookings FOR SELECT USING (true);
CREATE POLICY "Anyone can insert hotel_bookings" ON public.hotel_bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can delete hotel_bookings" ON public.hotel_bookings FOR DELETE USING (true);

-- Seed some hotels
INSERT INTO public.hotels (name, city, image, price_per_night, rating, amenities, description) VALUES
('Hotel Taj View', 'Agra', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', 2500, 4.5, '{"WiFi","AC","Pool","Restaurant","Parking"}', 'Luxury hotel with a stunning view of the Taj Mahal.'),
('Krishna Palace', 'Mathura', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800', 1800, 4.2, '{"WiFi","AC","Restaurant","Temple View"}', 'Located near the famous Krishna Janmabhoomi temple.'),
('Royal Heritage', 'Jaipur', 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800', 3500, 4.7, '{"WiFi","AC","Pool","Spa","Restaurant","Parking"}', 'A royal experience in the Pink City with heritage architecture.'),
('Ganga View Resort', 'Haridwar', 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', 2000, 4.3, '{"WiFi","AC","River View","Restaurant"}', 'Peaceful resort on the banks of the holy Ganges.'),
('Mountain Retreat', 'Mussoorie', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800', 2800, 4.4, '{"WiFi","AC","Mountain View","Restaurant","Bonfire"}', 'Escape to the queen of hills with breathtaking mountain views.'),
('Desert Oasis', 'Jaisalmer', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800', 3000, 4.6, '{"WiFi","AC","Desert Safari","Pool","Restaurant"}', 'Experience the golden city with desert safari and luxury stay.');

-- Add trigger for updated_at
CREATE TRIGGER update_hotels_updated_at
BEFORE UPDATE ON public.hotels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
