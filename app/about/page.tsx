import Image from "next/image";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Heart, Globe } from "lucide-react";

const stats = [
  { value: "2,500+", label: "Restaurants Listed" },
  { value: "50,000+", label: "Monthly Users" },
  { value: "25,000+", label: "Reviews Written" },
  { value: "100+", label: "Cities Covered" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Verification",
    description:
      "We work with recognized halal certification bodies to ensure every listed restaurant meets authentic halal standards.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Our platform is built by and for the Muslim community, ensuring reviews and recommendations come from people who share your values.",
  },
  {
    icon: Heart,
    title: "Quality Experience",
    description:
      "We&apos;re passionate about food and committed to helping you discover amazing halal dining experiences.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Whether you&apos;re at home or traveling, find trusted halal restaurants wherever you are in the world.",
  },
];

const team = [
  {
    name: "Yusuf Ahmed",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    name: "Amina Khan",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    name: "Omar Hassan",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  },
  {
    name: "Fatima Ali",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold md:text-5xl">
                Making Halal Dining{" "}
                <span className="text-primary">Accessible</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Eat Halal was founded with a simple mission: to help Muslims
                around the world find verified halal restaurants with confidence.
                We believe everyone deserves to enjoy great food without
                compromising their values.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y bg-muted/50">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-4xl font-bold text-primary">{stat.value}</p>
                  <p className="text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold">Our Story</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    It started with a simple frustration. As Muslims living in
                    diverse cities, we often struggled to find restaurants we
                    could trust. Which places were truly halal? Were they
                    certified? Were other Muslims happy with their experiences?
                  </p>
                  <p>
                    In 2023, we set out to solve this problem. We built Eat Halal
                    as a platform where the Muslim community could come together
                    to share, discover, and celebrate halal dining.
                  </p>
                  <p>
                    Today, we&apos;re proud to serve thousands of users who rely on
                    Eat Halal to make dining decisions. But we&apos;re just getting
                    started. Our vision is to become the most trusted name in
                    halal restaurant discovery worldwide.
                  </p>
                </div>
              </div>
              <div className="relative aspect-square lg:aspect-auto lg:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop"
                  alt="Restaurant interior"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Values</h2>
              <p className="text-muted-foreground mt-2">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <Card key={value.title}>
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{value.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Meet Our Team</h2>
              <p className="text-muted-foreground mt-2">
                The passionate people behind Eat Halal
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold mt-4">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
