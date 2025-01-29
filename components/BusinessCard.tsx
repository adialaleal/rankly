import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { MapPinIcon } from "lucide-react"

interface Business {
  id: string
  name: string
  image: string
  rating: number
  category: string
  distance: number
}

interface BusinessCardProps {
  business: Business
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Link href={`/business/${business.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <Image
            src={business.image || "/placeholder.svg"}
            alt={business.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform hover:scale-105 duration-300"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-display text-xl font-semibold mb-2">{business.name}</h3>
          <p className="text-rankly-gray-800 mb-3">{business.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-rankly-primary font-medium flex items-center">
              <MapPinIcon className="w-4 h-4 mr-1" />
              {business.distance.toFixed(1)}km
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

