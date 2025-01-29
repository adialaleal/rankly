"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { ExpandableCard } from "@/components/ui/expandable-card"
import { MultiStepLoader } from "@/components/ui/multi-step-loader"
import { useGeolocation } from "@/hooks/useGeolocation"
import { searchNearbyPlaces } from "@/services/overpassApi"

const featuredPlaces = [
  {
    id: "1",
    title: "Café Delícia",
    description: "O melhor café da cidade",
    image: "/placeholder.svg?height=300&width=400",
    category: "Café",
    rating: 4.5,
    address: "Rua das Flores, 123",
    hours: "Seg-Sex: 7h-19h, Sáb-Dom: 8h-18h",
    phone: "(11) 1234-5678",
    comments: [
      { user: "Maria", text: "Ótimo café!", rating: 5 },
      { user: "João", text: "Ambiente agradável", rating: 4 },
    ],
  },
  {
    id: "2",
    title: "Restaurante Sabor",
    description: "Culinária internacional",
    image: "/placeholder.svg?height=300&width=400",
    category: "Restaurante",
    rating: 4.2,
    address: "Av. Paulista, 1000",
    hours: "Todos os dias: 11h-23h",
    phone: "(11) 2345-6789",
    comments: [
      { user: "Ana", text: "Comida deliciosa!", rating: 5 },
      { user: "Carlos", text: "Bom atendimento", rating: 4 },
    ],
  },
  {
    id: "3",
    title: "Bar do João",
    description: "Drinks e petiscos",
    image: "/placeholder.svg?height=300&width=400",
    category: "Bar",
    rating: 4.0,
    address: "Rua Augusta, 500",
    hours: "Ter-Dom: 18h-2h",
    phone: "(11) 3456-7890",
    comments: [
      { user: "Pedro", text: "Ótimos drinks!", rating: 4 },
      { user: "Lucia", text: "Ambiente animado", rating: 4 },
    ],
  },
]

export default function SearchHero() {
  const [query, setQuery] = useState("")
  const router = useRouter()
  const { latitude, longitude } = useGeolocation()
  const [nearbyPlaces, setNearbyPlaces] = useState([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  useEffect(() => {
    if (latitude && longitude) {
      searchNearbyPlaces(latitude, longitude, 5000).then((places) => {
        setNearbyPlaces(
          places.map((place) => ({
            ...place,
            comments: [{ user: "Usuário Anônimo", text: "Bom lugar!", rating: 4 }],
          })),
        )
      })
    }
  }, [latitude, longitude])

  const steps = [
    { name: "Buscar", delay: 0 },
    { name: "Localizar", delay: 1500 },
    { name: "Descobrir", delay: 2500 },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-black text-white">
      <BackgroundBeams />
      <div className="relative z-10 text-center px-4 md:px-0 w-full max-w-4xl mx-auto pt-24">
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-rankly-primary">
          Encontre os melhores lugares perto de você
        </h1>
        <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto mb-12">
          <Input
            type="text"
            placeholder="Buscar restaurantes, bares, cafés..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-white/10 text-white placeholder-white/50 border-rankly-primary"
          />
          <Button type="submit" className="ml-2 bg-rankly-primary text-white hover:bg-rankly-primary-dark">
            Buscar
          </Button>
        </form>

        <div className="mb-12">
          <MultiStepLoader steps={steps} />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-rankly-primary">Destaques</h2>
          <ExpandableCard places={featuredPlaces} />
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-rankly-primary">Lugares próximos (5km)</h2>
          <ExpandableCard places={nearbyPlaces} />
        </div>
      </div>
    </section>
  )
}

