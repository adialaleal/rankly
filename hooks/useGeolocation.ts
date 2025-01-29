import { useState, useEffect } from "react"

interface GeolocationState {
  latitude: number | null
  longitude: number | null
  error: string | null
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
  })

  useEffect(() => {
    if (!navigator.geolocation) {
      setState((prevState) => ({ ...prevState, error: "Geolocalização não é suportada pelo seu navegador" }))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        })
      },
      (error) => {
        setState((prevState) => ({ ...prevState, error: error.message }))
      },
    )
  }, [])

  return state
}

