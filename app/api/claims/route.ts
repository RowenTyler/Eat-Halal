import { NextResponse } from "next/server";

const pendingClaims = [
  {
    id: "c_001",
    restaurantId: "r_001",
    restaurantName: "Bismillah Restaurant",
    claimant: "Ahmed Hassan",
    submittedAt: "2025-01-15",
    status: "pending",
  },
  {
    id: "c_002",
    restaurantId: "r_002",
    restaurantName: "Bo-Kaap Kitchen",
    claimant: "Sara Ali",
    submittedAt: "2025-01-12",
    status: "pending",
  },
];

export async function GET() {
  return NextResponse.json(pendingClaims);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newClaim = {
    id: `c_${Date.now()}`,
    restaurantId: body.restaurantId,
    restaurantName: body.restaurantName,
    claimant: body.contactName,
    submittedAt: new Date().toISOString().split("T")[0],
    status: "pending",
  };

  return NextResponse.json({ success: true, claim: newClaim }, { status: 201 });
}
