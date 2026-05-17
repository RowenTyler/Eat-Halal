import { GEOAPIFY_KEY, SERPAPI_KEY } from '@/lib/config'

export interface EnrichmentResult {
  phone?: string
  website?: string
  imageUrl?: string
}

/**
 * Enrich place data with phone and website using Geoapify and SerpApi
 * Geoapify is primary (paid but comprehensive)
 * SerpApi is fallback for missing data
 */
export async function enrichPlaceData(
  name: string,
  lat: number,
  lon: number
): Promise<EnrichmentResult> {
  const result: EnrichmentResult = {}

  // Try Geoapify first
  if (GEOAPIFY_KEY) {
    const geoapifyData = await enrichWithGeoapify(name, lat, lon)
    if (geoapifyData.phone) result.phone = geoapifyData.phone
    if (geoapifyData.website) result.website = geoapifyData.website
    if (geoapifyData.imageUrl) result.imageUrl = geoapifyData.imageUrl
  }

  // If missing data, try SerpApi fallback
  if ((!result.phone || !result.website) && SERPAPI_KEY) {
    const serpapiData = await enrichWithSerpapi(name)
    if (!result.phone && serpapiData.phone) result.phone = serpapiData.phone
    if (!result.website && serpapiData.website) result.website = serpapiData.website
  }

  return result
}

/**
 * Enrich using Geoapify Places API
 * Search for restaurants near coordinates
 */
async function enrichWithGeoapify(name: string, lat: number, lon: number): Promise<EnrichmentResult> {
  try {
    const url = new URL('https://api.geoapify.com/v2/places')
    url.searchParams.set('categories', 'catering.restaurant')
    url.searchParams.set('filter', `circle:${lon},${lat},200`)
    url.searchParams.set('limit', '5')
    url.searchParams.set('apiKey', GEOAPIFY_KEY || '')

    const response = await fetch(url.toString())
    if (!response.ok) return {}

    const data = await response.json()
    const features = Array.isArray(data.features) ? data.features : []

    // Find matching restaurant by name similarity
    const matching = features.find((f: any) => {
      const featureName = f.properties?.name || ''
      return featureName.toLowerCase().includes(name.toLowerCase()) ||
             name.toLowerCase().includes(featureName.toLowerCase())
    })

    if (matching) {
      const props = matching.properties || {}
      return {
        phone: props.phone || props.contact?.phone,
        website: props.website || props.contact?.website,
        imageUrl: props.image,
      }
    }

    // If no match by name, use first result (usually closest)
    if (features.length > 0) {
      const first = features[0].properties || {}
      return {
        phone: first.phone || first.contact?.phone,
        website: first.website || first.contact?.website,
        imageUrl: first.image,
      }
    }

    return {}
  } catch (error) {
    console.error('Geoapify enrichment failed:', error)
    return {}
  }
}

/**
 * Enrich using SerpApi Google Maps search
 * Used as fallback to get phone/website
 */
async function enrichWithSerpapi(name: string): Promise<EnrichmentResult> {
  try {
    const url = new URL('https://serpapi.com/search')
    url.searchParams.set('engine', 'google_maps')
    url.searchParams.set('q', name)
    url.searchParams.set('api_key', SERPAPI_KEY || '')
    url.searchParams.set('type', 'search')

    const response = await fetch(url.toString())
    if (!response.ok) return {}

    const data = await response.json()
    const placeResults = Array.isArray(data.place_results) ? data.place_results : []

    if (placeResults.length > 0) {
      const place = placeResults[0]
      return {
        phone: place.phone || place.phone_number,
        website: place.website || place.website_link,
      }
    }

    return {}
  } catch (error) {
    console.error('SerpApi enrichment failed:', error)
    return {}
  }
}
