// File: app/components/HeroSection.tsx

'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function HeroSection({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);

  return (
    <section className="relative bg-orange-100 py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-orange-800 mb-6">
          Discover Culinary Delights at Your Fingertips
        </h1>
        <p className="text-xl text-orange-700 mb-8">
          Explore thousands of mouthwatering recipes for every taste and occasion
        </p>
        <form action="/recipes" method="get" className="max-w-2xl mx-auto flex items-center bg-white rounded-full overflow-hidden shadow-lg">
          <Input 
            type="search" 
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for recipes, ingredients, or cuisines..." 
            className="flex-grow border-none focus:ring-0"
          />
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-2">
            <Search className="h-5 w-5 mr-2" />
            Search
          </Button>
        </form>
      </div>
    </section>
  );
}
