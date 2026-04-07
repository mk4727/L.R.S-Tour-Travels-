export type CarCategory = "rental" | "luxury" | "tempo" | "airport";

export interface Car {
  id: string;
  name: string;
  type: string;
  seats: number;
  
  fuelType: string;
  ac: boolean;
  image: string;
  description: string;
  available: boolean;
  categories: CarCategory[];
}

export const cars: Car[] = [
  {
    id: "1",
    name: "Swift Dzire",
    type: "Sedan",
    seats: 4,
    
    fuelType: "Petrol",
    ac: true,
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=600&q=80",
    description: "A comfortable sedan perfect for city rides and short trips. Features spacious interiors with premium upholstery, excellent fuel efficiency, and a smooth ride experience.",
    available: true,
    categories: ["rental", "airport"],
  },
  {
    id: "2",
    name: "Toyota Innova",
    type: "SUV",
    seats: 7,
    
    fuelType: "Diesel",
    ac: true,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    description: "Spacious SUV ideal for family trips and group travel. Offers ample legroom, powerful diesel engine, and captain seats for a premium travel experience.",
    available: true,
    categories: ["tempo", "rental"],
  },
  {
    id: "3",
    name: "Mercedes E-Class",
    type: "Luxury",
    seats: 4,
    
    fuelType: "Petrol",
    ac: true,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80",
    description: "Experience luxury travel with our premium Mercedes E-Class. Features leather interiors, ambient lighting, advanced climate control, and a whisper-quiet cabin.",
    available: true,
    categories: ["luxury", "airport"],
  },
  {
    id: "4",
    name: "Maruti Alto",
    type: "Hatchback",
    seats: 4,
    
    fuelType: "Petrol",
    ac: true,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80",
    description: "Budget-friendly hatchback for quick city commutes. Compact, easy to navigate through traffic, and the most affordable option for short-distance travel.",
    available: true,
    categories: ["airport", "rental"],
  },
  {
    id: "5",
    name: "Honda City",
    type: "Sedan",
    seats: 4,
    
    fuelType: "Petrol",
    ac: true,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80",
    description: "Premium sedan with sporty looks and refined interiors. Turbocharged engine, sunroof, and connected car features for a modern driving experience.",
    available: true,
    categories: ["rental", "luxury"],
  },
  {
    id: "6",
    name: "Mahindra XUV700",
    type: "SUV",
    seats: 7,
    
    fuelType: "Diesel",
    ac: true,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80",
    description: "Feature-rich SUV with advanced ADAS technology, panoramic sunroof, dual-zone climate control, and a powerful mStallion engine for highway cruising.",
    available: false,
    categories: ["luxury", "tempo"],
  },
];

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    text: "The taxi arrived on time and the driver was very professional. Highly recommended! The car was spotless and the ride was extremely comfortable.",
    rating: 5,
    avatar: "RS",
  },
  {
    id: "2",
    name: "Priya Patel",
    text: "Excellent service! I use this for my daily office commute and it has been consistently reliable. Fair pricing and courteous drivers every time.",
    rating: 5,
    avatar: "PP",
  },
  {
    id: "3",
    name: "Amit Kumar",
    text: "Booked the Innova for a family trip and it was perfect. Spacious, clean, and the driver knew all the best routes. Will definitely book again.",
    rating: 4,
    avatar: "AK",
  },
  {
    id: "4",
    name: "Sneha Reddy",
    text: "The luxury Mercedes experience was worth every penny. Perfect for my airport pickup. The booking process was seamless and hassle-free.",
    rating: 5,
    avatar: "SR",
  },
];
