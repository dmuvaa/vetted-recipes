import Image from 'next/image'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-orange-100 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-6">
              Discover Culinary Delights at Your Fingertips
            </h1>
            <p className="text-xl text-orange-700 mb-8">
              Explore thousands of mouthwatering recipes for every taste and occasion
            </p>
            <div className="max-w-2xl mx-auto flex items-center bg-white rounded-full overflow-hidden shadow-lg">
              <Input 
                type="search" 
                placeholder="Search for recipes, ingredients, or cuisines..." 
                className="flex-grow border-none focus:ring-0"
              />
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">Featured Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Replace with actual featured recipes */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <Image src={`/placeholder.svg?height=200&width=400`} alt="Recipe" width={400} height={200} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-orange-700 mb-2">Delicious Recipe {i}</h3>
                    <p className="text-orange-600 mb-4">A brief description of this mouthwatering dish...</p>
                    <Link href={`/recipe/${i}`} className="text-orange-500 hover:text-orange-600 font-medium">
                      View Recipe →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recipe Categories */}
        <section className="bg-orange-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">Explore Recipe Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Breakfast', 'Lunch', 'Dinner', 'Desserts', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Quick & Easy'].map((category) => (
                <Link key={category} href={`/category/${category.toLowerCase()}`} className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-orange-100 transition-colors">
                  <h3 className="text-lg font-semibold text-orange-700">{category}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-orange-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Share Your Culinary Creations</h2>
            <p className="text-xl mb-8">
              Join our community of food lovers and showcase your favorite recipes
            </p>
            <Button className="bg-white text-orange-600 hover:bg-orange-100 font-semibold py-3 px-8 rounded-full text-lg">
              Submit Your Recipe
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}