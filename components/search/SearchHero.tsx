import { BackgroundBeams } from "@aceternityui/react"
import SearchBar from "./SearchBar" // Import SearchBar component

export const SearchHero = () => {
  const handleSearch = (query) => {
    // Implement search logic here
    console.log("Search query:", query)
  }

  return (
    <section className="relative h-[70vh] min-h-[600px]">
      <BackgroundBeams className="absolute inset-0" color="var(--rankly-primary-light)" />
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-center mb-8">
          Encontre os melhores lugares perto de você
        </h1>
        <SearchBar className="w-full max-w-2xl bg-white/90 backdrop-blur-sm shadow-lg" onSearch={handleSearch} />
      </div>
    </section>
  )
}

