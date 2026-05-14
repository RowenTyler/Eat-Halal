import { NextResponse } from "next/server";
import { mockMenuItems } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(mockMenuItems);
}
