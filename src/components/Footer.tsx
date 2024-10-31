import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-orange-100 border-t border-orange-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-orange-600 hover:text-orange-700">Home</Link></li>
              <li><Link href="/about" className="text-orange-600 hover:text-orange-700">About Us</Link></li>
              <li><Link href="/contact" className="text-orange-600 hover:text-orange-700">Contact</Link></li>
              <li><Link href="/privacy" className="text-orange-600 hover:text-orange-700">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">Recipe Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/category/breakfast" className="text-orange-600 hover:text-orange-700">Breakfast</Link></li>
              <li><Link href="/category/lunch" className="text-orange-600 hover:text-orange-700">Lunch</Link></li>
              <li><Link href="/category/dinner" className="text-orange-600 hover:text-orange-700">Dinner</Link></li>
              <li><Link href="/category/desserts" className="text-orange-600 hover:text-orange-700">Desserts</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-orange-600 hover:text-orange-700"><Facebook /></a>
              <a href="#" className="text-orange-600 hover:text-orange-700"><Twitter /></a>
              <a href="#" className="text-orange-600 hover:text-orange-700"><Instagram /></a>
              <a href="#" className="text-orange-600 hover:text-orange-700"><Youtube /></a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-orange-800 mb-4">Subscribe to Our Newsletter</h3>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email address" className="bg-white border-orange-300 focus:border-orange-500" />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-orange-200 text-center text-orange-600">
          <p>&copy; {new Date().getFullYear()} Vetted Recipes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}