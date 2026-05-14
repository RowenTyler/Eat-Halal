import { NextResponse } from "next/server";
import { mockUsers } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockUsers);
}
