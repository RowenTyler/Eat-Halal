import { GEOAPIFY_KEY } from '@/lib/config'
import { PlaceSearchResult } from './types'

/**
 * Search using Geoapify Places API
 * Paid service with good enrichment data
 * Returns phone, website, and comprehensive place information
 */
export async function searchGeoapifyPlaces(query: string, country?: string): Promise<PlaceSearchResult[]> {
  if (!GEOAPIFY_KEY || !query.trim()) {
    return []
  }

  const url = new URL('https://api.geoapify.com/v2/places')
  url.searchParams.set('text', query)
  url.searchParams.set('apiKey', GEOAPIFY_KEY)
  url.searchParams.set('limit', '5')
  if (country) {
    url.searchParams.set('country', country)
  }

  const response = await fetch(url.toString())
  if (!response.ok) {
    return []
  }

  const data = await response.json()
  const features = Array.isArray(data.features) ? data.features : []

  return features.map((feature: any) => {
    const properties = feature.properties || {}
    const coords = feature.geometry?.coordinates || [0, 0]
    
    return {
      name: properties.name || properties.formatted || query,
      address: properties.formatted || '',
      city: properties.city || properties.county || properties.state || '',
      province: properties.state || '',
      postal_code: properties.postcode || '',
      phone: properties.phone || properties.tel || undefined,
      website: properties.website || undefined,
      imageUrl: properties.image || undefined,
      lat: coords[1],
      lon: coords[0],
      source: 'geoapify',
      provider_place_id: properties.place_id || properties.xid || undefined,
    } as PlaceSearchResult
  })
}
