export interface PlaceSearchResult {
  name: string
  address: string
  city: string
  province: string
  postal_code: string
  phone?: string
  website?: string
  imageUrl?: string
  lat?: number
  lon?: number
  source?: string
  provider_place_id?: string
}

export interface PlaceSearchOptions {
  country?: string
}
