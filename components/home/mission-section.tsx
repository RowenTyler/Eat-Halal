import { CheckCircle, Shield, Users, Star } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Halal",
    description:
      "Every restaurant is verified through trusted halal certification bodies.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Real reviews from real people who share your values and dietary needs.",
  },
  {
    icon: Star,
    title: "Curated Selection",
    description:
      "Handpicked restaurants that meet our high standards for quality and authenticity.",
  },
  {
    icon: CheckCircle,
    title: "Trusted Platform",
    description:
      "Transparent verification process with regular audits and updates.",
  },
];

export function MissionSection() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <h2 className="text-3xl font-bold md:text-4xl">
            Our Mission
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/80">
            We&apos;re on a mission to make finding halal food easy and reliable.
            Our platform connects you with verified halal restaurants, ensuring
            you can dine with confidence.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-lg bg-primary-foreground/10"
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-primary-foreground/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
