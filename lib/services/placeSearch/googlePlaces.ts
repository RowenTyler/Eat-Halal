import { GOOGLE_MAPS_SERVER_KEY } from '@/lib/config'
import { PlaceSearchResult } from './types'

function parseAddressComponents(components: any[] = []) {
  const find = (type: string) => components.find((item) => item.types?.includes(type))?.long_name || ''

  const city =
    find('locality') ||
    find('sublocality') ||
    find('administrative_area_level_2') ||
    find('postal_town') ||
    ''

  return {
    city,
    province: find('administrative_area_level_1') || '',
    postal_code: find('postal_code') || '',
  }
}

export async function searchGooglePlaces(query: string): Promise<PlaceSearchResult[]> {
  if (!GOOGLE_MAPS_SERVER_KEY || !query.trim()) {
    return []
  }

  const searchUrl = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
  searchUrl.searchParams.set('query', query)
  searchUrl.searchParams.set('key', GOOGLE_MAPS_SERVER_KEY)

  const searchResponse = await fetch(searchUrl.toString())
  if (!searchResponse.ok) {
    return []
  }

  const searchData = await searchResponse.json()
  const candidates = Array.isArray(searchData.results) ? searchData.results.slice(0, 4) : []

  const detailPromises = candidates.map(async (result: any) => {
    if (!result.place_id) {
      return null
    }

    const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
    detailsUrl.searchParams.set('place_id', result.place_id)
    detailsUrl.searchParams.set('fields', [
      'name',
      'formatted_address',
      'address_components',
      'formatted_phone_number',
      'website',
      'photos',
    ].join(','))
    detailsUrl.searchParams.set('key', GOOGLE_MAPS_SERVER_KEY)

    const detailsResponse = await fetch(detailsUrl.toString())
    if (!detailsResponse.ok) {
      return null
    }

    const detailsData = await detailsResponse.json()
    const place = detailsData.result
    if (!place) {
      return null
    }

    const parsed = parseAddressComponents(place.address_components)
    const imageUrl = place.photos?.[0]?.getUrl?.({ maxWidth: 400 }) ||
      (place.photos?.[0]?.photo_reference
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_MAPS_SERVER_KEY}`
        : undefined)

    return {
      name: place.name || result.name || '',
      address: place.formatted_address || result.formatted_address || '',
      city: parsed.city,
      province: parsed.province,
      postal_code: parsed.postal_code,
      phone: place.formatted_phone_number || undefined,
      website: place.website || undefined,
      imageUrl: imageUrl || undefined,
      source: 'google_places',
      provider_place_id: result.place_id,
    } as PlaceSearchResult
  })

  const results = await Promise.all(detailPromises)
  return results.filter((item): item is PlaceSearchResult => Boolean(item))
}
