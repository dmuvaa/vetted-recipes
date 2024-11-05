// File: app/components/FeaturedRecipes.tsx

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Recipe {
  id: string;
  title: string;
  slug: string;
}

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomRecipes = async () => {
      try {
        const res = await fetch('/api/random-recipes?limit=3');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setRecipes(data.recipes);
      } catch (err) {
        console.error('Error fetching featured recipes:', err);
        setError('Failed to load featured recipes.');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecipes();
  }, []);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-orange-800 mb-8">Featured Recipes</h2>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-orange-800 mb-8">Featured Recipes</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-orange-800 mb-8">Featured Recipes</h2>
          <p className="text-orange-600">No featured recipes available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">Featured Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div key={recipe.slug} className="bg-white rounded-lg shadow-md overflow-hidden p-6">
              <h3 className="text-xl font-semibold text-orange-700 mb-2">{recipe.title}</h3>
              <p className="text-orange-600 mb-4">A brief description of this mouthwatering dish...</p>
              <Link href={`/recipes/${recipe.slug}`} className="text-orange-500 hover:text-orange-600 font-medium">
                View Recipe →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
