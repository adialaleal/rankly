"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/Navbar"
import BusinessCard from "@/components/BusinessCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useGeolocation } from "@/hooks/useGeolocation"
import { searchNearbyPlaces, calculateDistance } from "@/services/overpassApi"

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)
  const { latitude, longitude, error: locationError } = useGeolocation()

  useEffect(() => {
    const fetchPlaces = async () => {
      if (latitude && longitude) {
        setLoading(true)
        const nearbyPlaces = await searchNearbyPlaces(latitude, longitude)
        const filteredPlaces = nearbyPlaces.filter((place) =>
          place.tags.name?.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        const placesWithDistance = filteredPlaces.map((place) => ({
          ...place,
          distance: calculateDistance(latitude, longitude, place.lat, place.lon),
        }))
        setPlaces(placesWithDistance)
        setLoading(false)
      }
    }

    if (latitude && longitude) {
      fetchPlaces()
    }
  }, [latitude, longitude, searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Re-fetch places with new search query
    if (latitude && longitude) {
      searchNearbyPlaces(latitude, longitude).then((nearbyPlaces) => {
        const filteredPlaces = nearbyPlaces.filter((place) =>
          place.tags.name?.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        const placesWithDistance = filteredPlaces.map((place) => ({
          ...place,
          distance: calculateDistance(latitude, longitude, place.lat, place.lon),
        }))
        setPlaces(placesWithDistance)
      })
    }
  }

  if (locationError) {
    return <div className="text-center text-red-500">{locationError}</div>
  }

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Resultados da busca para "{query}"</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Refinar busca..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Buscar</Button>
          </div>
        </form>
        {loading ? (
          <div className="text-center">Carregando resultados...</div>
        ) : places.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <BusinessCard
                key={place.id}
                business={{
                  id: place.id.toString(),
                  name: place.tags.name || "Local sem nome",
                  image: `/placeholder.svg?height=300&width=400`,
                  rating: 0,
                  category: place.tags.amenity || "Estabelecimento",
                  distance: place.distance,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">Nenhum resultado encontrado para "{searchQuery}"</div>
        )}
      </div>
    </main>
  )
}

