import { NextResponse } from "next/server";
import { mockRestaurants } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockRestaurants);
}
