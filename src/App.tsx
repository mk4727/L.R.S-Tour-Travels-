import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import CarDetails from "./pages/CarDetails";
import BookRide from "./pages/BookRide";
import BookTour from "./pages/BookTour";
import TourPackages from "./pages/TourPackages";
import CategoryPage from "./pages/CategoryPage";
import Admin from "./pages/Admin";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import BookHotel from "./pages/BookHotel";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/book" element={<BookRide />} />
          <Route path="/book-tour" element={<BookTour />} />
          <Route path="/tours" element={<TourPackages />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/book-hotel" element={<BookHotel />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
