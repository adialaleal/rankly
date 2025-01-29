import { HoverEffect } from "@aceternityui/react"
import type { Business } from "./Business" // Import the Business type or interface

interface BusinessCardProps {
  business: Business
  onClick: (id: string) => void
}

export const BusinessCard = ({ business, onClick }: BusinessCardProps) => {
  return (
    <HoverEffect className="h-full">
      <div
        className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
        onClick={() => onClick(business.id)}
      >
        <div className="relative h-48">
          <Image
            src={business.image || "/placeholder.svg"}
            alt={business.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <Rating value={business.rating} />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-display text-xl font-semibold mb-2">{business.name}</h3>
          <p className="text-rankly-gray-800 mb-3">{business.category}</p>
          <div className="flex items-center justify-between">
            <span className="text-rankly-primary font-medium">{business.distance}km</span>
            <Button variant="ghost" className="text-rankly-accent hover:text-rankly-accent/80">
              Ver mais
            </Button>
          </div>
        </div>
      </div>
    </HoverEffect>
  )
}

