// File: app/components/RecipeCategories.tsx

import Link from 'next/link';

const categories = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Desserts',
  'Vegetarian',
  'Keto',
  'Paleo',
  'Brazilian',
  'Mexican',
  'Italian',
  'Chinese',
  'Japanese',
  'Vegan',
  'Gluten-Free',
  'Indian',
  'Thai',
  'Mediterranean',
  'French',
  'American',
  'Greek',
  'Spanish',
  'Moroccan',
  'Middle Eastern',
  'Caribbean',
  'German',
  'British',
  'Irish',
  'African',
  'Russian',
  'Korean',
  'Vietnamese',
  'Filipino',
  'Indonesian',
  'Malaysian',
  'Turkish',
  'Lebanese',
  'Israeli',
  'Egyptian',
  'Ethiopian',
  'BBQ',
  'Seafood',
  'Salads',
  'Kids Meals',
  // Add more categories as needed
];

export default function RecipeCategories() {
  return (
    <section className="bg-orange-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">Explore Recipe Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link 
              key={category} 
              href={`/recipes?query=${encodeURIComponent(category.toLowerCase())}`} 
              className="bg-white rounded-lg shadow-md p-4 text-center hover:bg-orange-100 transition-colors"
            >
              <h3 className="text-lg font-semibold text-orange-700">{category}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
