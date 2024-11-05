// /categories/page.tsx
"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Input } from "@/components/ui/input";

const categories = [
  'Appetizers', 'Beverages', 'Breads', 'Breakfast', 'Brunch', 'Casseroles', 'Comfort Food', 'Desserts', 'Dinner',
  'Ethnic', 'Family Dinners', 'Gluten-Free', 'Grains', 'Healthy Snacks', 'Holiday Specials', 'Italian', 'Japanese',
  'Keto', 'Kids Meals', 'Lunch', 'Main Dishes', 'Mexican', 'One-Pot Meals', 'Paleo', 'Pasta', 'Quick & Easy',
  'Salads', 'Sandwiches', 'Seafood', 'Side Dishes', 'Snacks', 'Soups & Stews', 'Special Diets', 'Thai', 'Vegan',
  'Vegetarian', 'Whole30', 'Zesty Dishes', // Add more as needed
];

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter categories based on the search term
  const filteredCategories = categories.filter(category =>
    category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 text-center text-orange-800">Recipe Categories</h1>
      <p className="text-lg mb-8 text-center text-gray-700">
        Find recipes by category to satisfy your cravings or dietary preferences.
      </p>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <Input 
          type="text" 
          placeholder="Search categories..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-lg p-2 border border-orange-300 rounded focus:outline-none focus:border-orange-500"
        />
      </div>

      {/* Categories List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <Link 
              key={index} 
              href={`/recipes?query=${encodeURIComponent(category.toLowerCase())}`} 
              className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-orange-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-orange-700">{category}</h3>
            </Link>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">No categories found</p>
        )}
      </div>
    </div>
  );
}
