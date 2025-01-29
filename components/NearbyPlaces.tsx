"use client"
import { useState, useEffect } from "react"
import { useGeolocation } from "@/hooks/useGeolocation"
import { searchNearbyPlaces, calculateDistance } from "@/services/overpassApi"
import BusinessCard from "@/components/BusinessCard"

export default function NearbyPlaces() {
  const { latitude, longitude, error } = useGeolocation()
  const [places, setPlaces] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPlaces = async () => {
      if (latitude && longitude) {
        const nearbyPlaces = await searchNearbyPlaces(latitude, longitude)
        const placesWithDistance = nearbyPlaces.map((place) => ({
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
  }, [latitude, longitude])

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (loading) {
    return <div className="text-center">Carregando locais próximos...</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {places.map((place) => (
        <BusinessCard
          key={place.id}
          business={{
            id: place.id.toString(),
            name: place.tags.name || "Local sem nome",
            image: `/placeholder.svg?height=300&width=400`,
            rating: 0, // A API do OpenStreetMap não fornece ratings
            category: place.tags.amenity || "Estabelecimento",
            distance: place.distance,
          }}
        />
      ))}
    </div>
  )
}

