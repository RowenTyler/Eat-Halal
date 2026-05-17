import { PlaceSearchResult } from './types'

/**
 * Search using Nominatim (OpenStreetMap)
 * Free, no API key required, good for restaurant searches
 * Results include basic location data but not phone/website (those come from enrichment)
 */
export async function searchNominatimPlaces(query: string, country?: string): Promise<PlaceSearchResult[]> {
  if (!query.trim()) {
    return []
  }

  const url = new URL('https://nominatim.openstreetmap.org/search')
  url.searchParams.set('format', 'json')
  url.searchParams.set('q', query)
  url.searchParams.set('addressdetails', '1')
  url.searchParams.set('limit', '5')
  if (country) {
    url.searchParams.set('countrycodes', country)
  }

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': 'Eat-Halal/1.0 (restaurant-finder)'
    }
  })

  if (!response.ok) {
    return []
  }

  const data = await response.json()
  const results = Array.isArray(data) ? data : []

  return results.map((item: any) => {
    const address = item.address || {}
    const city =
      address.city || address.town || address.village || address.hamlet || address.county || ''
    const province = address.state || address.region || ''
    
    return {
      name: address.restaurant || address.shop || address.cafe || item.display_name?.split(',')[0] || query,
      address: item.display_name || '',
      city,
      province,
      postal_code: address.postcode || '',
      phone: undefined,
      website: undefined,
      imageUrl: undefined,
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
      source: 'nominatim',
      provider_place_id: item.place_id?.toString(),
    } as PlaceSearchResult
  })
}
