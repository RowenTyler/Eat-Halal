import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, TrendingUp, MessageSquare, BarChart3 } from "lucide-react";

const benefits = [
  { icon: Store, text: "Claim your restaurant listing" },
  { icon: MessageSquare, text: "Respond to customer reviews" },
  { icon: BarChart3, text: "Access analytics dashboard" },
  { icon: TrendingUp, text: "Grow your business" },
];

export function RestaurantCTA() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              {/* Content */}
              <div className="p-8 md:p-12">
                <h2 className="text-2xl font-bold md:text-3xl">
                  Own a Halal Restaurant?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Join thousands of restaurant owners who use Eat Halal to reach
                  more customers and grow their business.
                </p>

                <ul className="mt-6 space-y-3">
                  {benefits.map((benefit) => (
                    <li
                      key={benefit.text}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="p-1.5 rounded-full bg-primary/10">
                        <benefit.icon className="h-4 w-4 text-primary" />
                      </div>
                      {benefit.text}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg">
                    <Link href="/claim-restaurant-search">
                      Claim Your Restaurant
                    </Link>
                  </Button>
                  <Button variant="outline" asChild size="lg">
                    <Link href="/add-restaurant">Add New Restaurant</Link>
                  </Button>
                </div>
              </div>

              {/* Image/Pattern Side */}
              <div className="relative hidden md:block bg-gradient-to-br from-primary/20 to-accent/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-6xl font-bold text-primary/20">
                      2,500+
                    </div>
                    <div className="text-lg text-muted-foreground mt-2">
                      Restaurants Listed
                    </div>
                    <div className="text-4xl font-bold text-primary/20 mt-8">
                      50,000+
                    </div>
                    <div className="text-lg text-muted-foreground mt-2">
                      Monthly Visitors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
