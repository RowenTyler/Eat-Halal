import { SERPAPI_KEY } from '@/lib/config'
import { PlaceSearchResult } from './types'

/**
 * Search using SerpApi Google Maps
 * Fallback provider - scrapes Google Maps results
 * Limited by API quota, use sparingly
 */
export async function searchSerpapiPlaces(query: string): Promise<PlaceSearchResult[]> {
  if (!SERPAPI_KEY || !query.trim()) {
    return []
  }

  const url = new URL('https://serpapi.com/search')
  url.searchParams.set('engine', 'google_maps')
  url.searchParams.set('q', query)
  url.searchParams.set('api_key', SERPAPI_KEY)
  url.searchParams.set('type', 'search')

  const response = await fetch(url.toString())
  if (!response.ok) {
    return []
  }

  const data = await response.json()
  const placeResults = Array.isArray(data.place_results) ? data.place_results : []

  return placeResults.slice(0, 5).map((item: any) => {
    const gps = item.gps_coordinates || {}
    const address = item.address || item.snippet || ''
    
    return {
      name: item.title || item.name || '',
      address,
      city: item.locality || item.city || '',
      province: item.region || item.state || '',
      postal_code: item.postal_code || '',
      phone: item.phone || item.phone_number || undefined,
      website: item.website || item.website_link || undefined,
      imageUrl: item.thumbnail || item.image || undefined,
      lat: gps.latitude,
      lon: gps.longitude,
      source: 'serpapi',
      provider_place_id: item.data_id || item.data_cid || undefined,
    } as PlaceSearchResult
  })
}
