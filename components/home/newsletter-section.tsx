"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // TODO: Handle newsletter subscription
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-12 md:py-16 bg-muted/50">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-primary/10 mb-4">
            <Mail className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">
            Stay in the Loop
          </h2>
          <p className="mt-3 text-muted-foreground">
            Get weekly updates on new restaurants, exclusive deals, and halal
            food news delivered straight to your inbox.
          </p>

          {subscribed ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-primary">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Thanks for subscribing!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 sm:w-80"
                required
              />
              <Button type="submit" size="lg" className="h-12">
                Subscribe
              </Button>
            </form>
          )}

          <p className="mt-4 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
