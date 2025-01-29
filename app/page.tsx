import Navbar from "@/components/Navbar"
import SearchHero from "@/components/SearchHero"
import NearbyPlaces from "@/components/NearbyPlaces"

export default function Home() {
  return (
    <main>
      <Navbar />
      <SearchHero />
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-display text-3xl font-bold mb-6">Locais próximos a você</h2>
        <NearbyPlaces />
      </section>
    </main>
  )
}

