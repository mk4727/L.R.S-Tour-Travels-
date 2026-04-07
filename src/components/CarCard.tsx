import { Link } from "react-router-dom";
import { Users, Fuel, IndianRupee } from "lucide-react";
import type { Car } from "@/data/cars";

const CarCard = ({ car }: { car: Car }) => {
  return (
    <div className="group rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5">
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <span className="px-4 py-1 rounded-full bg-destructive text-destructive-foreground text-sm font-semibold">
              Booked
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-secondary/80 backdrop-blur text-xs font-medium text-secondary-foreground">
          {car.type}
        </span>
      </div>

      <div className="p-5 space-y-4">
        <h3 className="text-lg font-display font-semibold text-foreground">{car.name}</h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {car.seats} seats</span>
          <span className="flex items-center gap-1"><Fuel className="h-4 w-4" /> {car.fuelType}</span>
        </div>

        <div className="flex items-center justify-between">
          {/* <div className="flex items-center gap-1 text-primary font-bold text-lg">
            <IndianRupee className="h-4 w-4" />
            {car.pricePerKm}<span className="text-sm text-muted-foreground font-normal">/km</span>
          </div> */}

          {car.available ? (
            <Link
              to={`/car/${car.id}`}
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition"
            >
              View Details
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-lg bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarCard;
