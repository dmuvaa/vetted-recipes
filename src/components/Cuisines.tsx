// File: app/components/Cuisines.tsx

import Link from 'next/link';

const cuisines = [
  'Brazilian',
  'Indian',
  'Mediterranean',
  'Chinese',
  'African',
  'Italian',
  'Mexican',
  'Thai',
  'Japanese',
  'French',
  'Spanish',
  'Greek',
  'Turkish',
  'Vietnamese',
  'Korean',
  'Lebanese',
  'Moroccan',
  'Caribbean',
  'Ethiopian',
  'Peruvian',
  // Add more as needed
];

export default function Cuisines() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Cuisines</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {cuisines.map((cuisine) => (
            <Link
              key={cuisine}
              href={`/recipes?query=${encodeURIComponent(cuisine.toLowerCase())}`}
              className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors"
            >
              {cuisine}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
