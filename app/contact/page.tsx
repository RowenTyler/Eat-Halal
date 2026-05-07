"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Clock, MessageSquare, Loader2 } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "hello@eathalal.com",
    href: "mailto:hello@eathalal.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+44 20 1234 5678",
    href: "tel:+442012345678",
  },
  {
    icon: MapPin,
    title: "Address",
    value: "123 Food Street, London, UK",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon-Fri: 9am - 6pm GMT",
  },
];

const topics = [
  { value: "general", label: "General Inquiry" },
  { value: "restaurant", label: "Restaurant Listing" },
  { value: "claim", label: "Claim a Restaurant" },
  { value: "report", label: "Report an Issue" },
  { value: "partnership", label: "Partnership Inquiry" },
  { value: "feedback", label: "Feedback" },
];

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Submit form
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold md:text-5xl">Get in Touch</h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Have a question, suggestion, or just want to say hello? We&apos;d
                love to hear from you. Our team is here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="grid gap-12 lg:grid-cols-3">
              {/* Contact Info */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <p className="text-muted-foreground mt-2">
                    Reach out to us through any of these channels
                  </p>
                </div>

                <div className="space-y-4">
                  {contactInfo.map((info) => (
                    <Card key={info.title}>
                      <CardContent className="p-4 flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <info.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{info.title}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-sm text-muted-foreground hover:text-primary"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* FAQ Link */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <MessageSquare className="h-8 w-8 text-primary" />
                    <h3 className="font-semibold mt-4">Check our FAQ</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Find quick answers to common questions
                    </p>
                    <Button variant="link" className="px-0 mt-2">
                      View FAQ &rarr;
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isSubmitted ? (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                          <Mail className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-semibold mt-4">
                          Message Sent!
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          Thank you for reaching out. We&apos;ll get back to you
                          within 24-48 hours.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-6"
                          onClick={() => setIsSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              placeholder="John"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" required />
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="you@example.com"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="topic">Topic</Label>
                            <Select required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a topic" />
                              </SelectTrigger>
                              <SelectContent>
                                {topics.map((topic) => (
                                  <SelectItem key={topic.value} value={topic.value}>
                                    {topic.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            placeholder="How can we help?"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us more about your inquiry..."
                            rows={6}
                            required
                          />
                        </div>

                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          )}
                          Send Message
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
