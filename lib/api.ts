export async function fetcher<T>(path: string): Promise<T> {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return response.json();
}

export function getRestaurants() {
  return fetcher("/api/restaurants");
}

export function getReviews() {
  return fetcher("/api/reviews");
}

export function getMenuItems() {
  return fetcher("/api/menu-items");
}

export function getUsers() {
  return fetcher("/api/users");
}

export function getClaims() {
  return fetcher("/api/claims");
}

export async function submitClaim(payload: {
  restaurantId: string;
  restaurantName: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  reason: string;
}) {
  const response = await fetch("/api/claims", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit claim");
  }

  return response.json();
}

export async function submitContact(payload: { name: string; email: string; message: string }) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to submit message");
  }

  return response.json();
}
