"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { mockRestaurants } from "@/lib/mock-data";

export default function ClaimRestaurantPage({ params }: { params: { id: string } }) {
  const restaurant = mockRestaurants.find((item) => item.id === params.id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <Card className="max-w-xl w-full">
            <CardContent className="text-center">
              <CardTitle>Restaurant not found</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                We couldn't find the restaurant you are trying to claim.
              </CardDescription>
              <Button asChild className="mt-6">
                <Link href="/restaurants">Browse Restaurants</Link>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/claims", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
          contactName: name,
          contactEmail: email,
          contactPhone: phone,
          reason: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to submit claim. Please try again.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Submission failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <section className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-primary uppercase tracking-[0.3em]">Claim Restaurant</p>
              <h1 className="text-3xl font-bold">Claim {restaurant.name}</h1>
              <p className="text-muted-foreground">
                Submit your ownership claim so we can verify your affiliation and give you management access.
              </p>
            </div>

            <Card>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Restaurant details</h2>
                  <p className="text-muted-foreground">{restaurant.address}, {restaurant.city}, {restaurant.province}</p>
                  {restaurant.phone && <p className="text-sm">Phone: {restaurant.phone}</p>}
                  {restaurant.website && (
                    <p className="text-sm">
                      Website: <a className="text-primary underline" href={restaurant.website} target="_blank" rel="noreferrer">{restaurant.website}</a>
                    </p>
                  )}
                  <Badge variant="secondary">Halal Verified</Badge>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="name">Your full name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="e.g. +27 82 123 4567"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Claim details</Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                      placeholder="Explain your relationship to the restaurant and any supporting details."
                      required
                      rows={6}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={status === "submitting"}>
                    {status === "submitting" ? "Submitting..." : "Submit Claim"}
                  </Button>

                  {status === "success" && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                      Your claim has been submitted successfully. We will review it and contact you by email.
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Preparation checklist</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>Before claiming, make sure you have:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Proof of ownership or management rights</li>
                  <li>Certification documents or registration details</li>
                  <li>Valid contact information</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-primary/40 bg-primary/5">
              <CardHeader>
                <CardTitle>Need help?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                <p>If you need assistance submitting your claim, email our support team and include the restaurant name and your preferred contact details.</p>
                <Button variant="secondary" asChild>
                  <Link href="/contact">Contact support</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
