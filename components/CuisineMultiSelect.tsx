'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { X, Search } from 'lucide-react'
import { cuisineTypes } from '@/lib/mock-data'

interface CuisineMultiSelectProps {
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  options?: string[]
}

export default function CuisineMultiSelect({
  value,
  onChange,
  placeholder = 'Select cuisine types...',
  options = cuisineTypes,
}: CuisineMultiSelectProps) {
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [options, search]
  )

  const toggleCuisine = (name: string) => {
    if (value.includes(name)) {
      onChange(value.filter((item) => item !== name))
      return
    }
    onChange([...value, name])
  }

  const clearAll = () => onChange([])

  return (
    <div className="space-y-2">
      <Label htmlFor="cuisine-search">Cuisine Types</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="h-auto min-h-[3rem] w-full justify-between px-3 py-2 text-left">
            <div className="flex flex-wrap gap-2">
              {value.length > 0 ? (
                value.slice(0, 4).map((cuisine) => (
                  <Badge key={cuisine} variant="secondary" className="rounded-full px-2 py-0.5">
                    {cuisine}
                  </Badge>
                ))
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
              {value.length > 4 ? <span className="text-sm text-muted-foreground">+{value.length - 4} more</span> : null}
            </div>
            <span className="text-xs text-muted-foreground">Click to choose</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full max-w-lg">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                id="cuisine-search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search cuisine types"
              />
              {value.length > 0 ? (
                <Button type="button" variant="ghost" className="h-9 px-2" onClick={clearAll}>
                  <X className="h-4 w-4" />
                </Button>
              ) : null}
            </div>

            <div className="max-h-64 overflow-y-auto rounded-md border border-border bg-background p-2">
              {filteredOptions.length === 0 ? (
                <div className="p-4 text-sm text-muted-foreground">No cuisines match your search.</div>
              ) : (
                filteredOptions.map((option) => {
                  const checked = value.includes(option)
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleCuisine(option)}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left transition hover:bg-accent/70"
                    >
                      <span>{option}</span>
                      <Checkbox checked={checked} className="pointer-events-none" />
                    </button>
                  )
                })
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {value.map((selected) => (
                <Badge key={selected} variant="outline" className="rounded-full px-2 py-0.5">
                  {selected}
                </Badge>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
