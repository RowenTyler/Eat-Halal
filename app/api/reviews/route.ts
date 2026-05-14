import { NextResponse } from "next/server";
import { mockReviews } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockReviews);
}
