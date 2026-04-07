export interface Tour {
  id: string;
  title: string;
  destination: string;
  image: string;
  duration: string;
  price: number;
  category: "destination" | "theme" | "activity";
  tag: string;
  description: string;
}

export const tours: Tour[] = [
  // Tour by Destination
  {
    id: "d1",
    title: "Golden Temple, Amritsar",
    destination: "Amritsar, Punjab",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&q=80",
    duration: "2 Days / 1 Night",
    price: 4500,
    category: "destination",
    tag: "Amritsar",
    description: "Visit the iconic Golden Temple, Jallianwala Bagh, and Wagah Border. Includes comfortable cab, hotel stay, and guided sightseeing.",
  },
  {
    id: "d2",
    title: "Taj Mahal, Agra",
    destination: "Agra, Uttar Pradesh",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&q=80",
    duration: "1 Day",
    price: 3200,
    category: "destination",
    tag: "Agra",
    description: "A day trip to the magnificent Taj Mahal, Agra Fort, and Mehtab Bagh. Pick-up and drop from Delhi included.",
  },
  {
    id: "d3",
    title: "Goa Beach Getaway",
    destination: "Goa",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80",
    duration: "3 Days / 2 Nights",
    price: 8500,
    category: "destination",
    tag: "Goa",
    description: "Explore the beaches, nightlife, and Portuguese heritage of Goa. Covers North and South Goa with taxi transfers.",
  },
  {
    id: "d4",
    title: "Jaipur Pink City Tour",
    destination: "Jaipur, Rajasthan",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=80",
    duration: "2 Days / 1 Night",
    price: 5000,
    category: "destination",
    tag: "Jaipur",
    description: "Discover the Pink City — Amber Fort, Hawa Mahal, City Palace, and local bazaars. A royal Rajasthani experience.",
  },

  // Tour by Theme
  {
    id: "t1",
    title: "Spiritual India Tour",
    destination: "Varanasi & Rishikesh",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&q=80",
    duration: "5 Days / 4 Nights",
    price: 12000,
    category: "theme",
    tag: "Spiritual",
    description: "A spiritual journey covering Varanasi ghats, Ganga Aarti, Rishikesh yoga ashrams, and temple visits.",
  },
  {
    id: "t2",
    title: "Heritage Rajasthan Circuit",
    destination: "Jaipur - Jodhpur - Udaipur",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
    duration: "6 Days / 5 Nights",
    price: 15000,
    category: "theme",
    tag: "Heritage",
    description: "Explore royal palaces, desert forts, and lakeside cities of Rajasthan. A perfect heritage and culture experience.",
  },
  {
    id: "t3",
    title: "Romantic Kerala Backwaters",
    destination: "Alleppey & Munnar",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
    duration: "4 Days / 3 Nights",
    price: 11000,
    category: "theme",
    tag: "Romantic",
    description: "Houseboat cruise on backwaters, tea plantation visits in Munnar, and candlelight dinners. Perfect for couples.",
  },
  {
    id: "t4",
    title: "Wildlife Safari Adventure",
    destination: "Jim Corbett & Ranthambore",
    image: "https://images.unsplash.com/photo-1535338454528-1b5cc8dd8e94?w=600&q=80",
    duration: "4 Days / 3 Nights",
    price: 13000,
    category: "theme",
    tag: "Wildlife",
    description: "Spot tigers, elephants, and exotic birds in India's top national parks. Includes safari jeep rides and nature walks.",
  },

  // Tour by Activity
  {
    id: "a1",
    title: "Manali Adventure Sports",
    destination: "Manali, Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80",
    duration: "3 Days / 2 Nights",
    price: 7500,
    category: "activity",
    tag: "Adventure",
    description: "Paragliding, river rafting, zip-lining, and trekking in the stunning valleys of Manali. An adrenaline-packed trip.",
  },
  {
    id: "a2",
    title: "Rishikesh Rafting & Camping",
    destination: "Rishikesh, Uttarakhand",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80",
    duration: "2 Days / 1 Night",
    price: 4000,
    category: "activity",
    tag: "Rafting",
    description: "White-water rafting on the Ganges, riverside camping under the stars, and cliff jumping. Ultimate outdoor experience.",
  },
  {
    id: "a3",
    title: "Ladakh Bike Trip",
    destination: "Leh - Ladakh",
    image: "https://images.unsplash.com/photo-1609766857326-18cf83f66043?w=600&q=80",
    duration: "7 Days / 6 Nights",
    price: 22000,
    category: "activity",
    tag: "Biking",
    description: "Ride through Khardung La, Pangong Lake, and Nubra Valley. Includes bike rental, stays, and support vehicle.",
  },
  {
    id: "a4",
    title: "Coorg Coffee Trail Trek",
    destination: "Coorg, Karnataka",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80",
    duration: "2 Days / 1 Night",
    price: 5500,
    category: "activity",
    tag: "Trekking",
    description: "Trek through lush coffee plantations, waterfalls, and misty hills of Coorg. A nature lover's paradise.",
  },
];
