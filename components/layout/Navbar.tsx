import { FloatingNavbar } from "@aceternityui/react"
import Logo from "./Logo" // Import the Logo component
import NavLink from "./NavLink" // Assuming NavLink is a custom component
import Button from "./Button" // Assuming Button is a custom component

export const Navbar = () => {
  return (
    <FloatingNavbar className="bg-white/80 backdrop-blur-sm border-b border-rankly-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo className="h-8 w-auto" />
        <nav className="hidden md:flex space-x-6">
          <NavLink href="/explore">Explorar</NavLink>
          <NavLink href="/categories">Categorias</NavLink>
          <NavLink href="/about">Sobre</NavLink>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost">Entrar</Button>
          <Button className="bg-rankly-primary text-white">Cadastrar</Button>
        </div>
      </div>
    </FloatingNavbar>
  )
}

