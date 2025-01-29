import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="bg-transparent backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="font-display text-2xl font-bold text-rankly-primary">Rankly</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/explore"
                className="text-white hover:text-rankly-primary transition-colors duration-200 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                Explorar
              </Link>
              <Link
                href="/categories"
                className="text-white hover:text-rankly-primary transition-colors duration-200 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                Categorias
              </Link>
              <Link
                href="/about"
                className="text-white hover:text-rankly-primary transition-colors duration-200 inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium"
              >
                Sobre
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Button variant="ghost" className="text-white hover:text-rankly-primary">
              Entrar
            </Button>
            <Button className="ml-3 bg-rankly-primary text-white hover:bg-rankly-primary-dark">Cadastrar</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

