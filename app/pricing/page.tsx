import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, HelpCircle } from "lucide-react";
import { pricingTiers } from "@/lib/mock-data";

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
  },
  {
    question: "Is there a free trial for Pro?",
    answer:
      "Yes! We offer a 14-day free trial for the Pro plan. No credit card required to start.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 30-day money-back guarantee for all paid plans. If you&apos;re not satisfied, contact us for a full refund.",
  },
  {
    question: "What&apos;s included in the Business plan?",
    answer:
      "The Business plan includes everything for restaurant owners: claiming listings, responding to reviews, analytics, menu management, and priority support.",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <Badge variant="secondary" className="mb-4">
                Simple, Transparent Pricing
              </Badge>
              <h1 className="text-4xl font-bold md:text-5xl">
                Choose the Perfect Plan
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Whether you&apos;re a food lover or a restaurant owner, we have a
                plan that fits your needs. Start free and upgrade anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card
                  key={tier.id}
                  className={`relative ${
                    tier.popular ? "border-primary shadow-lg scale-105" : ""
                  }`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-2">
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-center py-6">
                      <span className="text-4xl font-bold">
                        {tier.price === 0 ? "Free" : `£${tier.price}`}
                      </span>
                      {tier.price > 0 && (
                        <span className="text-muted-foreground">/month</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-6">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full"
                      variant={tier.popular ? "default" : "outline"}
                      asChild
                    >
                      <Link
                        href={
                          tier.id === "business"
                            ? "/contact"
                            : "/auth?tab=signup"
                        }
                      >
                        {tier.cta}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Comparison */}
        <section className="py-12 md:py-16 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Compare Plans</h2>
              <p className="text-muted-foreground mt-2">
                See what&apos;s included in each plan
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full max-w-4xl mx-auto">
                <thead>
                  <tr className="border-b">
                    <th className="py-4 px-6 text-left font-semibold">Feature</th>
                    <th className="py-4 px-6 text-center font-semibold">Free</th>
                    <th className="py-4 px-6 text-center font-semibold">Pro</th>
                    <th className="py-4 px-6 text-center font-semibold">Business</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-4 px-6">Browse Restaurants</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6">Write Reviews</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6">Save Favorites</td>
                    <td className="py-4 px-6 text-center">5 max</td>
                    <td className="py-4 px-6 text-center">Unlimited</td>
                    <td className="py-4 px-6 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6">Advanced Filters</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6">Ad-Free Experience</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6">Claim Restaurant</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6">Analytics Dashboard</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-4 px-6">Priority Support</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-center text-muted-foreground">-</td>
                    <td className="py-4 px-6 text-center">
                      <Check className="h-5 w-5 text-primary mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mt-2">
                Have questions? We&apos;ve got answers.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-3">
                      <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground">
                Still have questions?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact our team
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
