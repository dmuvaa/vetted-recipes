// File: app/components/TopFoods.tsx

import Link from 'next/link';

const topFoods = [
  'Apple Cider Donuts', 'BBQ Ribs', 'Beef', 'Beef Brisket',
  'Beef Jerky', 'Beef Wellington', 'Beef Stew', 'Biryani', 'Bourbon Chicken',
  'Burger', 'Burrito', 'Cabbage',
  'Cannoli', 'Chicken', 'Chicken Cacciatore',
  'Chicken Fried Steak', 'Chicken Kiev', 'Chicken Marsala',
  'Chicken Parmesan', 'Chicken Pot Pie', 'Chicken Souvlaki', 'Chili', 'Chocolate', 
  'Corned Beef', 'Crêpes', 'Croissant', 'Curry', 'Dumplings', 'Egg Drop Soup', 
  'Egg Rolls', 'Eggs Benedict', 'Fish', 'Fish and Chips', 'Fish Tacos', 
  'French Toast', 'Fries', 'Fried Chicken', 'Fried Rice', 'Gelato',
  'Greek Salad', 'Italian Beef', 'Jerk Chicken', 'Key Lime Pie', 'Kebabs',
  'Korean BBQ', 'Lamb', 'Lamb Chops', 'Lasagna', 'Maple Glazed Ham', 'Mashed Potatoes',
  'Nachos', 'Noodles', 'Omelette', 'Paella', 'Pancakes', 'Pasta', 'Pierogi', 'Pizza',
  'Pork Chops', 'Pulled Pork', 'Pulled Pork Sandwich', 'Rib-Eye Steak', 'Risotto',
  'Risotto Milanese', 'Seafood', 'Shrimp', 'Shawarma', 'Smoothie', 'Soup', 'Spaghetti',
  'Spinach', 'Spring Rolls', 'Steak', 'Stuffed Mushrooms', 'Sushi',
  'Tacos', 'Tandoori Chicken', 'Tea', 'Teriyaki Chicken', 'Tofu', 'Tom Yum Soup', 'Tortilla',
  'Turkey', 'Waffles', 'Yogurt', 'Zucchini Bread'
];

export default function TopFoods() {
  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Top Foods</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {topFoods.map((food) => (
            <Link
              key={food}
              href={`/recipes?query=${encodeURIComponent(food.toLowerCase())}`}
              className="bg-orange-700 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
              {food}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
