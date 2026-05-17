import { DEFAULT_PLACE_SEARCH_COUNTRY } from '@/lib/config'
import { PlaceSearchOptions, PlaceSearchResult } from './types'
import { searchGeoapifyPlaces } from './geoapify'
import { searchNominatimPlaces } from './nominatim'
import { searchSerpapiPlaces } from './serpapi'
import { enrichPlaceData } from './enrichment'

function normalizeResultKey(result: PlaceSearchResult) {
  return `${result.name?.toLowerCase()}:${result.address?.toLowerCase()}`
}

/**
 * Search for places using multiple providers
 * Priority: Nominatim (OSM) → Geoapify → SerpApi
 * Nominatim is free and returns good results for restaurants
 * Geoapify adds enrichment data (phone, website)
 * SerpApi is fallback for additional results or enrichment
 */
export async function searchPlaces(query: string, options?: PlaceSearchOptions): Promise<PlaceSearchResult[]> {
  if (!query.trim()) {
    return []
  }

  const country = options?.country || DEFAULT_PLACE_SEARCH_COUNTRY
  const results: PlaceSearchResult[] = []
  const seen = new Set<string>()

  const addResults = (items: PlaceSearchResult[]) => {
    items.forEach((item) => {
      const key = normalizeResultKey(item)
      if (key && !seen.has(key)) {
        seen.add(key)
        results.push(item)
      }
    })
  }

  // Primary: Nominatim (free, reliable for restaurant searches)
  const nominatimResults = await searchNominatimPlaces(query, country)
  addResults(nominatimResults)

  // Secondary: Geoapify (paid but good enrichment)
  if (results.length < 5) {
    const geoapifyResults = await searchGeoapifyPlaces(query, country)
    addResults(geoapifyResults)
  }

  // Fallback: SerpApi (Google Maps scraping)
  if (results.length < 5) {
    const serpapiResults = await searchSerpapiPlaces(query)
    addResults(serpapiResults)
  }

  return results.slice(0, 5)
}

/**
 * Enrich a place with additional data (phone, website, etc.)
 * Called after user selects a place from search results
 */
export async function enrichPlace(place: PlaceSearchResult): Promise<PlaceSearchResult> {
  if (!place.lat || !place.lon) {
    return place
  }

  const enrichedData = await enrichPlaceData(place.name, place.lat, place.lon)

  return {
    ...place,
    phone: place.phone || enrichedData.phone,
    website: place.website || enrichedData.website,
    imageUrl: place.imageUrl || enrichedData.imageUrl,
  }
}
