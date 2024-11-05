"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-orange-100 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
          Vetted Recipes
        </Link>

        {/* Search and Menu Button */}
        <div className="flex items-center space-x-2">
          <Input 
            type="search" 
            placeholder="Search recipes..." 
            className="w-40 md:w-64 bg-white border-orange-300 focus:border-orange-500"
          />
          <Button variant="ghost" size="icon" className="text-orange-600 hover:text-orange-700 hover:bg-orange-200">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Hamburger Icon for Mobile */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-orange-600 md:hidden" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Menu</span>
          </Button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="text-orange-800 hover:text-orange-600 transition-colors">Home</Link>
          <Link href="/about" className="text-orange-800 hover:text-orange-600 transition-colors">About Us</Link>
          <Link href="/categories" className="text-orange-800 hover:text-orange-600 transition-colors">Categories</Link>
          <Link href="/recipes" className="text-orange-800 hover:text-orange-600 transition-colors">Recipes</Link>
        </nav>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-orange-100 shadow-lg">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/" className="text-orange-800 hover:text-orange-600 transition-colors" onClick={toggleMenu}>Home</Link>
            <Link href="/about" className="text-orange-800 hover:text-orange-600 transition-colors" onClick={toggleMenu}>About Us</Link>
            <Link href="/categories" className="text-orange-800 hover:text-orange-600 transition-colors" onClick={toggleMenu}>Categories</Link>
            <Link href="/recipes" className="text-orange-800 hover:text-orange-600 transition-colors" onClick={toggleMenu}>Recipes</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
