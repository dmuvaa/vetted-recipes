import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-orange-100 to-orange-200 border-t border-orange-300 text-orange-800">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:underline">Home</Link></li>
              <li><Link href="/about" className="hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact</Link></li>
              <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Recipe Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Recipe Categories</h3>
            <ul className="space-y-2">
              <li><Link href="/categories" className="hover:underline">Breakfast</Link></li>
              <li><Link href="/categories" className="hover:underline">Lunch</Link></li>
              <li><Link href="/categories" className="hover:underline">Dinner</Link></li>
              <li><Link href="/categories" className="hover:underline">Desserts</Link></li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="text-orange-600 hover:text-orange-700"><Facebook /></a>
              <a href="https://twitter.com" className="text-orange-600 hover:text-orange-700"><Twitter /></a>
              <a href="https://instagram.com" className="text-orange-600 hover:text-orange-700"><Instagram /></a>
              <a href="https://youtube.com" className="text-orange-600 hover:text-orange-700"><Youtube /></a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h3>
            <form className="space-y-4">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white border-orange-300 focus:border-orange-500 placeholder:text-orange-400"
              />
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-8 pt-4 border-t border-orange-200 text-center text-sm text-orange-600">
          <p>&copy; {new Date().getFullYear()} Vetted Recipes. All rights reserved.</p>
          <p className="mt-1">
            Discover new tastes, create culinary masterpieces, and enhance your cooking journey with us.
          </p>
        </div>
      </div>
    </footer>
  );
}
