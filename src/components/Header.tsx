import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="bg-orange-100 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
            Vetted Recipes
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-orange-800 hover:text-orange-600 transition-colors">Home</Link>
            <Link href="/about" className="text-orange-800 hover:text-orange-600 transition-colors">About Us</Link>
            <Link href="/categories" className="text-orange-800 hover:text-orange-600 transition-colors">Categories</Link>
            <Link href="/submit-recipe" className="text-orange-800 hover:text-orange-600 transition-colors">Submit Recipe</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <Input 
              type="search" 
              placeholder="Search recipes..." 
              className="w-64 bg-white border-orange-300 focus:border-orange-500"
            />
            <Button variant="ghost" size="icon" className="text-orange-600 hover:text-orange-700 hover:bg-orange-200">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}