import Navbar from "@/components/Navbar"
import { StarIcon, MapPinIcon, PhoneIcon, ClockIcon } from "lucide-react"
import Image from "next/image"

const mockBusiness = {
  id: "1",
  name: "Café Delícia",
  image: "/placeholder.svg?height=400&width=800",
  rating: 4.5,
  category: "Café",
  address: "Rua das Flores, 123",
  phone: "(11) 1234-5678",
  hours: "Seg-Sex: 7h-19h, Sáb-Dom: 8h-18h",
  description: "Um charmoso café com uma seleção de grãos premium e deliciosos quitutes artesanais.",
}

export default function BusinessPage({ params }: { params: { id: string } }) {
  // Na versão final, você buscaria os dados do estabelecimento com base no ID
  const business = mockBusiness

  return (
    <main>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-64 md:h-full">
            <Image
              src={business.image || "/placeholder.svg"}
              alt={business.name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div>
            <h1 className="font-display text-4xl font-bold mb-4">{business.name}</h1>
            <div className="flex items-center mb-4">
              <StarIcon className="w-5 h-5 text-yellow-400 mr-1" />
              <span className="font-semibold mr-2">{business.rating.toFixed(1)}</span>
              <span className="text-rankly-gray-800">({business.category})</span>
            </div>
            <p className="text-lg mb-6">{business.description}</p>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPinIcon className="w-5 h-5 text-rankly-primary mr-2" />
                <span>{business.address}</span>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="w-5 h-5 text-rankly-primary mr-2" />
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-5 h-5 text-rankly-primary mr-2" />
                <span>{business.hours}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

