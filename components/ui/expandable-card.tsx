"use client"
import Image from "next/image"
import React, { useEffect, useId, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useOutsideClick } from "@/hooks/use-outside-click"
import { MapPin, Star, Clock, Phone, MessageCircle } from "lucide-react"

interface Comment {
  user: string
  text: string
  rating: number
}

interface Place {
  id: string
  title: string
  description: string
  image: string
  category: string
  rating: number
  address: string
  hours: string
  phone: string
  comments: Comment[]
}

interface ExpandableCardProps {
  places: Place[]
}

export function ExpandableCard({ places }: ExpandableCardProps) {
  const [active, setActive] = useState<Place | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null)
      }
    }

    if (active) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.id}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={300}
                  src={active.image || "/placeholder.svg"}
                  alt={active.title}
                  className="w-full h-60 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                />
              </motion.div>

              <div className="p-4 overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <motion.h3 layoutId={`title-${active.id}-${id}`} className="font-bold text-xl text-rankly-primary">
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.id}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <motion.div
                    layoutId={`rating-${active.id}-${id}`}
                    className="flex items-center bg-rankly-primary text-white px-2 py-1 rounded-full"
                  >
                    <Star className="w-4 h-4 mr-1" />
                    <span>{active.rating.toFixed(1)}</span>
                  </motion.div>
                </div>
                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm"
                >
                  <div className="flex items-center mb-2">
                    <MapPin className="w-4 h-4 mr-2 text-rankly-primary" />
                    <span>{active.address}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-2 text-rankly-primary" />
                    <span>{active.hours}</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Phone className="w-4 h-4 mr-2 text-rankly-primary" />
                    <span>{active.phone}</span>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold text-rankly-primary mb-2 flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comentários
                    </h4>
                    {active.comments.map((comment, index) => (
                      <div key={index} className="mb-2 p-2 bg-gray-100 dark:bg-neutral-800 rounded">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{comment.user}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{comment.rating}</span>
                          </div>
                        </div>
                        <p>{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place) => (
          <motion.div
            layoutId={`card-${place.id}-${id}`}
            key={`card-${place.id}-${id}`}
            onClick={() => setActive(place)}
            className="bg-white dark:bg-neutral-800 p-4 rounded-xl cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <motion.div layoutId={`image-${place.id}-${id}`} className="mb-4">
              <Image
                width={300}
                height={200}
                src={place.image || "/placeholder.svg"}
                alt={place.title}
                className="w-full h-40 rounded-lg object-cover object-center"
              />
            </motion.div>
            <div>
              <motion.h3 layoutId={`title-${place.id}-${id}`} className="font-medium text-lg text-rankly-primary mb-1">
                {place.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${place.id}-${id}`}
                className="text-neutral-600 dark:text-neutral-400 text-sm mb-2"
              >
                {place.description}
              </motion.p>
              <motion.div layoutId={`rating-${place.id}-${id}`} className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span>{place.rating.toFixed(1)}</span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  )
}

const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  )
}

