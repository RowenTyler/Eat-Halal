'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Search } from 'lucide-react'
import { searchPlaces, enrichPlace } from '@/lib/services/placeSearch/client'
import { PlaceSearchResult } from '@/lib/services/placeSearch/types'

export interface GooglePlaceResult {
  name: string
  address: string
  city: string
  province: string
  postal_code: string
  phone?: string
  website?: string
  imageUrl?: string
}

interface GooglePlacesSearchProps {
  onPlaceSelect: (place: GooglePlaceResult) => void
  onManualEntry?: () => void
}

/**
 * Multi-provider place search component
 * Uses Nominatim (OSM) for search, Geoapify for enrichment, SerpApi as fallback
 * Replaces Google Places API with open/affordable alternatives
 */
export default function GooglePlacesSearch({ onPlaceSelect, onManualEntry }: GooglePlacesSearchProps) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<PlaceSearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [enriching, setEnriching] = useState(false)

  // Debounced search effect
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([])
      setError(null)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const results = await searchPlaces(query)
        setSearchResults(results)
        if (results.length === 0) {
          setError(null) // Don't show error for no results, let user try manual entry
        }
      } catch (err) {
        console.error('Search failed:', err)
        setError('Search failed. You can fill the details manually.')
        setSearchResults([])
      } finally {
        setLoading(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [query])

  const handleSelectResult = async (result: PlaceSearchResult) => {
    setEnriching(true)
    try {
      // Enrich with phone, website, images
      const enrichedResult = await enrichPlace(result)

      onPlaceSelect({
        name: enrichedResult.name,
        address: enrichedResult.address,
        city: enrichedResult.city,
        province: enrichedResult.province,
        postal_code: enrichedResult.postal_code,
        phone: enrichedResult.phone,
        website: enrichedResult.website,
        imageUrl: enrichedResult.imageUrl,
      })

      setSearchResults([])
      setQuery(enrichedResult.name)
      setError(null)
    } catch (err) {
      console.error('Enrichment failed:', err)
      // Still select even if enrichment fails
      onPlaceSelect({
        name: result.name,
        address: result.address,
        city: result.city,
        province: result.province,
        postal_code: result.postal_code,
        phone: result.phone,
        website: result.website,
        imageUrl: result.imageUrl,
      })
      setSearchResults([])
      setQuery(result.name)
    } finally {
      setEnriching(false)
    }
  }

  const hasSearch = query.trim().length > 0
  const results = searchResults.slice(0, 5)
  const isSearching = loading || enriching

  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto] items-end">
        <div className="space-y-2">
          <Label htmlFor="place-search">Search for restaurant</Label>
          <div className="relative">
            <Input
              id="place-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Start typing restaurant name or address"
              autoComplete="off"
              disabled={isSearching}
            />
            {isSearching ? (
              <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
            ) : (
              <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            )}
          </div>
        </div>

        <Button type="button" variant="outline" onClick={onManualEntry}>
          Add manually
        </Button>
      </div>

      {error ? (
        <div className="rounded-md border border-destructive/20 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      {hasSearch && results.length > 0 ? (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          {results.map((result, idx) => (
            <button
              key={`${result.source}-${result.provider_place_id}-${idx}`}
              type="button"
              onClick={() => handleSelectResult(result)}
              disabled={isSearching}
              className="w-full text-left rounded-md px-3 py-2 text-sm transition hover:bg-accent/80 disabled:opacity-50"
            >
              <div className="font-medium text-gray-900">{result.name}</div>
              <div className="text-xs text-muted-foreground">
                {[result.address, result.city].filter(Boolean).join(', ')}
              </div>
            </button>
          ))}
        </div>
      ) : hasSearch && !loading ? (
        <div className="rounded-md border border-border bg-muted/70 px-3 py-2 text-sm text-muted-foreground">
          No restaurants found. You can fill the details manually.
        </div>
      ) : null}

      <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
        Tip: Search for the restaurant by name. We'll auto-fill address, city, province, phone and website when available from multiple sources.
      </div>
    </div>
  )
}
