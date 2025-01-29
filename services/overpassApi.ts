import axios from "axios"

interface Place {
  id: number
  lat: number
  lon: number
  tags: {
    name?: string
    amenity?: string
    "addr:street"?: string
    "addr:housenumber"?: string
  }
}

export const searchNearbyPlaces = async (latitude: number, longitude: number, radius = 1000) => {
  const query = `
    [out:json];
    (
      node["amenity"~"restaurant|cafe|bar"](around:${radius},${latitude},${longitude});
    );
    out body;
  `

  try {
    const response = await axios.post("https://overpass-api.de/api/interpreter", query)
    return response.data.elements as Place[]
  } catch (error) {
    console.error("Erro ao buscar locais próximos:", error)
    return []
  }
}

export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371 // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c
  return Number(distance.toFixed(1))
}

