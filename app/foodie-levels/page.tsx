import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Star, CheckCircle } from "lucide-react";
import { foodieLevels } from "@/lib/mock-data";

const levelBenefits = {
  "Bronze Foodie": ["Write reviews", "Save favorites", "Join the community"],
  "Silver Foodie": [
    "All Bronze benefits",
    "Profile badge",
    "Early access to new features",
  ],
  "Gold Foodie": [
    "All Silver benefits",
    "Priority support",
    "Exclusive deals",
    "Featured reviewer status",
  ],
  "Platinum Foodie": [
    "All Gold benefits",
    "VIP restaurant access",
    "Free Pro subscription",
    "Invite to food events",
  ],
  "Diamond Foodie": [
    "All Platinum benefits",
    "Advisory board member",
    "Partner restaurant discounts",
    "Custom profile features",
  ],
};

export default function FoodieLevelsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold md:text-5xl">Foodie Levels</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Level up by writing reviews and unlock exclusive benefits. The
                more you contribute, the more rewards you earn!
              </p>
            </div>
          </div>
        </section>

        {/* Levels Grid */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {foodieLevels.map((level, index) => (
                <Card
                  key={level.name}
                  className={`relative overflow-hidden ${
                    index === foodieLevels.length - 1
                      ? "border-primary shadow-lg"
                      : ""
                  }`}
                >
                  {index === foodieLevels.length - 1 && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />
                  )}
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 rounded-full ${level.color} mx-auto flex items-center justify-center mb-4`}
                    >
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-center">
                      {level.name}
                    </h3>
                    <p className="text-center text-sm text-muted-foreground mt-1">
                      {level.minReviews === 0
                        ? "Starting level"
                        : `${level.minReviews}+ reviews`}
                    </p>

                    <div className="mt-6 space-y-2">
                      {levelBenefits[level.name as keyof typeof levelBenefits]?.map(
                        (benefit) => (
                          <div
                            key={benefit}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">How It Works</h2>
              <p className="text-muted-foreground mt-2">
                Simple steps to climb the foodie ladder
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mt-4">Write Reviews</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Share your dining experiences with detailed, helpful reviews
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mt-4">Earn Points</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Each review earns you points towards the next level
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mt-4">Unlock Benefits</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Reach new levels and enjoy exclusive perks and rewards
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Current Level CTA */}
        <section className="py-12 md:py-16">
          <div className="container">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8 text-center">
                <Badge className="mb-4">Your Current Level</Badge>
                <div className="w-20 h-20 rounded-full bg-yellow-500 mx-auto flex items-center justify-center mb-4">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Gold Foodie</h3>
                <p className="text-muted-foreground mt-2">
                  You&apos;ve written 47 reviews. Just 3 more to reach Platinum!
                </p>
                <div className="w-full bg-muted rounded-full h-3 mt-6">
                  <div
                    className="bg-primary h-3 rounded-full"
                    style={{ width: "88%" }}
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  47 / 50 reviews to Platinum
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
