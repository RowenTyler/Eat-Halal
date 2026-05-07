"use client";

import Link from "next/link";
import { 
  Beef, 
  UtensilsCrossed, 
  Pizza, 
  Salad, 
  Coffee, 
  Flame,
  Globe,
  Soup
} from "lucide-react";

const filters = [
  { icon: Beef, label: "Indian", href: "/restaurants?cuisine=indian" },
  { icon: UtensilsCrossed, label: "Pakistani", href: "/restaurants?cuisine=pakistani" },
  { icon: Globe, label: "Middle Eastern", href: "/restaurants?cuisine=middle-eastern" },
  { icon: Soup, label: "Turkish", href: "/restaurants?cuisine=turkish" },
  { icon: Pizza, label: "Burgers", href: "/restaurants?cuisine=burgers" },
  { icon: Salad, label: "Mediterranean", href: "/restaurants?cuisine=mediterranean" },
  { icon: Coffee, label: "Cafes", href: "/restaurants?cuisine=cafe" },
  { icon: Flame, label: "BBQ", href: "/restaurants?cuisine=bbq" },
];

export function QuickFilters() {
  return (
    <section className="py-8 border-b">
      <div className="container">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((filter) => (
            <Link
              key={filter.label}
              href={filter.href}
              className="flex flex-col items-center gap-2 min-w-[80px] p-3 rounded-lg hover:bg-muted transition-colors group"
            >
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <filter.icon className="h-5 w-5 text-primary" />
              </div>
              <span className="text-sm font-medium whitespace-nowrap">
                {filter.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
