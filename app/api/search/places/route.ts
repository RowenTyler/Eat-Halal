import { NextRequest, NextResponse } from 'next/server'
import { searchPlaces } from '@/lib/services/placeSearch/client'

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() || ''
  const country = request.nextUrl.searchParams.get('country') || undefined

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await searchPlaces(query, { country })
    return NextResponse.json({ results })
  } catch (error) {
    return NextResponse.json({ results: [], error: 'Search failed' }, { status: 500 })
  }
}
