import axios from "axios"

const GOOGLE_PLACES_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY

if (!GOOGLE_PLACES_API_KEY) {
  console.error("Google Places API Key não encontrada")
}

interface Place {
  id: string
  name: string
  vicinity: string
  rating: number
  user_ratings_total: number
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
}

export const searchNearbyPlaces = async (latitude: number, longitude: number, radius = 1000, type = "restaurant") => {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json`, {
      params: {
        location: `${latitude},${longitude}`,
        radius,
        type,
        key: GOOGLE_PLACES_API_KEY,
      },
    })

    return response.data.results as Place[]
  } catch (error) {
    console.error("Erro ao buscar locais próximos:", error)
    return []
  }
}

